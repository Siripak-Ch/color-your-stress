# Color Your Stress V17 — Gacha Action Fixed

แก้ปัญหา `Unknown action: spinGacha` โดยตรง

สิ่งที่แก้:
- Frontend เปลี่ยนกลับมาเรียก action `submitAndSpin` เพื่อ compatible กับ backend รุ่นเก่า
- Backend รองรับ alias ครบ: `spinGacha`, `submitAndSpin`, `spin`, `gacha`, `claimPrize`
- เพิ่ม cache busting เป็น `?v=17`
- Popup รับรางวัลยังคงข้อความให้แคปหน้าจอ + LINE ID: Friendly_dukdik / Album LINE Customer Experience
- ไม่มีระบบส่งอีเมล

วิธี deploy:
1. Upload ไฟล์ root ทั้งหมดขึ้น GitHub
2. วาง `gas-backend/Code.gs` ใน Apps Script
3. Run `setupSheets`
4. Run `authorizeServices`
5. Deploy > Manage deployments > Edit > New version > Deploy
6. ใส่ Web App URL `/exec` ใน `config.js`
7. เปิดเว็บแบบ Incognito หรือ Ctrl+F5

ถ้ายังขึ้น error เดิม แปลว่า Apps Script ยังเป็น deployment เวอร์ชันเก่า ให้กด New version อีกครั้ง
