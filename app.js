'use strict';

const QUIZ = [
  {
    q: 'วันนี้พลังใจของคุณใกล้เคียงแบบไหนที่สุด?',
    options: [
      { key: 'calm', emoji: '☁️', title: 'อยากพักเงียบ ๆ', desc: 'อยากให้ใจเบาลงและไม่เร่งตัวเอง' },
      { key: 'fresh', emoji: '🍊', title: 'อยากได้พลังใหม่', desc: 'อยากเปลี่ยนบรรยากาศและเริ่มต้นใหม่' },
      { key: 'bloom', emoji: '🌷', title: 'อยากได้กำลังใจ', desc: 'อยากได้รับความอบอุ่นและการซัพพอร์ต' },
      { key: 'focus', emoji: '🧩', title: 'อยากจัดระบบ', desc: 'อยากให้ความคิดนิ่งและชัดเจนขึ้น' }
    ]
  },
  {
    q: 'เวลารู้สึกเครียด คุณมักต้องการอะไรเป็นอย่างแรก?',
    options: [
      { key: 'calm', emoji: '🍵', title: 'เวลาพักสั้น ๆ', desc: 'หยุดหายใจและค่อยกลับมา' },
      { key: 'fresh', emoji: '🚶', title: 'เปลี่ยนบรรยากาศ', desc: 'ลุกเดิน ฟังเพลง หรือหาไอเดียใหม่' },
      { key: 'bloom', emoji: '🤝', title: 'คนรับฟัง', desc: 'พูดคุยกับคนที่ไว้ใจ' },
      { key: 'focus', emoji: '📝', title: 'แผนที่ชัดเจน', desc: 'ลิสต์สิ่งที่ต้องทำทีละข้อ' }
    ]
  },
  {
    q: 'สีไหนสะท้อนความรู้สึกของคุณตอนนี้?',
    options: [
      { key: 'bloom', emoji: '🌸', title: 'ชมพูอ่อน', desc: 'อ่อนโยนและอยากดูแลตัวเอง' },
      { key: 'calm', emoji: '💙', title: 'ฟ้า', desc: 'อยากผ่อนคลายและสบายใจ' },
      { key: 'fresh', emoji: '💛', title: 'เหลือง', desc: 'อยากได้ความหวังและพลังบวก' },
      { key: 'focus', emoji: '🌿', title: 'เขียว', desc: 'อยากกลับสู่สมดุลและมั่นคง' }
    ]
  },
  {
    q: 'ประโยคไหนคือสิ่งที่คุณอยากบอกตัวเองวันนี้?',
    options: [
      { key: 'calm', emoji: '🌙', title: 'พักได้ ไม่ต้องรีบตลอดเวลา', desc: 'ให้พื้นที่กับตัวเองมากขึ้น' },
      { key: 'fresh', emoji: '✨', title: 'เริ่มใหม่ได้เสมอ', desc: 'ยังมีโอกาสและมุมมองใหม่ ๆ' },
      { key: 'bloom', emoji: '💗', title: 'เราทำดีที่สุดแล้ว', desc: 'ใจดีกับตัวเองอีกนิด' },
      { key: 'focus', emoji: '🎯', title: 'ทำทีละอย่างก็พอ', desc: 'ค่อย ๆ จัดการทีละขั้น' }
    ]
  },
  {
    q: 'หลังจบกิจกรรมนี้ คุณอยากได้อะไรกลับไป?',
    options: [
      { key: 'calm', emoji: '🍵', title: 'ความสงบ', desc: 'รู้สึกเบาและพักใจขึ้น' },
      { key: 'fresh', emoji: '⚡', title: 'พลังบวก', desc: 'พร้อมเริ่มต่ออย่างสดชื่น' },
      { key: 'bloom', emoji: '🤗', title: 'ความอบอุ่น', desc: 'รู้สึกมีคนซัพพอร์ต' },
      { key: 'focus', emoji: '📌', title: 'ความชัดเจน', desc: 'รู้ว่าควรเริ่มจากอะไร' }
    ]
  }
];

const PROFILES = {
  calm: {
    emoji: '☁️', short: 'Calm Cloud', label: 'Calm Cloud — ต้องการพักใจและลดความเร่ง',
    meaning: 'คุณอาจกำลังใช้พลังเยอะและต้องการพื้นที่สงบเพื่อให้ใจได้พัก',
    thinking: 'ในใจอาจกำลังคิดว่า “ขอช้าลงนิดหนึ่งได้ไหม” หรืออยากมีเวลาหายใจให้เต็มปอด',
    tips: ['พักสายตา 3 นาที', 'ดื่มน้ำช้า ๆ', 'ปิดแจ้งเตือนสักครู่']
  },
  fresh: {
    emoji: '✨', short: 'Fresh Spark', label: 'Fresh Spark — ต้องการพลังใหม่และความสดชื่น',
    meaning: 'คุณอาจกำลังมองหาความสดชื่น ไอเดียใหม่ หรือแรงบันดาลใจเล็ก ๆ',
    thinking: 'ในใจอาจกำลังคิดว่า “อยากเปลี่ยนบรรยากาศ” หรืออยากลองเริ่มใหม่ด้วยพลังที่เบาขึ้น',
    tips: ['เดินเปลี่ยนมุม 5 นาที', 'เปิดเพลงที่ชอบ', 'เลือกทำงานง่ายสุดก่อน']
  },
  bloom: {
    emoji: '🌷', short: 'Warm Bloom', label: 'Warm Bloom — ต้องการความอบอุ่นและกำลังใจ',
    meaning: 'คุณอาจต้องการการซัพพอร์ต ความเข้าใจ หรือคำพูดดี ๆ ให้ใจฟูขึ้น',
    thinking: 'ในใจอาจกำลังคิดว่า “อยากมีคนเข้าใจ” หรืออยากบอกตัวเองว่าทำได้ดีแล้ว',
    tips: ['ส่งคำขอบคุณให้ใครสักคน', 'เขียนสิ่งที่ทำได้ดี 1 อย่าง', 'คุยกับ buddy สั้น ๆ']
  },
  focus: {
    emoji: '🧩', short: 'Focus Stone', label: 'Focus Stone — ต้องการความนิ่งและจัดระบบความคิด',
    meaning: 'คุณอาจมีหลายเรื่องในหัวและอยากเห็นภาพรวมชัดขึ้น',
    thinking: 'ในใจอาจกำลังคิดว่า “เริ่มจากตรงไหนดี” หรืออยากจัดลำดับสิ่งสำคัญก่อน',
    tips: ['ลิสต์ 3 งานหลัก', 'เลือกงานถัดไป 1 อย่าง', 'ตั้ง timer 15 นาที']
  }
};

const THEME_LABELS = ['Blush Pink', 'Soft Sky', 'Healing Green', 'Lavender Dream', 'Sunny Peach'];
const THEME_COLORS = ['#ffe1e7', '#dfefff', '#e3f3dc', '#e8ddff', '#fff0ba'];
const STICKERS = ['🌸','🌿','✨','☁️','💧','🌙','🌈','⭐','💐','❤️','🎧','🍃','🌷','🧸','🍊','🍵','🌻','😊','🐻','☕','🍀','🌼','🌞','💡','🎁','🎀','🪴','🌺','🍄','💫'];

let currentQuiz = 0;
let quizAnswers = [];
let selectedTheme = 0;
let customThemeColor = '';
let boardItems = [];
let selectedItemId = '';
let preparedPayload = null;
let lastSpinResponse = null;
let submittedLocalCards = [];
let localDemo = loadDemoState();
let likedLocal = loadLikedState();
let lastBoardImage = '';
let uploadedImageForCardId = '';
let apiCache = { wall: { ts: 0, data: [] }, prize: { ts: 0, data: null } };
let inFlight = {};
let prizeAutoTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  // Boot each section separately so one UI issue never leaves the Quiz blank.
  safeRun(initUI, 'initUI');
  safeRun(checkConnection, 'checkConnection');
  safeRun(renderQuiz, 'renderQuiz');
  safeRun(() => loadPrizeStatus(false), 'loadPrizeStatus');
  safeRun(() => refreshWall(false), 'refreshWall');
});

function safeRun(fn, label) {
  try { return fn(); }
  catch (err) {
    console.error(`[Color Your Stress] ${label} failed`, err);
    const toast = document.getElementById('toast');
    if (toast) showToast(`โหลดส่วน ${label} ไม่สำเร็จ กด Refresh อีกครั้ง`);
  }
}

function config() {
  return Object.assign({
    GAS_WEBAPP_URL: '',
    DEMO_MODE: false,
    REQUIRE_EMAIL: true,
    SAVE_BOARD_IMAGE_TO_DRIVE: true,
    CONTACT_LINE_ID: 'friendly_dukdik',
    CONTACT_MS_TEAM: 'Siripak Chattanupakorn'
  }, window.APP_CONFIG || {});
}
function isLiveMode() { return !!String(config().GAS_WEBAPP_URL || '').trim(); }

function initUI() {
  renderSwatches();
  renderStickerPalette();
  setTheme(0);
  syncBoardText();
}

// Fix V11 blank quiz: this function is called during boot and when user edits
// Mood Board information. It must exist before renderQuiz runs.
function syncBoardText() {
  const nameInput = document.getElementById('nameInput');
  const affirmInput = document.getElementById('affirmInput');
  const cardName = document.getElementById('cardName');
  const cardAffirm = document.getElementById('cardAffirm');
  const cardProfile = document.getElementById('cardProfile');

  if (cardName) cardName.textContent = (nameInput && nameInput.value.trim()) || 'Your Name';
  if (cardAffirm) cardAffirm.textContent = (affirmInput && affirmInput.value.trim()) || 'วันนี้ฉันอนุญาตให้ตัวเองพักได้';

  if (cardProfile && quizAnswers.filter(Boolean).length >= QUIZ.length) {
    const p = getProfile();
    cardProfile.textContent = p.label;
  } else if (cardProfile && !cardProfile.textContent.trim()) {
    cardProfile.textContent = 'เลือก Mood Profile จาก Quiz ก่อนเริ่มตกแต่ง';
  }
}

function refreshAll() {
  checkConnection();
  loadPrizeStatus(false, true);
  refreshWall(false, true);
}

function goStep(id) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  document.querySelectorAll('.step-dot').forEach(el => el.classList.remove('active'));
  const map = { stepQuiz: 'navQuiz', stepDecorate: 'navDecorate', stepGacha: 'navGacha', stepWall: 'navWall' };
  document.getElementById(map[id])?.classList.add('active');
  if (id === 'stepGacha') startPrizeAutoRefresh(); else stopPrizeAutoRefresh();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function startPrizeAutoRefresh() {
  stopPrizeAutoRefresh();
  loadPrizeStatus(false, true);
  prizeAutoTimer = setInterval(() => loadPrizeStatus(false, true), 9000);
}
function stopPrizeAutoRefresh() {
  if (prizeAutoTimer) clearInterval(prizeAutoTimer);
  prizeAutoTimer = null;
}
function guardDecorateNav() {
  if (quizAnswers.length < QUIZ.length) return showToast('กรุณาทำ Quiz ให้ครบก่อนนะคะ');
  goStep('stepDecorate');
}
function guardGachaNav() {
  if (!preparedPayload) return showToast('กรุณาส่ง Mood Board ก่อนค่ะ');
  goStep('stepGacha');
}

function renderQuiz() {
  const quiz = QUIZ[currentQuiz];
  const selected = quizAnswers[currentQuiz];
  const box = document.getElementById('quizBox');
  if (!box || !quiz) return;
  box.innerHTML = `
    <div class="quiz-question">${escapeHtml(quiz.q)}</div>
    <div class="quiz-options">
      ${quiz.options.map(op => `
        <button class="quiz-option ${selected === op.key ? 'selected' : ''}" onclick="selectQuiz('${op.key}')">
          <span class="emoji">${op.emoji}</span>
          <span><strong>${escapeHtml(op.title)}</strong><small>${escapeHtml(op.desc)}</small></span>
        </button>`).join('')}
    </div>`;
  document.getElementById('quizProgress').textContent = `${Math.min(quizAnswers.filter(Boolean).length, QUIZ.length)}/${QUIZ.length}`;
  document.getElementById('quizNextBtn').textContent = currentQuiz === QUIZ.length - 1 ? 'ดูผล Mood Profile' : 'ถัดไป';
}
function selectQuiz(key) { quizAnswers[currentQuiz] = key; renderQuiz(); }
function nextQuiz() {
  if (!quizAnswers[currentQuiz]) return showToast('เลือกคำตอบก่อนนะคะ');
  if (currentQuiz < QUIZ.length - 1) { currentQuiz += 1; renderQuiz(); return; }
  syncProfileToBoard();
  showProfileModal();
}
function prevQuiz() { if (currentQuiz > 0) { currentQuiz -= 1; renderQuiz(); } }

function getProfile() {
  const scores = { calm: 0, fresh: 0, bloom: 0, focus: 0 };
  quizAnswers.forEach(k => { if (scores[k] !== undefined) scores[k] += 1; });
  const key = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0] || 'calm';
  return Object.assign({ key, scores }, PROFILES[key] || PROFILES.calm);
}
function syncProfileToBoard() {
  const profile = getProfile();
  document.getElementById('profileBadge').textContent = profile.short;
  document.getElementById('cardProfile').textContent = profile.label;
}
function showProfileModal() {
  const p = getProfile();
  document.getElementById('profileModalContent').innerHTML = `
    <div class="profile-icon">${p.emoji}</div>
    <p class="eyebrow">Your Mood Profile</p>
    <h2>${escapeHtml(p.short)}</h2>
    <div class="profile-summary">
      <p><strong>ความหมาย:</strong> ${escapeHtml(p.meaning)}</p>
      <p><strong>ตอนนี้อาจกำลังคิดว่า:</strong> ${escapeHtml(p.thinking)}</p>
    </div>
    <h3>Tips เล็ก ๆ สำหรับวันนี้</h3>
    <div class="tip-grid">${p.tips.map(t => `<div class="tip-card">${escapeHtml(t)}</div>`).join('')}</div>
    <div class="quiz-result-actions">
      <button class="ghost" onclick="closeProfileModal()">กลับไปแก้ Quiz</button>
      <button class="primary big" onclick="closeProfileModal(); goStep('stepDecorate')">ไปตกแต่ง Mood Board</button>
    </div>`;
  document.getElementById('profileModal').classList.remove('hidden');
}
function closeProfileModal() { document.getElementById('profileModal').classList.add('hidden'); }

function renderSwatches() {
  const box = document.getElementById('swatches');
  box.innerHTML = THEME_COLORS.map((c, i) => `<button class="swatch ${customThemeColor === '' && i === selectedTheme ? 'active' : ''}" title="${THEME_LABELS[i]}" style="background:${c}" onclick="setTheme(${i})"></button>`).join('');
}
function setTheme(i) {
  selectedTheme = i;
  customThemeColor = '';
  const card = document.getElementById('cooldownCard');
  card.className = `cooldown-card theme-${i}`;
  card.style.background = '';
  renderSwatches();
}
function applyCustomMoodColor() {
  const color = document.getElementById('customColorInput')?.value || '#ffe1e7';
  customThemeColor = color;
  selectedTheme = 'custom';
  const card = document.getElementById('cooldownCard');
  card.className = 'cooldown-card custom-theme';
  card.style.background = `linear-gradient(135deg, ${color}, #fff8ec)`;
  renderSwatches();
}
function renderStickerPalette() {
  const box = document.getElementById('stickerPalette');
  box.innerHTML = STICKERS.map(st => `
    <button class="sticker-btn emoji-font" type="button" title="${escapeAttr(st)}" onclick="addBoardItem('emoji','${escapeAttr(st)}')">
      <span>${escapeHtml(st)}</span>
    </button>`).join('');
}

function addCustomEmoji() {
  const input = document.getElementById('customEmojiInput');
  const value = input.value.trim();
  if (!value) return showToast('ใส่ Emoji ก่อนค่ะ');
  addBoardItem('emoji', value.slice(0, 6), { x: 40, y: 42, size: 40 });
  input.value = '';
}
function addTextItem() {
  const input = document.getElementById('customTextInput');
  const value = input.value.trim();
  const size = parseInt(document.getElementById('textSizeRange').value, 10) || 24;
  if (!value) return showToast('พิมพ์ข้อความก่อนค่ะ');
  addBoardItem('text', value.slice(0, 44), { x: 60, y: 90, size, color: (document.getElementById('textColorInput')?.value || '#2f4054'), w: Math.min(260, Math.max(90, value.length * size * 0.58)) });
  input.value = '';
}

function matchTextColorToMood() {
  const color = customThemeColor || THEME_COLORS[selectedTheme] || '#ffe1e7';
  const input = document.getElementById('textColorInput');
  if (input) input.value = color;
  showToast('ตั้งสีข้อความตาม Mood Color แล้วค่ะ');
}

function handleImageUpload(event) {
  const files = Array.from(event.target.files || []).slice(0, 3);
  if (!files.length) return;
  showLoading('กำลังเตรียมรูปภาพ', 'ระบบกำลังบีบอัดรูปให้โหลดเร็วขึ้น...');
  Promise.all(files.map((file, index) => compressImage(file, 520, 0.70).then(dataUrl => {
    addBoardItem('image', dataUrl, { x: 24 + (index * 42), y: 34 + (index * 18), w: 126, h: 92 });
  }))).catch(() => showToast('ไม่สามารถอ่านรูปภาพบางไฟล์ได้')).finally(() => hideLoading());
  event.target.value = '';
}
function compressImage(file, maxSize, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function addBoardItem(type, value, opts = {}) {
  const id = `item_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const item = { id, type, value, x: opts.x ?? 40, y: opts.y ?? 40, w: opts.w ?? (type === 'image' ? 120 : undefined), h: opts.h ?? (type === 'image' ? 90 : undefined), size: opts.size ?? 36, rotation: opts.rotation ?? 0, color: opts.color || '#2f4054', fit: opts.fit || 'cover' };
  boardItems.push(item);
  renderBoardItems();
  selectBoardItem(id, false);
}
function renderBoardItems() {
  const canvas = document.getElementById('boardCanvas');
  canvas.innerHTML = boardItems.map(item => {
    const wh = `${item.w ? `width:${item.w}px;` : ''}${item.h ? `height:${item.h}px;` : ''}`;
    const color = item.type === 'text' && item.color ? `color:${item.color};` : '';
    const style = `left:${item.x}px;top:${item.y}px;${wh}transform:rotate(${item.rotation || 0}deg);${item.size ? `font-size:${item.size}px;` : ''}${color}`;
    const crop = item.type === 'image' ? `<button class="crop-handle" type="button" title="Crop / Fit" data-action="crop" data-id="${item.id}">Fit</button>` : '';
    const handles = `<button class="delete-handle" type="button" title="ลบชิ้นนี้" data-action="delete" data-id="${item.id}">×</button><button class="rotate-handle" type="button" title="หมุน" data-action="rotate" data-id="${item.id}">⟳</button><button class="resize-handle" type="button" title="ย่อ/ขยาย" data-action="resize" data-id="${item.id}">↘</button>${crop}`;
    if (item.type === 'image') return `<div class="board-item image ${item.id === selectedItemId ? 'selected' : ''}" data-id="${item.id}" style="${style}"><img src="${item.value}" style="object-fit:${item.fit || 'cover'}" alt="collage image">${handles}</div>`;
    if (item.type === 'text') return `<div class="board-item text ${item.id === selectedItemId ? 'selected' : ''}" data-id="${item.id}" style="${style}">${escapeHtml(item.value)}${handles}</div>`;
    return `<div class="board-item emoji ${item.id === selectedItemId ? 'selected' : ''}" data-id="${item.id}" style="${style}">${escapeHtml(item.value)}${handles}</div>`;
  }).join('');
  canvas.querySelectorAll('.board-item').forEach(el => bindItemPointer(el));
  canvas.querySelectorAll('[data-action="delete"]').forEach(btn => {
    const del = ev => { ev.preventDefault(); ev.stopPropagation(); deleteBoardItem(btn.dataset.id); };
    btn.addEventListener('pointerdown', del, { passive: false });
    btn.addEventListener('click', del);
  });
  canvas.querySelectorAll('[data-action="crop"]').forEach(btn => {
    const crop = ev => { ev.preventDefault(); ev.stopPropagation(); toggleCropItem(btn.dataset.id); };
    btn.addEventListener('pointerdown', crop, { passive: false });
    btn.addEventListener('click', crop);
  });
}
function selectBoardItem(id, rerender = true) {
  selectedItemId = id;
  if (rerender) renderBoardItems();
  else document.querySelectorAll('.board-item').forEach(node => node.classList.toggle('selected', node.dataset.id === id));
}
function deleteBoardItem(id) { boardItems = boardItems.filter(item => item.id !== id); if (selectedItemId === id) selectedItemId = ''; renderBoardItems(); }
function toggleCropItem(id) { const item = boardItems.find(x => x.id === id); if (!item || item.type !== 'image') return; item.fit = item.fit === 'cover' ? 'contain' : 'cover'; renderBoardItems(); showToast(item.fit === 'cover' ? 'Crop mode' : 'Fit whole image'); }
function removeSelectedItem() { if (!selectedItemId) return showToast('เลือกของตกแต่งก่อนค่ะ'); deleteBoardItem(selectedItemId); }
function clearBoardItems() { boardItems = []; selectedItemId = ''; renderBoardItems(); showToast('Reset Mood Board แล้วค่ะ'); }

function bindItemPointer(el) {
  el.addEventListener('pointerdown', ev => {
    const id = el.dataset.id;
    const item = boardItems.find(x => x.id === id);
    if (!item) return;
    if (ev.target.classList.contains('delete-handle') || ev.target.classList.contains('crop-handle')) return;
    ev.preventDefault();
    ev.stopPropagation();
    selectBoardItem(id, false);

    const isResize = ev.target.classList.contains('resize-handle');
    const isRotate = ev.target.classList.contains('rotate-handle');
    const canvas = document.getElementById('boardCanvas');
    const startRect = el.getBoundingClientRect();
    const startX = ev.clientX, startY = ev.clientY;
    const startItem = Object.assign({}, item);
    const offsetX = ev.clientX - startRect.left;
    const offsetY = ev.clientY - startRect.top;
    try { el.setPointerCapture(ev.pointerId); } catch (e) {}

    const move = e => {
      e.preventDefault();
      const liveRect = canvas.getBoundingClientRect();
      if (isRotate) {
        const cx = startRect.left + startRect.width / 2;
        const cy = startRect.top + startRect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
        item.rotation = Math.round(angle);
        applyItemStyle(el, item);
        return;
      }
      if (isResize) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (item.type === 'emoji') item.size = clamp((startItem.size || 36) + dx * 0.35, 18, 110);
        else if (item.type === 'text') {
          item.size = clamp((startItem.size || 24) + dx * 0.12, 14, 62);
          item.w = clamp((startItem.w || startRect.width) + dx, 60, liveRect.width - item.x);
        } else {
          item.w = clamp((startItem.w || startRect.width) + dx, 48, liveRect.width - item.x);
          item.h = clamp((startItem.h || startRect.height) + dy, 42, liveRect.height - item.y);
        }
        applyItemStyle(el, item);
        return;
      }
      const w = item.w || el.offsetWidth || 40;
      const h = item.h || el.offsetHeight || 40;
      item.x = clamp(e.clientX - liveRect.left - offsetX, 0, Math.max(0, liveRect.width - w));
      item.y = clamp(e.clientY - liveRect.top - offsetY, 0, Math.max(0, liveRect.height - h));
      el.style.left = `${item.x}px`;
      el.style.top = `${item.y}px`;
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
      renderBoardItems();
    };
    document.addEventListener('pointermove', move, { passive: false });
    document.addEventListener('pointerup', up, { once: true });
    document.addEventListener('pointercancel', up, { once: true });
  });
}
function applyItemStyle(el, item) {
  el.style.left = `${item.x}px`;
  el.style.top = `${item.y}px`;
  el.style.transform = `rotate(${item.rotation || 0}deg)`;
  if (item.w) el.style.width = `${item.w}px`; else el.style.removeProperty('width');
  if (item.h) el.style.height = `${item.h}px`; else el.style.removeProperty('height');
  if (item.size) el.style.fontSize = `${item.size}px`;
  if (item.type === 'text' && item.color) el.style.color = item.color;
}

async function prepareGacha() {
  syncBoardText();
  const name = document.getElementById('nameInput').value.trim();
  const employeeId = document.getElementById('employeeInput').value.trim();
  if (!name) return showToast('กรุณากรอกชื่อ / Nickname');
  if (config().REQUIRE_EMAIL !== false && !employeeId) return showToast('กรุณากรอก Employee ID เพื่อกันหมุนซ้ำ');
  if (quizAnswers.length < QUIZ.length) return showToast('กรุณาทำ Quiz ให้ครบก่อนค่ะ');
  const submitBtn = document.getElementById('submitBoardBtn');
  submitBtn.disabled = true;
  showLoading('กำลังบันทึก Mood Board', 'ระบบกำลังส่งผลงานขึ้น Gallery และเตรียมสิทธิ์หมุน...');
  try {
    const profile = getProfile();
    const localCardId = `LOCAL-${Date.now().toString(36).toUpperCase()}`;
    const payload = buildPayload(localCardId, profile);
    preparedPayload = payload;

    const quickSnapshotPromise = createBoardSnapshot(560, 420, .70).catch(() => '');
    const thumbPromise = createBoardSnapshot(360, 270, .42).catch(() => '');
    const [boardImage, thumbImage] = await Promise.all([quickSnapshotPromise, thumbPromise]);
    lastBoardImage = boardImage;
    window.__lastBoardThumb = thumbImage;
    const localCard = makeLocalCard(payload, boardImage, true);
    upsertLocalWallCard(localCard);
    renderWall(mergeLocalCards(apiCache.wall.data || []));

    api('submitCard', payload, { timeout: 14000 }).then(res => {
      if (res && res.ok && res.cardId) {
        replaceLocalCardId(payload.cardId, res.cardId);
        preparedPayload.cardId = res.cardId;
        if (boardImage && isLiveMode() && config().SAVE_BOARD_IMAGE_TO_DRIVE !== false) { uploadedImageForCardId = res.cardId; uploadBoardImageNoCors(res.cardId, payload.employeeId, boardImage, window.__lastBoardThumb || boardImage); }
        setTimeout(() => refreshWall(false, true), 1800);
      }
    }).catch(err => showToast('บันทึก Sheet ชั่วคราวยังไม่สำเร็จ แต่สามารถหมุนต่อได้'));

    goStep('stepGacha');
    loadPrizeStatus(false);
  } finally {
    submitBtn.disabled = false;
    hideLoading();
  }
}
function buildPayload(cardId, profile) {
  return {
    cardId,
    name: document.getElementById('nameInput').value.trim(),
    employeeId: document.getElementById('employeeInput').value.trim(),
    emailOrId: document.getElementById('employeeInput').value.trim(),
    team: document.getElementById('teamInput').value.trim(),
    profileKey: profile.key,
    profileName: profile.label,
    profileShort: profile.short,
    profileMeaning: profile.meaning,
    scores: profile.scores,
    quizAnswers: QUIZ.map((q, idx) => ({ question: q.q, answerKey: quizAnswers[idx], answerTitle: (q.options.find(o => o.key === quizAnswers[idx]) || {}).title || '' })),
    affirmation: document.getElementById('affirmInput').value.trim() || 'วันนี้ฉันอนุญาตให้ตัวเองพักได้',
    cardStyle: { themeIndex: selectedTheme, themeName: customThemeColor ? 'Custom Mood Color' : THEME_LABELS[selectedTheme], customColor: customThemeColor },
    boardItems: boardItems.map(item => ({ id: item.id, type: item.type, value: item.type === 'image' ? '[uploaded-image]' : item.value, x: Math.round(item.x), y: Math.round(item.y), w: item.w ? Math.round(item.w) : '', h: item.h ? Math.round(item.h) : '', size: item.size ? Math.round(item.size) : '', rotation: item.rotation || 0, color: item.color || '', fit: item.fit || '' })),
    stickers: boardItems.filter(x => x.type === 'emoji').map(x => x.value).slice(0, 40),
    userAgent: navigator.userAgent
  };
}
function makeLocalCard(payload, boardImage, localPending = false) {
  return {
    cardId: payload.cardId,
    name: payload.name,
    employeeId: payload.employeeId,
    team: payload.team,
    profileName: payload.profileName,
    profileShort: payload.profileShort,
    affirmation: payload.affirmation,
    boardImage,
    timestamp: new Date().toISOString(),
    votes: 0,
    likes: 0,
    localPending
  };
}

function openEvaluationModal() {
  if (!preparedPayload) return showToast('กรุณาส่ง Mood Board ก่อนค่ะ');
  document.getElementById('evaluationModal').classList.remove('hidden');
}
function closeEvaluationModal() { document.getElementById('evaluationModal').classList.add('hidden'); }
function setEvalOverall(score) {
  document.getElementById('evalOverall').value = String(score);
  document.querySelectorAll('#evalOverallStars button').forEach((btn, idx) => { btn.textContent = idx < score ? '★' : '☆'; btn.classList.toggle('active', idx < score); });
}
function getCheckedValues(containerId) { return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)).map(input => input.value); }
function submitEvaluationAndSpin() {
  if (!preparedPayload) return showToast('ไม่พบข้อมูลผลงาน กรุณากลับไปหน้า Mood Board');
  const overallRating = Number(document.getElementById('evalOverall').value || 0);
  const feelings = getCheckedValues('evalFeelings');
  const other = document.getElementById('evalFeelingOther').value.trim();
  if (feelings.includes('Other') && other) feelings[feelings.indexOf('Other')] = `Other: ${other}`;
  const wantAgain = (document.querySelector('input[name="wantAgain"]:checked') || {}).value || '';
  if (!overallRating) return showToast('กรุณาให้คะแนนความพึงพอใจโดยรวม');
  if (!feelings.length) return showToast('กรุณาเลือกความรู้สึกหลังจบกิจกรรมอย่างน้อย 1 ข้อ');
  if (!wantAgain) return showToast('กรุณาเลือกว่าต้องการให้มีกิจกรรมแบบนี้อีกหรือไม่');
  preparedPayload.evaluation = { overallRating, feelings, wantAgain, comment: document.getElementById('evalComment').value.trim() };
  closeEvaluationModal();
  startSpin(preparedPayload);
}
function startSpin(payload) {
  const spinBtn = document.getElementById('spinBtn');
  const wheel = document.getElementById('wheel');
  const resultBox = document.getElementById('spinResult');
  if (!payload) return showToast('ไม่พบข้อมูลสำหรับหมุน Gacha');

  const spinPayload = buildSpinPayload(payload);
  if (spinBtn) {
    spinBtn.disabled = true;
    spinBtn.textContent = 'กำลังสุ่ม...';
  }
  if (resultBox) {
    resultBox.innerHTML = '<strong>กำลังสุ่มรางวัล...</strong><small>รอสักครู่ ระบบกำลังล็อกรางวัลจาก PrizePool</small>';
  }

  const finalRotation = 720 + Math.floor(Math.random() * 360);
  if (wheel) {
    wheel.classList.add('is-spinning');
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    requestAnimationFrame(() => {
      wheel.style.transition = 'transform .55s cubic-bezier(.16,.9,.18,1)';
      wheel.style.transform = `rotate(${finalRotation}deg)`;
    });
  }

  // Fast path: only send small payload to Apps Script. No board image / no layout JSON here.
  const startedAt = Date.now();
  api('spinGacha', spinPayload, { timeout: 12000 }).then(res => {
    if (!res || !res.ok) throw new Error((res && res.message) || 'ไม่สามารถสุ่มรางวัลได้');
    lastSpinResponse = res;
    if (res.cardId) {
      preparedPayload.cardId = res.cardId;
      spinPayload.cardId = res.cardId;
    }
    if (res.prizeStatus) {
      apiCache.prize = { ts: Date.now(), data: res.prizeStatus };
      renderPrizeStatus(res.prizeStatus);
    } else {
      loadPrizeStatus(false, true);
    }
    refreshWall(false, true);
    const wait = Math.max(0, 520 - (Date.now() - startedAt));
    setTimeout(() => renderSpinResult(res), wait);
  }).catch(err => {
    console.warn('Gacha spin error:', err);
    if (resultBox) {
      resultBox.innerHTML = '<strong>เกิดข้อผิดพลาด</strong><small>กรุณากด Refresh แล้วลองใหม่ หรือเช็กว่า Apps Script URL เป็น /exec และ Deploy เป็น New version แล้ว</small>';
    }
    showToast(err.message || 'Gacha error');
  }).finally(() => {
    setTimeout(() => {
      if (wheel) wheel.classList.remove('is-spinning');
      if (spinBtn) {
        spinBtn.disabled = false;
        spinBtn.textContent = 'ประเมิน + หมุนวงล้อ';
      }
    }, 560);
  });
}

function buildSpinPayload(payload) {
  const p = payload || preparedPayload || {};
  const evaluation = p.evaluation || {};
  return {
    cardId: String(p.cardId || '').slice(0, 80),
    name: String(p.name || document.getElementById('nameInput')?.value || '').trim().slice(0, 80),
    employeeId: String(p.employeeId || p.emailOrId || document.getElementById('employeeInput')?.value || '').trim().slice(0, 160),
    emailOrId: String(p.employeeId || p.emailOrId || document.getElementById('employeeInput')?.value || '').trim().slice(0, 160),
    team: String(p.team || document.getElementById('teamInput')?.value || '').trim().slice(0, 100),
    profileKey: String(p.profileKey || getProfile().key || 'calm'),
    profileName: String(p.profileName || getProfile().label || ''),
    profileShort: String(p.profileShort || getProfile().short || ''),
    affirmation: String(p.affirmation || document.getElementById('affirmInput')?.value || '').trim().slice(0, 220),
    scores: p.scores || getProfile().scores || {},
    evaluation: {
      overallRating: evaluation.overallRating || '',
      feelings: Array.isArray(evaluation.feelings) ? evaluation.feelings.slice(0, 8) : [],
      wantAgain: evaluation.wantAgain || '',
      comment: String(evaluation.comment || '').slice(0, 500)
    },
    userAgent: navigator.userAgent.slice(0, 400)
  };
}
function renderSpinResult(res) {
  const cfg = config();
  const prize = res.prize || {};
  const isGift = /gift|gacha/i.test(prize.type || '') || Number(prize.budget || 0) > 0;
  const typeLabel = isGift ? 'Gacha Gift' : 'Wellness Coupon';
  const prizeName = prize.name || typeLabel;
  const lineId = cfg.CONTACT_LINE_ID || 'Friendly_dukdik';
  const claimText = `กรุณาแคปหน้าจอนี้ แล้วส่งมาหาทีมงาน LINE ID: ${lineId} หรือใส่ใน Album ของ LINE Customer Experience เพื่อรับ/บันทึกรางวัล`;

  document.getElementById('spinResult').innerHTML = `
    <p>${res.duplicate ? 'คุณเคยหมุนแล้ว ระบบแสดงผลเดิม' : 'ผล Wellness Gacha ของคุณคือ'}</p>
    <strong>${escapeHtml(prizeName)}</strong>
    <small>${escapeHtml(typeLabel)}</small>
    <button class="ghost small" onclick="goStep('stepWall')">ดู Mood Board Gallery</button>`;

  const modal = document.getElementById('resultModal');
  const content = document.getElementById('resultModalContent');
  if (modal && content) {
    content.innerHTML = `
      <div class="result-sparkles">✨ 🌈 💗</div>
      <div class="result-badge cute-result-badge">${isGift ? '🎁' : '💗'}</div>
      <p class="eyebrow">Gacha Result</p>
      <h2>${res.duplicate ? 'คุณเคยได้รับรางวัลนี้แล้ว' : 'ยินดีด้วย!'}</h2>
      <div class="result-prize-name">${escapeHtml(prizeName)}</div>
      <p class="result-type-pill">${escapeHtml(typeLabel)}</p>
      <div class="claim-box compact-claim">
        <strong>📸 แคปหน้าจอนี้ไว้</strong><br>
        ${escapeHtml(claimText)}
      </div>
      <div class="button-row center">
        <button class="primary" onclick="closeResultModal(); goStep('stepWall')">ดู Mood Board Gallery</button>
        <button class="ghost" onclick="closeResultModal()">ปิด</button>
      </div>`;
    modal.classList.remove('hidden');
  }
}
function closeResultModal() { document.getElementById('resultModal')?.classList.add('hidden'); }
function loadPrizeStatus(showLoadingFlag = false, force = false) {
  if (!force && apiCache.prize.data && Date.now() - apiCache.prize.ts < 12000) return renderPrizeStatus(apiCache.prize.data);
  if (showLoadingFlag) showLoading('กำลังโหลดรางวัล', 'อัปเดตสถานะรางวัลล่าสุด...');
  api('getPrizeStatus', {}, { timeout: 15000 }).then(res => {
    if (!res || !res.ok) throw new Error((res && res.message) || 'Prize status unavailable');
    apiCache.prize = { ts: Date.now(), data: res };
    renderPrizeStatus(res);
  }).catch(err => {
    console.warn('Prize status error:', err);
    renderPrizeStatus({ ok: true, totalRemaining: 60, giftRemaining: 30, couponRemaining: 30, recent: [], offline: true });
  }).finally(() => { if (showLoadingFlag) hideLoading(); });
}
function renderPrizeStatus(res) {
  const gift = Number(res?.giftRemaining ?? 0);
  const coupon = Number(res?.couponRemaining ?? 0);
  const totalLeft = Number(res?.totalRemaining ?? (gift + coupon));
  const recent = res?.recent || [];
  document.getElementById('poolStats').innerHTML = `
    <div class="pool-stat available-total"><span>Available</span><strong>${totalLeft}</strong></div>
    <div class="pool-stat"><span>Gifts left</span><strong>${gift}</strong></div>
    <div class="pool-stat"><span>Coupons left</span><strong>${coupon}</strong></div>
  `;
  updateWheel(totalLeft);
  document.getElementById('recentGachaList').innerHTML = recent.length
    ? recent.map(r => `<div class="recent-row"><span class="recent-pill">${escapeHtml(formatPrizeType(r.prizeType || r.type))}</span><small>${escapeHtml(r.timestamp || '')}</small></div>`).join('')
    : '<p class="hint">ยังไม่มี recent gacha</p>';
}
function updateWheel(totalLeft) {
  const wheel = document.getElementById('wheel');
  const txt = document.getElementById('wheelLeftText');
  const total = clamp(Number(totalLeft || 0), 0, 60);
  if (txt) txt.textContent = `${total} left`;
  if (!wheel) return;
  if (total <= 0) {
    wheel.style.background = 'conic-gradient(#f1f5f9 0deg 360deg)';
    return;
  }
  const colors = ['#dfefff','#fff0ba','#ffe1e7','#e3f3dc','#e8ddff','#fff8ec'];
  const seg = 360 / total;
  const parts = [];
  for (let i = 0; i < total; i++) parts.push(`${colors[i % colors.length]} ${i * seg}deg ${(i + 1) * seg - .45}deg`, `#ffffff ${(i + 1) * seg - .45}deg ${(i + 1) * seg}deg`);
  wheel.style.background = `conic-gradient(${parts.join(',')})`;
}
function formatPrizeType(type) { return /gift|gacha/i.test(type || '') ? 'Gacha Gift' : 'Wellness Coupon'; }

function refreshWall(showLoadingFlag = true, force = false) {
  const box = document.getElementById('wallBox');
  if (!force && apiCache.wall.data.length && Date.now() - apiCache.wall.ts < 9000) return renderWall(mergeLocalCards(apiCache.wall.data));
  if (showLoadingFlag) box.innerHTML = '<p class="hint">กำลังโหลด Gallery...</p>';
  api('getWall', {}, { timeout: 12000 }).then(res => {
    const cards = (res && res.cards) || [];
    apiCache.wall = { ts: Date.now(), data: cards };
    renderWall(mergeLocalCards(cards));
  }).catch(() => renderWall(mergeLocalCards(localDemo.cards || [])));
}
function mergeLocalCards(cards) {
  const map = new Map();
  (cards || []).forEach(c => map.set(c.cardId, c));
  submittedLocalCards.forEach(c => map.set(c.cardId, Object.assign({}, map.get(c.cardId) || {}, c)));
  return Array.from(map.values()).sort((a,b) => String(b.timestamp || '').localeCompare(String(a.timestamp || '')));
}
function upsertLocalWallCard(card) {
  const idx = submittedLocalCards.findIndex(c => c.cardId === card.cardId || (c.localPending && card.localPending));
  if (idx >= 0) submittedLocalCards[idx] = Object.assign({}, submittedLocalCards[idx], card);
  else submittedLocalCards.unshift(card);
}
function replaceLocalCardId(oldId, newId) { submittedLocalCards.forEach(c => { if (c.cardId === oldId) { c.cardId = newId; c.localPending = false; } }); }
function renderWall(cards) {
  const box = document.getElementById('wallBox');
  if (!cards.length) { box.innerHTML = '<p class=\"hint\">ยังไม่มีผลงานใน Gallery</p>'; return; }
  box.innerHTML = cards.map(c => {
    const img = c.boardThumbDataUrl || c.boardImageUrl || c.boardImage || '';
    const count = Number(c.likes ?? c.votes ?? 0);
    const liked = likedLocal[c.cardId] ? 'liked' : '';
    const stickers = (c.stickers || []).slice(0, 8).join(' ') || '🌸 ☁️ 🌈';
    const sentAt = c.timestamp ? formatDateTime(c.timestamp) : '-';
    const mood = c.profileShort || profileShortFromLabel(c.profileName) || 'Mood';
    const moodText = c.affirmation || '-';
    return `<article class=\"wall-card\" data-card-id=\"${escapeAttr(c.cardId)}\">
      ${img ? `<img class=\"wall-image\" src=\"${escapeAttr(img)}\" loading=\"lazy\" alt=\"Mood board\">` : `<div class=\"mini-stickers\">${escapeHtml(stickers)}</div>`}
      ${c.localPending ? '<span class=\"pending-badge\">เพิ่งส่ง</span>' : ''}
      <h3>${escapeHtml(c.name || 'Anonymous')}</h3>
      <div class=\"wall-detail-list\">
        <div><b>ชื่อ:</b> <span>${escapeHtml(c.name || '-')}</span></div>
        <div><b>ID:</b> <span>${escapeHtml(c.employeeId || '-')}</span></div>
        <div><b>Team:</b> <span>${escapeHtml(c.team || '-')}</span></div>
        <div><b>ส่งเมื่อ:</b> <span>${escapeHtml(sentAt)}</span></div>
        <div><b>Mood:</b> <span>${escapeHtml(mood)}</span></div>
        <div class=\"mood-text-row\"><b>Mood text:</b> <span>${escapeHtml(moodText)}</span></div>
      </div>
      <button class=\"like-btn ${liked}\" onclick=\"likeCard('${escapeAttr(c.cardId)}')\">❤️ ชอบ (<span>${count}</span>)</button>
    </article>`;
  }).join('');
  box.querySelectorAll('.wall-image').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'mini-stickers';
      fallback.textContent = '🌸 ☁️ 🌈';
      img.replaceWith(fallback);
    }, { once: true });
  });
}
function likeCard(cardId) {
  const cardEl = document.querySelector(`[data-card-id="${cssEscape(cardId)}"]`);
  const btn = cardEl?.querySelector('.like-btn');
  if (btn && !likedLocal[cardId]) {
    const span = btn.querySelector('span');
    span.textContent = String(Number(span.textContent || 0) + 1);
    btn.classList.add('liked');
  }
  likedLocal[cardId] = true; saveLikedState();
  const voterKey = document.getElementById('employeeInput').value.trim() || localStorage.getItem('colorStressVisitorKey') || getVisitorKey();
  api('likeCard', { cardId, voterKey }, { timeout: 8000 }).then(res => {
    if (res && res.cards) { apiCache.wall = { ts: Date.now(), data: res.cards }; renderWall(mergeLocalCards(res.cards)); }
  }).catch(() => {});
}
function getVisitorKey() { const k = `VISITOR-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`; localStorage.setItem('colorStressVisitorKey', k); return k; }
function formatDateTime(v) { try { return new Date(v).toString() !== 'Invalid Date' ? new Date(v).toLocaleString('th-TH') : String(v || ''); } catch (e) { return String(v || ''); } }
function profileShortFromLabel(label) { return String(label || '').split('—')[0].trim(); }

function checkConnection() {
  const badge = document.getElementById('apiStatus');
  if (!isLiveMode()) {
    badge.innerHTML = '<span class="api-dot off"></span><span>กรุณาใส่ Apps Script URL /exec ใน config.js</span>';
    return;
  }
  badge.innerHTML = '<span class="api-dot demo"></span><span>กำลังเชื่อมต่อ Google Sheets...</span>';
  api('ping', {}, { timeout: 12000 }).then(res => {
    if (res && res.ok) {
      badge.innerHTML = '<span class="api-dot live"></span><span>Live: Google Sheets connected</span>';
    } else {
      badge.innerHTML = '<span class="api-dot off"></span><span>Connection error: Deploy Apps Script เป็น Web app /exec อีกครั้ง</span>';
      console.warn('Ping failed:', res);
    }
  }).catch(err => {
    badge.innerHTML = '<span class="api-dot off"></span><span>Connection error: ตรวจ Apps Script URL / Access Anyone</span>';
    console.warn('Apps Script ping error:', err);
  });
}
function api(action, payload, opts = {}) { return isLiveMode() ? jsonp(action, payload, opts) : demoApi(action, payload); }
function jsonp(action, payload, opts = {}) {
  const key = `${action}:${JSON.stringify(payload || {}).slice(0, 160)}`;
  if (inFlight[key]) return inFlight[key];
  const cfg = config();
  const p = new Promise((resolve, reject) => {
    const callback = `cb_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const script = document.createElement('script');
    const cleanup = () => { try { delete window[callback]; } catch (e) { window[callback] = undefined; } script.remove(); delete inFlight[key]; };
    window[callback] = data => { cleanup(); resolve(data); };
    const url = new URL(cfg.GAS_WEBAPP_URL);
    url.searchParams.set('action', action);
    url.searchParams.set('callback', callback);
    url.searchParams.set('payload', JSON.stringify(payload || {}));
    script.src = url.toString();
    script.onerror = () => { cleanup(); reject(new Error('ไม่สามารถเชื่อมต่อ Apps Script ได้')); };
    document.body.appendChild(script);
    setTimeout(() => { if (window[callback]) { cleanup(); reject(new Error('Apps Script response timeout')); } }, opts.timeout || 16000);
  });
  inFlight[key] = p;
  return p;
}
function uploadBoardImageNoCors(cardId, participantKey, boardImage, thumbImage) {
  const cfg = config();
  if (!cfg.GAS_WEBAPP_URL || !boardImage) return;
  try { fetch(cfg.GAS_WEBAPP_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'saveBoardImage', cardId, participantKey, boardImage, thumbImage: thumbImage || '' }) }); } catch (e) {}
}

async function createBoardSnapshot(width = 720, height = 540, quality = .78) {
  const card = document.getElementById('cooldownCard');
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, width, height); bg.addColorStop(0, customThemeColor || THEME_COLORS[selectedTheme] || '#ffe1e7'); bg.addColorStop(1, '#fff8ec');
  ctx.fillStyle = bg; roundRect(ctx, 0, 0, width, height, 44); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.arc(width * .88, height * .83, width * .12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#607087'; ctx.font = 'bold 16px Arial, sans-serif'; ctx.fillText('MY MOOD BOARD', 42, 52);
  ctx.fillStyle = '#263447'; ctx.font = 'bold 42px Arial, sans-serif'; ctx.fillText((document.getElementById('nameInput').value.trim() || 'Your Name').slice(0, 24), 42, 112);
  ctx.fillStyle = '#607087'; ctx.font = '20px Arial, sans-serif'; wrapText(ctx, getProfile().label, 42, 154, width - 84, 28);
  const boardRect = document.getElementById('boardCanvas').getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const scaleX = width / cardRect.width, scaleY = height / cardRect.height;
  const offsetX = (boardRect.left - cardRect.left) * scaleX, offsetY = (boardRect.top - cardRect.top) * scaleY;
  for (const item of boardItems) {
    const x = offsetX + item.x * scaleX, y = offsetY + item.y * scaleY;
    ctx.save(); ctx.translate(x, y); ctx.rotate((item.rotation || 0) * Math.PI / 180);
    if (item.type === 'image') {
      const img = await loadImage(item.value); const w = (item.w || 120) * scaleX, h = (item.h || 90) * scaleY;
      ctx.save(); roundRect(ctx, 0, 0, w, h, 16); ctx.clip(); drawImageFit(ctx, img, 0, 0, w, h, item.fit || 'cover'); ctx.restore();
    } else if (item.type === 'text') {
      const size = (item.size || 24) * scaleX; ctx.font = `bold ${size}px Arial, sans-serif`; const metrics = ctx.measureText(item.value);
      ctx.fillStyle = 'rgba(255,255,255,.65)'; roundRect(ctx, -8, -size, metrics.width + 16, size + 14, 14); ctx.fill(); ctx.fillStyle = item.color || '#2f4054'; ctx.fillText(item.value, 0, 0);
    } else { ctx.font = `${(item.size || 36) * scaleX}px Arial, sans-serif`; ctx.fillText(item.value, 0, 0); }
    ctx.restore();
  }
  ctx.fillStyle = '#506071'; ctx.font = '20px Arial, sans-serif'; wrapText(ctx, document.getElementById('affirmInput').value.trim() || 'วันนี้ฉันอนุญาตให้ตัวเองพักได้', 42, height - 58, width - 84, 26);
  return canvas.toDataURL('image/jpeg', quality);
}
function downloadBoardImage() { createBoardSnapshot(1000,750,.82).then(dataUrl => { const a = document.createElement('a'); a.href = dataUrl; a.download = `Color_Your_Stress_Mood_Board_${Date.now()}.jpg`; a.click(); }).catch(() => showToast('บันทึกรูปไม่สำเร็จ')); }
function loadImage(src) { return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; }); }
function drawImageFit(ctx, img, x, y, w, h, fit = 'cover') {
  if (fit === 'contain') {
    const r = Math.min(w / img.width, h / img.height);
    const nw = img.width * r, nh = img.height * r;
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x,y,w,h);
    ctx.drawImage(img, x + (w - nw)/2, y + (h - nh)/2, nw, nh);
    return;
  }
  const r = Math.max(w / img.width, h / img.height);
  const nw = img.width * r, nh = img.height * r;
  ctx.drawImage(img, (img.width - w / r) / 2, (img.height - h / r) / 2, w / r, h / r, x, y, w, h);
}
function roundRect(ctx, x, y, w, h, r) { const radius = Math.min(r, w/2, h/2); ctx.beginPath(); ctx.moveTo(x+radius,y); ctx.arcTo(x+w,y,x+w,y+h,radius); ctx.arcTo(x+w,y+h,x,y+h,radius); ctx.arcTo(x,y+h,x,y,radius); ctx.arcTo(x,y,x+w,y,radius); ctx.closePath(); }
function wrapText(ctx, text, x, y, maxWidth, lineHeight) { const words = String(text || '').split(' '); let line = ''; for (let n=0;n<words.length;n++){ const test = line + words[n] + ' '; if (ctx.measureText(test).width > maxWidth && n > 0) { ctx.fillText(line,x,y); line = words[n] + ' '; y += lineHeight; } else line = test; } ctx.fillText(line,x,y); }

function demoApi(action, payload) {
  return new Promise(resolve => setTimeout(async () => {
    if (action === 'ping') return resolve({ ok:true, demo:true });
    if (action === 'getPrizeStatus') return resolve({ ok:true, giftRemaining: demoAvailablePrizes().filter(x=>x.type==='Gacha Gift').length, couponRemaining: demoAvailablePrizes().filter(x=>x.type==='Wellness Coupon').length, recent: localDemo.history.slice(0,8) });
    if (action === 'getWall') return resolve({ ok:true, cards: localDemo.cards });
    if (action === 'submitCard') return resolve({ ok:true, cardId: payload.cardId || `DEMO-CARD-${Date.now().toString(36)}` });
    if (action === 'likeCard' || action === 'voteCard') { const c = localDemo.cards.find(x => x.cardId === payload.cardId); if (c) c.likes = (c.likes || 0) + 1; saveDemoState(); return resolve({ ok:true, cards: localDemo.cards }); }
    if (action === 'submitAndSpin') {
      const key = normalizeKey(payload.employeeId || payload.emailOrId || payload.name); const existing = localDemo.participants.find(p => p.key === key);
      if (existing) return resolve({ ok:true, duplicate:true, profileName: existing.profileName, cardId: existing.cardId, prize: existing.prize, prizeStatus:{giftRemaining:0,couponRemaining:0,recent:localDemo.history.slice(0,8)} });
      const available = demoAvailablePrizes(); const prize = available[Math.floor(Math.random()*available.length)] || { prizeId:'WAITLIST', name:'รางวัลสำรอง', type:'Waitlist', budget:0 };
      localDemo.claimed.push(prize.prizeId); const boardImage = await createBoardSnapshot().catch(()=> ''); const cardId = payload.cardId || `DEMO-${Date.now().toString(36)}`;
      localDemo.participants.push({ key, name: payload.name, profileName: payload.profileName, cardId, prize });
      localDemo.cards.unshift({ cardId, name: payload.name, team: payload.team, profileName: payload.profileName, profileShort: payload.profileShort, affirmation: payload.affirmation, boardImage, likes: 0 });
      localDemo.history.unshift({ timestamp: new Date().toLocaleString('th-TH'), prizeType: prize.type }); saveDemoState();
      return resolve({ ok:true, profileName: payload.profileName, cardId, prize, prizeStatus:{giftRemaining: demoAvailablePrizes().filter(x=>x.type==='Gacha Gift').length, couponRemaining: demoAvailablePrizes().filter(x=>x.type==='Wellness Coupon').length, recent: localDemo.history.slice(0,8)} });
    }
    resolve({ ok:false, message:'Unknown demo action' });
  }, 240));
}
function buildDemoPrizePool() { const rows=[]; let n=1; const add=(type,name,budget,qty)=>{ for(let i=0;i<qty;i++) rows.push({prizeId:`P${String(n++).padStart(3,'0')}`,type,name,budget}); }; add('Gacha Gift','LINE Gift Card 50 บาท',50,10); add('Gacha Gift','LINE Gift Card 100 บาท',100,10); add('Gacha Gift','Starbucks / Café Gift 100 บาท',100,5); add('Gacha Gift','Grab Gift 200 บาท',200,5); add('Wellness Coupon','คูปองเลิกงานเร็ว 1 ชม.',0,6); add('Wellness Coupon','คูปองขยายเวลาพักเที่ยง 15 นาที',0,6); add('Wellness Coupon','คูปองพักงีบ / พักสายตา 15 นาที',0,6); add('Wellness Coupon','คูปองกาแฟจาก Buddy / Team Treat',0,6); add('Wellness Coupon','Wellness Message: วันนี้พักได้โดยไม่รู้สึกผิด',0,6); return rows; }
function demoAvailablePrizes() { return buildDemoPrizePool().filter(p => !localDemo.claimed.includes(p.prizeId)); }
function loadDemoState() { try { return JSON.parse(localStorage.getItem('colorStressDemoV12')) || { claimed:[], participants:[], cards:[], history:[] }; } catch(e){ return { claimed:[], participants:[], cards:[], history:[] }; } }
function saveDemoState() { localStorage.setItem('colorStressDemoV12', JSON.stringify(localDemo)); }
function loadLikedState() { try { return JSON.parse(localStorage.getItem('colorStressLikedV12')) || {}; } catch(e){ return {}; } }
function saveLikedState() { localStorage.setItem('colorStressLikedV12', JSON.stringify(likedLocal)); }
function showLoading(title, text) { document.getElementById('loadingTitle').textContent = title || 'กำลังโหลด'; document.getElementById('loadingText').textContent = text || 'กรุณารอสักครู่...'; document.getElementById('loadingOverlay').classList.remove('hidden'); }
function hideLoading() { document.getElementById('loadingOverlay').classList.add('hidden'); }
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function normalizeKey(v) { return String(v || '').trim().toLowerCase().replace(/\s+/g, '_'); }
function cssEscape(v) { return String(v).replace(/(["'\\.#:[\],>+~*^$()=!|])/g, '\\$1'); }
function escapeHtml(v) { return String(v ?? '').replace(/[&<>"]/g, s => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[s])); }
function escapeAttr(v) { return escapeHtml(v).replace(/'/g, '&#39;'); }
let toastTimer = null;
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3200); }


// V12 Rechecked Fix: toolbox tab switcher was referenced by index.html but missing in app.js.
function switchToolTab(tab) {
  const safeTab = ['info', 'decor', 'text'].includes(tab) ? tab : 'info';
  document.querySelectorAll('.mini-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === safeTab);
  });
  document.querySelectorAll('.tool-tab').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tool-${safeTab}`);
  });
}
