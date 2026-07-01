# Color Your Stress — V18 Gacha Once + Loading

ชุดนี้แก้จาก V17 โดยเน้นส่วน Gacha ตาม feedback ล่าสุด

## สิ่งที่แก้ใน V18
- หมุน Gacha ได้แค่ 1 ครั้งต่อ Employee ID
- หลังหมุนสำเร็จ ปุ่มจะถูก disable เป็น “หมุนแล้ว”
- Backend ยังล็อกซ้ำด้วย ParticipantKey/Employee ID เหมือนเดิม
- ระหว่างรอผลรางวัลมี loading popup ชัดเจน
- เมื่อสุ่มเสร็จจึงแสดง popup รางวัลทันที
- Popup รางวัลปรับเป็นแบบ minimal อ่านง่ายขึ้น
- Popup แสดงชื่อ / Employee ID / Team เพื่อระบุตัวตน
- เพิ่มข้อความให้แคปหน้าจอและส่ง LINE ID: Friendly_dukdik หรือ Album LINE Customer Experience
- ไม่มีระบบส่งเมล / MailApp / GmailApp / sendEmail
- เพิ่ม cache busting v18 ใน index.html

## วิธี Deploy
1. อัป `index.html`, `styles.css`, `app.js`, `config.js`, `.nojekyll`, `.github` ขึ้น GitHub repo
2. วาง `gas-backend/Code.gs` และ `gas-backend/appsscript.json` ใน Apps Script
3. Run `setupSheets`
4. Run `authorizeServices`
5. Deploy > Manage deployments > Edit > New version > Deploy
6. นำ Web App URL ที่ลงท้าย `/exec` ไปใส่ใน `config.js`
7. เปิดเว็บแบบ Incognito หรือ Ctrl+F5 เพื่อไม่ให้ cache เก่าค้าง

## หมายเหตุ
ถ้ายังเห็น popup แบบเก่า ให้ตรวจว่า index.html โหลด `app.js?v=18` และ `config.js?v=18` แล้ว
