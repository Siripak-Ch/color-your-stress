# Color Your Stress V20 — Gacha PrizePool Fixed

ชุดนี้แก้จาก V19 โดยเน้นแก้ระบบ Gacha ให้ตัดรางวัลจาก PrizePool จริง และซ่อมข้อมูลเก่าที่เคยมี GachaHistory/Participants แล้วแต่ PrizePool ยังไม่ถูก mark claimed.

## ต้องทำหลังวางโค้ด
1. วางไฟล์ GitHub: `index.html`, `styles.css`, `app.js`, `config.js`, `.nojekyll`, `.github/workflows/deploy-pages.yml`
2. วาง Apps Script: `gas-backend/Code.gs`, `gas-backend/appsscript.json`
3. Run `setupSheets`
4. Run `authorizeServices`
5. Run `repairPrizePoolClaimsNow` 1 ครั้ง เพื่อซ่อม PrizePool จากข้อมูล GachaHistory/Participants เดิม
6. Deploy > Manage deployments > Edit > New version > Deploy
7. เปิดเว็บแบบ Incognito หรือ Ctrl+F5

## สิ่งที่แก้ใน V20
- `getPrizeStatus()` จะ repair PrizePool จาก Participants/GachaHistory ก่อนคำนวณจำนวนคงเหลือ
- duplicate spin จะไม่ทำให้ count เพี้ยน และจะ mark PrizePool ของรางวัลเดิมเป็น Claimed ถ้ายังไม่ถูก mark
- หลังหมุนสำเร็จ frontend force refresh prize status อีกครั้งหลัง backend flush
- ถ้าโหลด prize status error จะไม่โชว์ fallback 60/30/30 ปลอมอีก
- ไม่มีระบบส่งเมล
