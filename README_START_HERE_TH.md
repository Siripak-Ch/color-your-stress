# Color Your Stress – Full Function V12

เวอร์ชันนี้แก้ error หน้า Quiz ว่างจาก V11 แล้ว โดยเพิ่ม `syncBoardText()` และแยกการโหลดแต่ละส่วนด้วย `safeRun()` เพื่อไม่ให้ error ส่วน Mood Board ทำให้ Quiz ไม่แสดงผล

## วิธีใช้
1. อัปโหลด `index.html`, `styles.css`, `app.js`, `config.js`, `.nojekyll` ไปที่ GitHub Pages
2. วาง `gas-backend/Code.gs` และ `gas-backend/appsscript.json` ใน Apps Script
3. Run `setupSheets`
4. Deploy เป็น Web App แบบ New version
5. ใส่ URL `/exec` ใน `config.js`

ถ้าเว็บยังไม่อัปเดต ให้กด Ctrl+F5 หรือเปิด incognito เพื่อ clear cache

# Color Your Stress FULL FUNCTION V11

เวอร์ชันนี้แก้จาก V10 ตาม feedback ล่าสุด: Gacha popup แสดงผลทันที, เอาระบบส่งอีเมลออกเพื่อไม่ให้ Apps Script ค้าง, แก้ PrizePool/Recent Gacha, และเพิ่มรายละเอียดใน Mood Board Gallery

## Deploy

### GitHub Pages
อัปโหลดไฟล์ต่อไปนี้ไว้ที่ root ของ repo:

```text
index.html
styles.css
app.js
config.js
.nojekyll
```

### Apps Script
วางไฟล์ใน `gas-backend/Code.gs` ลงใน Apps Script และวาง `appsscript.json` ใน Project Settings/manifest

หลังวางโค้ดแล้ว Run ตามลำดับ:

```text
setupSheets
authorizeServices
```

จากนั้น Deploy > Manage deployments > Edit > New version > Deploy
แล้ว copy Web App URL ที่ลงท้าย `/exec` ไปใส่ใน `config.js`

## สิ่งที่แก้ใน V11

- แก้ syntax/PrizePool issue ที่ทำให้ Connection error หรือ Gacha ขึ้นค่าไม่ถูกต้อง
- Popup received prize แสดงผลทันทีหลังหมุนสำเร็จ
- เอาการส่งเมลออกทั้งหมด เพื่อไม่ให้ต้อง authorize Email service และลดโอกาส timeout
- Recent Gacha แสดง type ของรางวัลล่าสุดแบบอ่านง่าย
- Mood Board Gallery แสดงรายละเอียด: ชื่อ, Employee ID, Team, เวลาส่ง, Mood, Mood text
- Gallery ใช้รูปจาก Data URL/Drive thumbnail พร้อม fallback
- ระบบยังใช้ LockService กันการสุ่มรางวัลซ้ำตอนมีคนกดพร้อมกัน

## หมายเหตุ

ถ้ายังขึ้น Connection error ให้ตรวจ 3 จุด:
1. `config.js` ต้องเป็น Web App URL `/exec` ไม่ใช่ URL หน้าแก้ไข Apps Script
2. Apps Script ต้อง Deploy เป็น New version หลังแก้ Code.gs
3. Access ต้องตั้งเป็น Anyone หรือ Anyone within organization

---

## V12 RECHECKED FULL notes

ชุดนี้ยึดจาก V12 เดิมเป็นหลัก ไม่ใช้ backend แบบย่อจาก Final Optimized

แก้เพิ่ม:
- เพิ่ม `switchToolTab(tab)` ที่หายไป ทำให้ปุ่ม Info / Decor / Text ทำงานครบ
- ตรวจ `onclick / oninput / onchange` ทุกจุดแล้ว ไม่มี missing function
- ตรวจ syntax `app.js` และ `Code.gs` แล้วผ่าน
- ไม่มีการใช้ `email service calls` แล้ว
- เพิ่ม GitHub Actions workflow สำหรับ Deploy GitHub Pages

หลังแก้ Apps Script ต้องกด:
1. `setupSheets`
2. `authorizeServices`
3. `Deploy > Manage deployments > Edit > New version > Deploy`
