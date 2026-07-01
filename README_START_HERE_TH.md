# Color Your Stress — V15 Gacha Fast + Mobile Polish

ชุดนี้แก้จาก V12/V14 โดยคงฟังก์ชันหลักครบ และปรับส่วน Gacha ให้ตอบเร็วขึ้น

## สิ่งที่แก้
- Gacha เรียก Apps Script ด้วย payload ขนาดเล็กเท่านั้น
- ลดเวลา animation / แสดงผลรางวัล popup เร็วขึ้น
- Popup รางวัลน่ารักขึ้น พร้อมข้อความให้แคปหน้าจอและส่ง LINE ID: Friendly_dukdik หรือ Album LINE Customer Experience
- ไม่มี MailApp / GmailApp / sendEmail
- แก้ Code.gs จุด duplicate const ที่ทำให้ Apps Script syntax error ได้
- ปุ่ม Quiz ย้อนกลับ/ถัดไปใหญ่ขึ้น และอยู่ขวา/เห็นชัดบนมือถือ
- แก้เลข tab header ให้อยู่กลางวงกลม
- คง Mood Board / Drive save / Gallery / Like / PrizePool / Recent Gacha ครบ

## Deploy
1. อัปไฟล์ root ไป GitHub: index.html, styles.css, app.js, config.js, .nojekyll, .github/workflows/deploy-pages.yml
2. วาง gas-backend/Code.gs และ appsscript.json ใน Apps Script
3. Run: setupSheets
4. Run: authorizeServices
5. Deploy > Manage deployments > Edit > New version > Deploy
6. Copy Web app URL ที่ลงท้าย /exec ไปใส่ config.js
7. Ctrl+F5 หรือเปิด Incognito
