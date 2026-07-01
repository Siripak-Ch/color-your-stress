/*******************************************************
 * Color Your Stress V20 GACHA PRIZEPOOL FIXED Backend
 * Google Apps Script + Google Sheets + Drive image upload
 * Deploy as Web App: Execute as Me, Access Anyone / Anyone within organization
 *******************************************************/

/*********************** EDIT THIS ONLY ************************
 * Optional: ใส่ Google Sheet ID จริงตรงนี้
 * ถ้าปล่อยว่าง ระบบจะใช้ชีทที่ผูกกับ Script หรือสร้างชีทใหม่ให้อัตโนมัติ
 ***************************************************************/
const SPREADSHEET_ID = '1C7BMXfGIJMf0COVUmd5aWSk4Kn_K3GS-2uCTPvQqYHI'; // Google Sheet ID จริง
const CREATE_NEW_SHEET_IF_EMPTY = true;
const ADMIN_CONTACT_NOTE = 'Popup only - participant contacts staff after screenshot';
const SETUP_VERSION = 'COLOR_STRESS_V20_GACHA_PRIZEPOOL_FIXED_2026_07_01';

const APP = {
  TITLE: 'Color Your Stress | Wellness Gacha',
  TZ: 'Asia/Bangkok',
  DRIVE_FOLDER: 'Color Your Stress Board Images',
  SHEETS: {
    SETTINGS: 'Settings',
    POOL: 'PrizePool',
    PARTICIPANTS: 'Participants',
    QUIZ: 'QuizAnswers',
    CARDS: 'Cards',
    GACHA: 'GachaHistory',
    EVAL: 'Evaluations',
    LIKES: 'Likes',
    LOGS: 'Logs'
  },
  PROFILES: {
    calm: 'Calm Cloud — ต้องการพักใจและลดความเร่ง',
    fresh: 'Fresh Spark — ต้องการพลังใหม่และความสดชื่น',
    bloom: 'Warm Bloom — ต้องการความอบอุ่นและกำลังใจ',
    focus: 'Focus Stone — ต้องการความนิ่งและจัดระบบความคิด'
  }
};

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('🎨 Color Stress')
      .addItem('Setup / Repair Sheets', 'setupSheets')
      .addItem('Open Web App Info', 'showWebAppInfo')
      .addSeparator()
      .addItem('RESET Prize Pool only', 'resetPrizePool_CONFIRM')
      .addToUi();
  } catch (err) { console.log(err); }
}

function showWebAppInfo() {
  const ss = getSpreadsheet_();
  SpreadsheetApp.getUi().alert('Color Your Stress Backend is ready. Spreadsheet URL:\n' + ss.getUrl() + '\n\nDeploy Apps Script as Web app and copy the /exec URL into config.js');
}

function doGet(e) {
  e = e || { parameter: {} };
  if (e.parameter && e.parameter.action) return routeJSONP_(e);
  ensureSetup_();
  return HtmlService.createHtmlOutput('<h2>🎨 Color Your Stress API is running</h2><p>Use this Apps Script /exec URL in GitHub Pages config.js.</p>').setTitle(APP.TITLE).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    ensureSetup_();
    const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    if (body.action === 'saveBoardImage') return jsonOutput_(saveBoardImage_(body));
    return jsonOutput_({ ok: false, message: 'Unknown POST action' });
  } catch (err) {
    log_('POST_ERROR', err.stack || err.message || String(err));
    return jsonOutput_({ ok: false, message: err.message || String(err) });
  }
}

function routeJSONP_(e) {
  const actionRaw = String(e.parameter.action || '');
  const action = normalizeAction_(actionRaw);
  const callback = String(e.parameter.callback || 'callback').replace(/[^a-zA-Z0-9_.$]/g, '');
  let payload = {};
  try { payload = e.parameter.payload ? JSON.parse(e.parameter.payload) : {}; }
  catch (err) { return jsonpOutput_(callback, { ok: false, message: 'Invalid payload JSON' }); }

  try {
    let result;
    switch (action) {
      case 'ping':
        ensureSetup_();
        result = { ok: true, app: APP.TITLE, spreadsheetUrl: getSpreadsheet_().getUrl(), time: now_() };
        break;
      case 'setupSheets': result = setupSheets(); break;
      case 'authorizeServices': result = authorizeServices(); break;
      case 'getPrizeStatus': result = getPrizeStatus(); break;
      case 'getWall': result = getWall(); break;
      case 'submitCard': result = submitCard(payload); break;
      case 'spinGacha': result = spinGacha(payload); break;
      case 'submitAndSpin': result = spinGacha(payload); break;
      case 'likeCard':
      case 'voteCard': result = likeCard(payload); break;
      case 'getAdminSummary': result = getAdminSummary(); break;
      default: result = { ok: false, message: 'Unknown action: ' + actionRaw + ' (normalized: ' + action + ')' };
    }
    return jsonpOutput_(callback, result);
  } catch (err) {
    log_('API_ERROR', actionRaw + ' => ' + action + ' | ' + (err.stack || err.message || String(err)));
    return jsonpOutput_(callback, { ok: false, message: err.message || String(err) });
  }
}

function normalizeAction_(action) {
  const a = String(action || '').trim();
  const lower = a.toLowerCase();
  const map = {
    'spingacha': 'submitAndSpin',
    'spin_gacha': 'submitAndSpin',
    'spin-gacha': 'submitAndSpin',
    'spin': 'submitAndSpin',
    'gacha': 'submitAndSpin',
    'claimprize': 'submitAndSpin',
    'claim_prize': 'submitAndSpin',
    'submitandspin': 'submitAndSpin',
    'submit_and_spin': 'submitAndSpin',
    'submitspin': 'submitAndSpin',
    'getprizestatus': 'getPrizeStatus',
    'get_prize_status': 'getPrizeStatus',
    'getwall': 'getWall',
    'get_wall': 'getWall',
    'submitcard': 'submitCard',
    'submit_card': 'submitCard',
    'likecard': 'likeCard',
    'votecard': 'voteCard',
    'getadminsummary': 'getAdminSummary',
    'setup': 'setupSheets',
    'setupsheets': 'setupSheets',
    'authorizeservices': 'authorizeServices'
  };
  return map[lower] || a;
}

function jsonpOutput_(callback, obj) {
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(obj) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
}
function jsonOutput_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

/*********************** SETUP ************************/

function ensureSetup_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('SETUP_VERSION') !== SETUP_VERSION) setupSheets();
}

function setupSheets() {
  const ss = getSpreadsheet_();
  setupSheet_(ss, APP.SHEETS.SETTINGS, ['Key', 'Value', 'Note']);
  setupSheet_(ss, APP.SHEETS.POOL, ['PrizeID', 'RollNo', 'Type', 'PrizeName', 'BudgetTHB', 'IsCash', 'Status', 'Claimed', 'ClaimedAt', 'ParticipantKey', 'ParticipantName', 'CardID', 'Note']);
  setupSheet_(ss, APP.SHEETS.PARTICIPANTS, ['Timestamp', 'ParticipantKey', 'Name', 'EmployeeID', 'Team', 'ProfileKey', 'ProfileName', 'Affirmation', 'CardID', 'PrizeID', 'PrizeName', 'PrizeType', 'Duplicate', 'UserAgent']);
  setupSheet_(ss, APP.SHEETS.QUIZ, ['Timestamp', 'ParticipantKey', 'Name', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'ScoreJSON', 'ProfileKey', 'ProfileName']);
  setupSheet_(ss, APP.SHEETS.CARDS, ['Timestamp', 'CardID', 'ParticipantKey', 'Name', 'EmployeeID', 'Team', 'ProfileKey', 'ProfileName', 'ProfileShort', 'ThemeIndex', 'ThemeName', 'Affirmation', 'StickersJSON', 'LayoutJSON', 'BoardImageUrl', 'BoardThumbDataUrl', 'ImageFileId']);
  setupSheet_(ss, APP.SHEETS.GACHA, ['Timestamp', 'ParticipantKey', 'ParticipantName', 'EmployeeID', 'CardID', 'PrizeID', 'PrizeName', 'PrizeType', 'BudgetTHB', 'IsDuplicate']);
  setupSheet_(ss, APP.SHEETS.EVAL, ['Timestamp', 'ParticipantKey', 'Name', 'EmployeeID', 'OverallRating', 'FeelingsJSON', 'WantAgain', 'Comment', 'PrizeID', 'CardID']);
  setupSheet_(ss, APP.SHEETS.LIKES, ['Timestamp', 'VoterKey', 'CardID', 'ParticipantKey', 'CardOwner']);
  setupSheet_(ss, APP.SHEETS.LOGS, ['Timestamp', 'Event', 'Detail']);

  fillSettingsIfBlank_(ss.getSheetByName(APP.SHEETS.SETTINGS));
  fillPrizePoolIfBlank_(ss.getSheetByName(APP.SHEETS.POOL));
  applyBasicFormatting_(ss);
  deleteExtraBlankSheets_(ss);
  PropertiesService.getScriptProperties().setProperty('SETUP_VERSION', SETUP_VERSION);
  log_('SETUP', 'Setup / repair completed');
  return { ok: true, spreadsheetId: ss.getId(), spreadsheetUrl: ss.getUrl(), sheets: Object.keys(APP.SHEETS).map(k => APP.SHEETS[k]) };
}

function setupSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    const blank = findReusableBlankSheet_(ss);
    sh = blank ? blank.setName(name) : ss.insertSheet(name);
  }
  const currentHeaders = sh.getLastRow() >= 1 ? sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), headers.length)).getValues()[0] : [];
  const isEmpty = sh.getLastRow() === 0 || currentHeaders.every(v => v === '');
  if (isEmpty) {
    sh.clear();
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    headers.forEach(h => { if (currentHeaders.indexOf(h) === -1) sh.getRange(1, sh.getLastColumn() + 1).setValue(h); });
  }
  sh.setFrozenRows(1);
  return sh;
}

function findReusableBlankSheet_(ss) {
  return ss.getSheets().find(sh => /^(Sheet\d*|ชีต\d*|ชีท\d*)$/i.test(sh.getName()) && (sh.getLastRow() === 0 || (sh.getLastRow() === 1 && sh.getLastColumn() === 1 && sh.getRange(1, 1).getValue() === ''))) || null;
}
function fillSettingsIfBlank_(sh) {
  if (sh.getLastRow() > 1) return;
  sh.getRange(2, 1, 7, 3).setValues([
    ['Contact LINE ID', 'friendly_dukdik', 'Shown in gacha result popup'],
    ['Contact MS Teams', 'Siripak Chattanupakorn', 'Shown in gacha result popup'],
    ['Prize Contact Mode', ADMIN_CONTACT_NOTE, 'Email sending disabled; result shown in popup only to prevent timeout'],
    ['Gift Budget', '3000', 'Gacha gift budget THB'],
    ['Top Vote Budget', '2000', 'Top Vote prize budget THB'],
    ['Total Gacha Slots', '60', '30 gifts + 30 non-cash coupons'],
    ['UpdatedAt', now_(), 'Auto setup timestamp']
  ]);
}
function fillPrizePoolIfBlank_(sh) {
  if (sh.getLastRow() > 1) return;
  const rows = buildPrizePool_();
  sh.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}
function applyBasicFormatting_(ss) {
  Object.keys(APP.SHEETS).forEach(k => {
    const sh = ss.getSheetByName(APP.SHEETS[k]); if (!sh) return;
    const lastCol = Math.max(1, sh.getLastColumn());
    sh.getRange(1, 1, 1, lastCol).setBackground('#4f6f8f').setFontColor('#ffffff').setFontWeight('bold');
    sh.autoResizeColumns(1, Math.min(lastCol, 16));
  });
}
function deleteExtraBlankSheets_(ss) {
  const valid = Object.keys(APP.SHEETS).map(k => APP.SHEETS[k]);
  ss.getSheets().forEach(sh => {
    const isBlankDefault = /^(Sheet\d*|ชีต\d*|ชีท\d*)$/i.test(sh.getName()) && sh.getLastRow() <= 1 && sh.getLastColumn() <= 1 && sh.getRange(1, 1).getValue() === '';
    if (isBlankDefault && valid.indexOf(sh.getName()) === -1 && ss.getSheets().length > valid.length) ss.deleteSheet(sh);
  });
}

function buildPrizePool_() {
  const rows = []; let n = 1;
  function add(type, name, budget, isCash, qty, note) {
    for (let i = 0; i < qty; i++) rows.push(['P' + String(n).padStart(3, '0'), n++, type, name, budget, isCash, 'Available', false, '', '', '', '', note || '']);
  }
  add('Gacha Gift', 'LINE Gift Card 50 บาท', 50, true, 10, 'Gift budget');
  add('Gacha Gift', 'LINE Gift Card 100 บาท', 100, true, 10, 'Gift budget');
  add('Gacha Gift', 'Starbucks / Café Gift 100 บาท', 100, true, 5, 'Gift budget');
  add('Gacha Gift', 'Grab Gift 200 บาท', 200, true, 5, 'Gift budget');
  add('Wellness Coupon', 'คูปองเลิกงานเร็ว 1 ชม. ตามเงื่อนไขหัวหน้างาน', 0, false, 6, 'Non-cash');
  add('Wellness Coupon', 'คูปองขยายเวลาพักเที่ยง 15 นาที', 0, false, 6, 'Non-cash');
  add('Wellness Coupon', 'คูปองพักงีบ / พักสายตา 15 นาที', 0, false, 6, 'Non-cash');
  add('Wellness Coupon', 'คูปองกาแฟจาก Buddy / Team Treat', 0, false, 6, 'Non-cash');
  add('Wellness Coupon', 'Wellness Message: วันนี้พักได้โดยไม่รู้สึกผิด', 0, false, 6, 'Non-cash');
  return rows;
}
function resetPrizePool_CONFIRM() {
  const ss = getSpreadsheet_(); const sh = ss.getSheetByName(APP.SHEETS.POOL);
  sh.clear(); sh.getRange(1, 1, 1, 13).setValues([['PrizeID', 'RollNo', 'Type', 'PrizeName', 'BudgetTHB', 'IsCash', 'Status', 'Claimed', 'ClaimedAt', 'ParticipantKey', 'ParticipantName', 'CardID', 'Note']]);
  fillPrizePoolIfBlank_(sh); applyBasicFormatting_(ss); log_('RESET_PRIZE_POOL', 'Prize pool reset to 60 slots');
  return { ok: true, message: 'Prize pool reset to 60 slots' };
}


function authorizeServices() {
  const ss = getSpreadsheet_();
  const folder = getOrCreateFolder_(APP.DRIVE_FOLDER);
  // V12 Rechecked: email sending is disabled. Gacha result is shown in-app only to prevent timeout.
  log_('AUTHORIZE_SERVICES', 'Drive folder: ' + folder.getName());
  return { ok: true, spreadsheetUrl: ss.getUrl(), driveFolderId: folder.getId(), message: 'Sheets + Drive authorized. Email sending is disabled.' };
}

/*********************** API ************************/

function getPrizeStatus() {
  ensureSetup_();
  const ss = getSpreadsheet_();
  return getPrizeStatusFast_(ss);
}

function getPrizeStatusFast_(ss) {
  // V20: repair PrizePool first so Available/Gifts/Coupons always matches GachaHistory/Participants.
  // This fixes cases where old deployed code wrote GachaHistory but did not mark PrizePool as Claimed.
  reconcilePrizePoolClaims_(ss);
  const pool = getDataRows_(ss.getSheetByName(APP.SHEETS.POOL));
  const history = getDataRows_(ss.getSheetByName(APP.SHEETS.GACHA));
  const available = pool.filter(r => !isClaimed_(r));
  const giftRemaining = available.filter(p => String(p.Type).indexOf('Gift') !== -1).length;
  const couponRemaining = available.filter(p => String(p.Type).indexOf('Coupon') !== -1).length;
  const recent = history
    .filter(r => String(r.IsDuplicate).toUpperCase() !== 'TRUE')
    .slice(-12)
    .reverse()
    .map(r => ({
      timestamp: r.Timestamp,
      prizeType: r.PrizeType || '',
      type: r.PrizeType || ''
    }));
  const giftTotal = pool.filter(p => String(p.Type).indexOf('Gift') !== -1).length;
  const couponTotal = pool.filter(p => String(p.Type).indexOf('Coupon') !== -1).length;
  return {
    ok: true,
    total: pool.length,
    totalRemaining: available.length,
    totalClaimed: pool.length - available.length,
    giftTotal,
    couponTotal,
    giftRemaining,
    couponRemaining,
    giftClaimed: giftTotal - giftRemaining,
    couponClaimed: couponTotal - couponRemaining,
    recent
  };
}

function getAdminSummary() {
  ensureSetup_();
  const ss = getSpreadsheet_();
  const participants = getDataRows_(ss.getSheetByName(APP.SHEETS.PARTICIPANTS));
  const pool = getDataRows_(ss.getSheetByName(APP.SHEETS.POOL));
  const giftTotal = pool.filter(r => r.Type === 'Gacha Gift').length;
  const giftClaimed = pool.filter(r => r.Type === 'Gacha Gift' && isClaimed_(r)).length;
  const couponClaimed = pool.filter(r => String(r.Type).indexOf('Coupon') !== -1 && isClaimed_(r)).length;
  return { ok: true, totalParticipants: participants.filter(p => String(p.Duplicate).toUpperCase() !== 'TRUE').length, giftClaimed, giftRemaining: Math.max(0, giftTotal - giftClaimed), nonCashClaimed: couponClaimed, spreadsheetUrl: ss.getUrl() };
}

function getWall() {
  ensureSetup_();
  const ss = getSpreadsheet_();
  const cards = getDataRows_(ss.getSheetByName(APP.SHEETS.CARDS));
  const likes = getDataRows_(ss.getSheetByName(APP.SHEETS.LIKES));
  const likeCount = {};
  likes.forEach(v => { likeCount[v.CardID] = (likeCount[v.CardID] || 0) + 1; });
  const wall = cards.filter(c => c.CardID).map(c => ({
    timestamp: c.Timestamp,
    cardId: c.CardID,
    name: safeText_(c.Name),
    employeeId: safeText_(c.EmployeeID),
    team: safeText_(c.Team),
    profileName: safeText_(c.ProfileName),
    profileShort: safeText_(c.ProfileShort || String(c.ProfileName || '').split('—')[0].trim()),
    affirmation: safeText_(c.Affirmation),
    stickers: parseJSON_(c.StickersJSON, []),
    boardThumbDataUrl: c.BoardThumbDataUrl || '',
    boardImageUrl: c.BoardThumbDataUrl || c.BoardImageUrl || (c.ImageFileId ? ('https://drive.google.com/thumbnail?id=' + c.ImageFileId + '&sz=w1200') : ''),
    imageFileId: c.ImageFileId || '',
    likes: likeCount[c.CardID] || 0,
    votes: likeCount[c.CardID] || 0
  })).sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
  return { ok: true, cards: wall.slice(0, 160) };
}

function submitCard(payload) {
  ensureSetup_();
  const data = normalizePayload_(payload);
  const ss = getSpreadsheet_(); const now = now_();
  let cardId = String(data.cardId || '').trim();
  const existingCardRow = findRowByValue_(ss.getSheetByName(APP.SHEETS.CARDS), 'ParticipantKey', data.participantKey);
  if (existingCardRow > 0) {
    const headers = getHeaders_(ss.getSheetByName(APP.SHEETS.CARDS));
    cardId = ss.getSheetByName(APP.SHEETS.CARDS).getRange(existingCardRow, headers.indexOf('CardID') + 1).getValue() || cardId;
  }
  if (!cardId || cardId.indexOf('LOCAL-') === 0) cardId = 'CARD-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  appendQuiz_(ss, data, now);
  appendCard_(ss, data, cardId, now);
  log_('SUBMIT_CARD', data.participantKey + ' => ' + cardId);
  return { ok: true, message: 'บันทึก Mood Board แล้ว', cardId };
}

function submitAndSpin(payload) {
  // Backward compatible alias. The frontend now calls spinGacha with a small payload.
  return spinGacha(payload);
}

function spinGacha(payload) {
  ensureSetup_();
  const ss = getSpreadsheet_();
  const data = normalizeSpinPayload_(payload);
  const lock = LockService.getScriptLock();
  const lockOk = lock.tryLock(3000);
  if (!lockOk) {
    return { ok: false, message: 'ขณะนี้มีผู้ใช้งานหมุนพร้อมกันจำนวนมาก กรุณาลองใหม่อีกครั้งใน 3 วินาที' };
  }

  try {
    const participantsSheet = ss.getSheetByName(APP.SHEETS.PARTICIPANTS);
    const existingRow = findRowByValue_(participantsSheet, 'ParticipantKey', data.participantKey);

    if (existingRow > 0) {
      const existing = getRowObject_(participantsSheet, existingRow);
      // V20: if this participant already has a prize from an earlier run, make sure PrizePool row is also marked claimed.
      if (existing.PrizeID) {
        markPrizeClaimedById_(ss, existing.PrizeID, existing.ParticipantKey || data.participantKey, existing.Name || data.name, existing.CardID || data.cardId, now_());
      }
      const status = getPrizeStatusFast_(ss);
      return {
        ok: true,
        duplicate: true,
        message: 'คุณเคยหมุนวงล้อแล้ว ระบบแสดงผลรางวัลเดิม',
        profileName: existing.ProfileName || data.profileName,
        name: existing.Name || data.name,
        employeeId: existing.EmployeeID || data.employeeId,
        team: existing.Team || data.team,
        cardId: existing.CardID || data.cardId,
        prize: {
          prizeId: existing.PrizeID || '',
          name: existing.PrizeName || '',
          type: existing.PrizeType || '',
          budget: ''
        },
        prizeStatus: status
      };
    }

    const now = now_();
    const cardId = resolveCardIdForSpin_(ss, data);
    const prize = claimRandomPrizeFast_(ss, data.participantKey, data.name, cardId);
    // Force pending PrizePool update to apply before status is calculated and returned to the frontend.
    SpreadsheetApp.flush();

    appendObjectRow_(participantsSheet, {
      Timestamp: now,
      ParticipantKey: data.participantKey,
      Name: data.name,
      EmployeeID: data.employeeId,
      Team: data.team,
      ProfileKey: data.profileKey,
      ProfileName: data.profileName,
      Affirmation: data.affirmation,
      CardID: cardId,
      PrizeID: prize.prizeId,
      PrizeName: prize.name,
      PrizeType: prize.type,
      Duplicate: false,
      UserAgent: data.userAgent
    });

    appendEvaluation_(ss, data, prize, cardId, now);
    appendGachaHistory_(ss, data.participantKey, data.name, data.employeeId, cardId, prize.prizeId, prize.name, prize.type, prize.budget, false, now);

    const prizeStatus = getPrizeStatusFast_(ss);
    log_('SPIN_OK', data.participantKey + ' => ' + prize.prizeId + ' / ' + prize.type);

    return {
      ok: true,
      duplicate: false,
      message: 'หมุนวงล้อสำเร็จ',
      profileName: data.profileName,
      name: data.name,
      employeeId: data.employeeId,
      team: data.team,
      cardId: cardId,
      prize: prize,
      prizeStatus: prizeStatus
    };

  } catch (err) {
    log_('SPIN_ERROR', err.stack || err.message || String(err));
    return { ok: false, message: err.message || String(err) };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function normalizeSpinPayload_(payload) {
  const p = payload || {};
  const name = safeText_(p.name || '').slice(0, 80);
  const employeeId = safeText_(p.employeeId || p.emailOrId || p.email || '').slice(0, 160);
  const team = safeText_(p.team || '').slice(0, 100);
  if (!name) throw new Error('กรุณากรอกชื่อ');
  if (!employeeId) throw new Error('กรุณากรอก Employee ID');
  const profileKey = APP.PROFILES[p.profileKey] ? p.profileKey : inferProfileFromScores_(p.scores || {});
  const profileName = safeText_(p.profileName || APP.PROFILES[profileKey] || APP.PROFILES.calm);
  return {
    cardId: safeText_(p.cardId || '').slice(0, 80),
    participantKey: makeKey_(employeeId),
    name: name,
    employeeId: employeeId,
    team: team,
    profileKey: profileKey,
    profileName: profileName,
    profileShort: safeText_(p.profileShort || String(profileName || '').split('—')[0].trim()),
    scores: p.scores || {},
    affirmation: safeText_(p.affirmation || 'วันนี้ฉันอนุญาตให้ตัวเองพักได้').slice(0, 220),
    evaluation: p.evaluation || {},
    userAgent: safeText_(p.userAgent || '').slice(0, 400)
  };
}

function resolveCardIdForSpin_(ss, data) {
  const cardsSheet = ss.getSheetByName(APP.SHEETS.CARDS);
  let cardId = String(data.cardId || '').trim();
  const existingCardRow = findRowByValue_(cardsSheet, 'ParticipantKey', data.participantKey);
  if (existingCardRow > 0) {
    const existing = getRowObject_(cardsSheet, existingCardRow);
    if (existing.CardID) return String(existing.CardID);
  }
  if (!cardId || cardId.indexOf('LOCAL-') === 0) cardId = 'CARD-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  return cardId;
}

function claimRandomPrizeFast_(ss, participantKey, participantName, cardId) {
  const sh = ss.getSheetByName(APP.SHEETS.POOL);
  if (!sh || sh.getLastRow() < 2) throw new Error('PrizePool ยังไม่พร้อม กรุณา Run setupSheets ก่อน');
  const range = sh.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const idx = h => headers.indexOf(h);
  const available = [];

  for (let i = 1; i < values.length; i++) {
    if (!isClaimedObj_(values[i], headers)) available.push(i);
  }

  if (!available.length) {
    return { prizeId: 'WAITLIST', rollNo: '', type: 'Waitlist', name: 'รางวัลหมดแล้ว — ระบบบันทึกชื่อไว้สำหรับรอบสำรอง', budget: 0 };
  }

  const selectedIndex = available[Math.floor(Math.random() * available.length)];
  const row = values[selectedIndex].slice();
  const set = (h, v) => { const c = idx(h); if (c >= 0) row[c] = v; };
  set('Status', 'Claimed');
  set('Claimed', true);
  set('ClaimedAt', now_());
  set('ParticipantKey', participantKey);
  set('ParticipantName', participantName);
  set('CardID', cardId);
  sh.getRange(selectedIndex + 1, 1, 1, headers.length).setValues([row]);

  return {
    prizeId: row[idx('PrizeID')],
    rollNo: idx('RollNo') >= 0 ? row[idx('RollNo')] : '',
    type: row[idx('Type')],
    name: row[idx('PrizeName')],
    budget: row[idx('BudgetTHB')]
  };
}

function likeCard(payload) {
  ensureSetup_();
  const data = payload || {};
  const cardId = String(data.cardId || '').trim();
  const voterKey = makeKey_(data.voterKey || data.employeeId || 'anonymous');
  if (!cardId) return { ok: false, message: 'ไม่พบ Card ID' };
  const ss = getSpreadsheet_(); const likeSheet = ss.getSheetByName(APP.SHEETS.LIKES);
  const existing = findLikeRow_(likeSheet, cardId, voterKey);
  if (existing > 0) return { ok: true, duplicate: true, message: 'คุณกดหัวใจแล้ว', likes: countLikes_(likeSheet, cardId) };
  const card = getDataRows_(ss.getSheetByName(APP.SHEETS.CARDS)).find(c => String(c.CardID) === cardId);
  likeSheet.appendRow([now_(), voterKey, cardId, card ? card.ParticipantKey : '', card ? card.Name : '']);
  return { ok: true, message: 'ส่งหัวใจแล้ว', likes: countLikes_(likeSheet, cardId) };
}

/*********************** APPEND / CLAIM ************************/

function appendQuiz_(ss, data, timestamp) {
  const sh = ss.getSheetByName(APP.SHEETS.QUIZ); const q = data.quizAnswers || []; const answers = [];
  for (let i = 0; i < 5; i++) { const item = q[i] || {}; answers.push((item.answerTitle || item.answerKey || '').toString()); }
  const rowObj = { Timestamp: timestamp, ParticipantKey: data.participantKey, Name: data.name, Q1: answers[0], Q2: answers[1], Q3: answers[2], Q4: answers[3], Q5: answers[4], ScoreJSON: JSON.stringify(data.scores || {}), ProfileKey: data.profileKey, ProfileName: data.profileName };
  const existingRow = findRowByValue_(sh, 'ParticipantKey', data.participantKey);
  if (existingRow > 0) setRowObject_(sh, existingRow, rowObj); else appendObjectRow_(sh, rowObj);
}

function appendCard_(ss, data, cardId, timestamp) {
  const sh = ss.getSheetByName(APP.SHEETS.CARDS);
  const rowObj = { Timestamp: timestamp, CardID: cardId, ParticipantKey: data.participantKey, Name: data.name, EmployeeID: data.employeeId, Team: data.team, ProfileKey: data.profileKey, ProfileName: data.profileName, ProfileShort: data.profileShort || String(data.profileName || '').split('—')[0].trim(), ThemeIndex: data.cardStyle.themeIndex, ThemeName: data.cardStyle.themeName || '', Affirmation: data.affirmation, StickersJSON: JSON.stringify(data.stickers || []), LayoutJSON: JSON.stringify(data.boardItems || []), BoardImageUrl: '', BoardThumbDataUrl: '', ImageFileId: '' };
  let existingRow = findRowByValue_(sh, 'CardID', cardId);
  if (existingRow < 1) existingRow = findRowByValue_(sh, 'ParticipantKey', data.participantKey);
  if (existingRow > 0) {
    const headers = getHeaders_(sh);
    rowObj.BoardImageUrl = headers.indexOf('BoardImageUrl') >= 0 ? sh.getRange(existingRow, headers.indexOf('BoardImageUrl') + 1).getValue() : '';
    rowObj.BoardThumbDataUrl = headers.indexOf('BoardThumbDataUrl') >= 0 ? sh.getRange(existingRow, headers.indexOf('BoardThumbDataUrl') + 1).getValue() : '';
    rowObj.ImageFileId = headers.indexOf('ImageFileId') >= 0 ? sh.getRange(existingRow, headers.indexOf('ImageFileId') + 1).getValue() : '';
    setRowObject_(sh, existingRow, rowObj);
  } else appendObjectRow_(sh, rowObj);
}

function appendEvaluation_(ss, data, prize, cardId, timestamp) {
  const ev = data.evaluation || {};
  appendObjectRow_(ss.getSheetByName(APP.SHEETS.EVAL), { Timestamp: timestamp, ParticipantKey: data.participantKey, Name: data.name, EmployeeID: data.employeeId, OverallRating: ev.overallRating || '', FeelingsJSON: JSON.stringify(ev.feelings || []), WantAgain: ev.wantAgain || '', Comment: ev.comment || '', PrizeID: prize.prizeId, CardID: cardId });
}
function appendGachaHistory_(ss, participantKey, name, employeeId, cardId, prizeId, prizeName, prizeType, budget, duplicate, timestamp) {
  appendObjectRow_(ss.getSheetByName(APP.SHEETS.GACHA), { Timestamp: timestamp || now_(), ParticipantKey: participantKey, ParticipantName: name, EmployeeID: employeeId, CardID: cardId, PrizeID: prizeId, PrizeName: prizeName, PrizeType: prizeType, BudgetTHB: budget, IsDuplicate: duplicate });
}

function claimRandomPrize_(ss, participantKey, participantName, cardId) {
  const sh = ss.getSheetByName(APP.SHEETS.POOL);
  const values = sh.getDataRange().getValues(); const headers = values.shift();
  const idx = h => headers.indexOf(h);
  const available = [];
  values.forEach((row, i) => { if (!isClaimedObj_(row, headers)) available.push({ rowNumber: i + 2, row }); });
  if (!available.length) return { prizeId: 'WAITLIST', type: 'Waitlist', name: 'รางวัลหมดแล้ว — ระบบบันทึกชื่อไว้สำหรับรอบสำรอง', budget: 0 };
  const selected = available[Math.floor(Math.random() * available.length)]; const row = selected.row;
  const updates = { Status: 'Claimed', Claimed: true, ClaimedAt: now_(), ParticipantKey: participantKey, ParticipantName: participantName, CardID: cardId };
  Object.keys(updates).forEach(h => { if (idx(h) >= 0) sh.getRange(selected.rowNumber, idx(h) + 1).setValue(updates[h]); });
  return { prizeId: row[idx('PrizeID')], rollNo: row[idx('RollNo')], type: row[idx('Type')], name: row[idx('PrizeName')], budget: row[idx('BudgetTHB')] };
}
function isClaimedObj_(row, headers) {
  const claimed = headers.indexOf('Claimed') >= 0 ? row[headers.indexOf('Claimed')] : '';
  const status = headers.indexOf('Status') >= 0 ? row[headers.indexOf('Status')] : '';
  return String(claimed).toUpperCase() === 'TRUE' || String(status).toLowerCase() === 'claimed';
}
function sendGiftEmail_(data, prize, cardId) {
  // V11 intentionally disabled: showing prize popup only prevents Apps Script timeout and removes extra authorization.
  log_('GIFT_POPUP_ONLY', (data && data.employeeId || '') + ' => ' + (prize && prize.name || ''));
}


/*********************** V20 PRIZEPOOL REPAIR ************************/

function reconcilePrizePoolClaims_(ss) {
  // Idempotent repair: mark PrizePool as claimed for every PrizeID already present in Participants/GachaHistory.
  // Safe to run repeatedly; it only writes rows that are still Available.
  try {
    const poolSheet = ss.getSheetByName(APP.SHEETS.POOL);
    if (!poolSheet || poolSheet.getLastRow() < 2) return { ok: true, repaired: 0 };

    const claimedMap = {};
    const participants = getDataRows_(ss.getSheetByName(APP.SHEETS.PARTICIPANTS));
    participants.forEach(r => {
      const prizeId = String(r.PrizeID || '').trim();
      if (prizeId && prizeId !== 'WAITLIST') {
        claimedMap[prizeId] = {
          participantKey: r.ParticipantKey || '',
          participantName: r.Name || '',
          cardId: r.CardID || '',
          claimedAt: r.Timestamp || now_()
        };
      }
    });

    const history = getDataRows_(ss.getSheetByName(APP.SHEETS.GACHA));
    history.forEach(r => {
      const prizeId = String(r.PrizeID || '').trim();
      if (prizeId && prizeId !== 'WAITLIST' && String(r.IsDuplicate).toUpperCase() !== 'TRUE') {
        claimedMap[prizeId] = {
          participantKey: r.ParticipantKey || claimedMap[prizeId]?.participantKey || '',
          participantName: r.ParticipantName || claimedMap[prizeId]?.participantName || '',
          cardId: r.CardID || claimedMap[prizeId]?.cardId || '',
          claimedAt: r.Timestamp || claimedMap[prizeId]?.claimedAt || now_()
        };
      }
    });

    let repaired = 0;
    Object.keys(claimedMap).forEach(prizeId => {
      const info = claimedMap[prizeId];
      if (markPrizeClaimedById_(ss, prizeId, info.participantKey, info.participantName, info.cardId, info.claimedAt)) repaired++;
    });
    if (repaired > 0) {
      SpreadsheetApp.flush();
      log_('REPAIR_PRIZEPOOL_CLAIMS', 'Repaired claimed PrizePool rows: ' + repaired);
    }
    return { ok: true, repaired };
  } catch (err) {
    log_('REPAIR_PRIZEPOOL_ERROR', err.stack || err.message || String(err));
    return { ok: false, message: err.message || String(err) };
  }
}

function markPrizeClaimedById_(ss, prizeId, participantKey, participantName, cardId, claimedAt) {
  const sh = ss.getSheetByName(APP.SHEETS.POOL);
  if (!sh || sh.getLastRow() < 2 || !prizeId) return false;
  const headers = getHeaders_(sh);
  const colPrize = headers.indexOf('PrizeID') + 1;
  if (colPrize < 1) return false;
  const values = sh.getRange(2, colPrize, sh.getLastRow() - 1, 1).getValues().flat();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i]).trim() === String(prizeId).trim()) {
      const rowNumber = i + 2;
      const row = getRowObject_(sh, rowNumber);
      if (isClaimed_(row)) return false;
      const updates = {
        Status: 'Claimed',
        Claimed: true,
        ClaimedAt: claimedAt || now_(),
        ParticipantKey: participantKey || row.ParticipantKey || '',
        ParticipantName: participantName || row.ParticipantName || '',
        CardID: cardId || row.CardID || ''
      };
      setRowObject_(sh, rowNumber, updates);
      return true;
    }
  }
  return false;
}

function repairPrizePoolClaimsNow() {
  ensureSetup_();
  return reconcilePrizePoolClaims_(getSpreadsheet_());
}

/*********************** IMAGE UPLOAD ************************/

function saveBoardImage_(body) {
  const cardId = String(body.cardId || '').trim();
  const dataUrl = String(body.boardImage || '');
  const thumbDataUrl = String(body.thumbImage || body.boardThumbDataUrl || '');
  if (!cardId || dataUrl.indexOf('base64,') === -1) return { ok: false, message: 'Missing card image data' };
  const ss = getSpreadsheet_();
  const cardsSheet = ss.getSheetByName(APP.SHEETS.CARDS);
  const folder = getOrCreateFolder_(APP.DRIVE_FOLDER);
  const contentType = (dataUrl.match(/^data:(.*?);base64,/) || [])[1] || 'image/jpeg';
  const base64 = dataUrl.split('base64,')[1];
  const blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, cardId + '.jpg');
  const file = folder.createFile(blob);
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) { console.log(err); }
  const imageUrl = 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200';
  const row = findRowByValue_(cardsSheet, 'CardID', cardId);
  if (row > 0) {
    const headers = getHeaders_(cardsSheet);
    if (headers.indexOf('BoardImageUrl') >= 0) cardsSheet.getRange(row, headers.indexOf('BoardImageUrl') + 1).setValue(imageUrl);
    if (headers.indexOf('BoardThumbDataUrl') >= 0 && thumbDataUrl && thumbDataUrl.length < 48000) cardsSheet.getRange(row, headers.indexOf('BoardThumbDataUrl') + 1).setValue(thumbDataUrl);
    if (headers.indexOf('ImageFileId') >= 0) cardsSheet.getRange(row, headers.indexOf('ImageFileId') + 1).setValue(file.getId());
  }
  log_('SAVE_BOARD_IMAGE', cardId + ' => ' + file.getId());
  return { ok: true, cardId, imageUrl, thumbSaved: !!thumbDataUrl, fileId: file.getId() };
}
function getOrCreateFolder_(name) { const folders = DriveApp.getFoldersByName(name); return folders.hasNext() ? folders.next() : DriveApp.createFolder(name); }

/*********************** HELPERS ************************/

function getSpreadsheet_() {
  const rawId = String(SPREADSHEET_ID || '').trim();
  if (rawId) {
    const sheetId = extractSpreadsheetId_(rawId);
    if (!sheetId) throw new Error('SPREADSHEET_ID ไม่ถูกต้อง: กรุณาใส่ Google Sheet ID หรือ Google Sheet URL เท่านั้น');
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', sheetId);
    return SpreadsheetApp.openById(sheetId);
  }
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty('SPREADSHEET_ID');
  if (savedId) return SpreadsheetApp.openById(savedId);
  try { const active = SpreadsheetApp.getActiveSpreadsheet(); if (active) { props.setProperty('SPREADSHEET_ID', active.getId()); return active; } } catch (err) { console.log(err); }
  if (CREATE_NEW_SHEET_IF_EMPTY) { const ss = SpreadsheetApp.create('Color Your Stress Responses'); props.setProperty('SPREADSHEET_ID', ss.getId()); return ss; }
  throw new Error('ยังไม่ได้ใส่ SPREADSHEET_ID และไม่ได้เปิด CREATE_NEW_SHEET_IF_EMPTY');
}
function extractSpreadsheetId_(input) {
  const text = String(input || '').trim(); if (!text) return '';
  const match = text.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/); if (match && match[1]) return match[1];
  if (text.indexOf('script.google.com') !== -1 || text.indexOf('/projects/') !== -1) throw new Error('ห้ามใส่ Apps Script Project URL/ID ใน SPREADSHEET_ID — ต้องใช้ Google Sheet URL/ID เท่านั้น');
  if (/^[a-zA-Z0-9-_]{25,}$/.test(text)) return text;
  return '';
}
function normalizePayload_(payload) {
  const p = payload || {}; const name = safeText_(p.name || '').slice(0, 80); const employeeId = safeText_(p.employeeId || p.emailOrId || p.email || '').slice(0, 160); const team = safeText_(p.team || '').slice(0, 100);
  if (!name) throw new Error('กรุณากรอกชื่อ'); if (!employeeId) throw new Error('กรุณากรอก Employee ID');
  const participantKey = makeKey_(employeeId); const profileKey = APP.PROFILES[p.profileKey] ? p.profileKey : inferProfileFromScores_(p.scores || {}); const profileName = APP.PROFILES[profileKey] || APP.PROFILES.calm;
  return { cardId: safeText_(p.cardId || '').slice(0, 80), participantKey, name, employeeId, team, profileKey, profileName, profileShort: safeText_(p.profileShort || String(profileName).split('—')[0].trim()), scores: p.scores || {}, quizAnswers: Array.isArray(p.quizAnswers) ? p.quizAnswers.slice(0, 5) : [], affirmation: safeText_(p.affirmation || 'วันนี้ฉันอนุญาตให้ตัวเองพักได้').slice(0, 220), cardStyle: p.cardStyle || { themeIndex: 0, themeName: 'Blush Pink' }, boardItems: Array.isArray(p.boardItems) ? p.boardItems.slice(0, 80) : [], stickers: Array.isArray(p.stickers) ? p.stickers.slice(0, 40) : [], evaluation: p.evaluation || {}, userAgent: safeText_(p.userAgent || '').slice(0, 400) };
}
function inferProfileFromScores_(scores) { return ['calm','fresh','bloom','focus'].sort((a,b) => Number(scores[b] || 0) - Number(scores[a] || 0))[0] || 'calm'; }
function getRowObject_(sheet, rowNumber) { const headers = getHeaders_(sheet); const values = sheet.getRange(rowNumber, 1, 1, Math.max(1, headers.length)).getValues()[0]; const obj = {}; headers.forEach((h,i) => { obj[h] = values[i]; }); return obj; }
function findExistingParticipant_(sheet, participantKey) { return getDataRows_(sheet).find(r => String(r.ParticipantKey) === participantKey && String(r.Duplicate).toUpperCase() !== 'TRUE') || null; }
function appendObjectRow_(sheet, obj) { const headers = getHeaders_(sheet); sheet.appendRow(headers.map(h => Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : '')); }
function setRowObject_(sheet, rowNumber, obj) { const headers = getHeaders_(sheet); headers.forEach((h,i) => { if (Object.prototype.hasOwnProperty.call(obj, h)) sheet.getRange(rowNumber, i + 1).setValue(obj[h]); }); }
function getDataRows_(sheet) { if (!sheet || sheet.getLastRow() < 2) return []; const values = sheet.getDataRange().getValues(); const headers = values.shift(); return values.filter(row => row.some(v => v !== '')).map(row => { const obj = {}; headers.forEach((h,i) => { obj[h] = row[i]; }); return obj; }); }
function getHeaders_(sheet) { return sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0]; }
function findRowByValue_(sheet, headerName, value) { const headers = getHeaders_(sheet); const col = headers.indexOf(headerName) + 1; if (col < 1 || sheet.getLastRow() < 2) return -1; const values = sheet.getRange(2, col, sheet.getLastRow() - 1, 1).getValues().flat(); for (let i=0;i<values.length;i++) if (String(values[i]) === String(value)) return i + 2; return -1; }
function findLikeRow_(sheet, cardId, voterKey) { if (!sheet || sheet.getLastRow() < 2) return -1; const data = getDataRows_(sheet); for (let i=0;i<data.length;i++) if (String(data[i].CardID) === String(cardId) && String(data[i].VoterKey) === String(voterKey)) return i + 2; return -1; }
function countLikes_(sheet, cardId) { if (!sheet || sheet.getLastRow() < 2) return 0; return getDataRows_(sheet).filter(r => String(r.CardID) === String(cardId)).length; }
function isClaimed_(row) { return String(row.Claimed).toUpperCase() === 'TRUE' || String(row.Status).toLowerCase() === 'claimed'; }
function parseJSON_(text, fallback) { try { if (!text) return fallback; return JSON.parse(text); } catch (err) { return fallback; } }
function makeKey_(value) { return String(value || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9@._-]/g, ''); }
function safeText_(value) { return String(value || '').replace(/[<>]/g, '').replace(/[\u0000-\u001F\u007F]/g, '').trim(); }
function escapeHtml_(value) { return String(value || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
function now_() { return Utilities.formatDate(new Date(), APP.TZ, 'yyyy-MM-dd HH:mm:ss'); }
function log_(event, detail) { try { const ss = getSpreadsheet_(); const sh = ss.getSheetByName(APP.SHEETS.LOGS) || setupSheet_(ss, APP.SHEETS.LOGS, ['Timestamp', 'Event', 'Detail']); sh.appendRow([now_(), event, String(detail || '')]); } catch (err) { console.log(err); } }
