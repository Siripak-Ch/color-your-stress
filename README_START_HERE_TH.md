# Color Your Stress V21 — RESET ALL DATA FIXED

เวอร์ชันนี้เพิ่มเมนูใน Google Sheet ครบแล้ว:

- `RESET ALL data + PrizePool` = ล้างข้อมูลกิจกรรมทั้งหมดและ reset รางวัลกลับ 60 slots
- `RESET Prize Pool only` = reset เฉพาะรางวัล ไม่ล้างข้อมูลผู้เล่น/Gallery

## วิธีใช้หลังอัป Code.gs ใหม่

1. เปิด Apps Script แล้ววาง `gas-backend/Code.gs` ใหม่
2. Save
3. Run `setupSheets` 1 ครั้ง
4. Reload Google Sheet tab
5. จะเห็นเมนู `🎨 Color Stress`
6. เลือก `RESET ALL data + PrizePool`
7. กลับไปหน้าเว็บแล้วกด Refresh / Ctrl+F5

## ข้อมูลที่จะถูกล้างเมื่อกด RESET ALL

- Participants
- QuizAnswers
- Cards
- GachaHistory
- Evaluations
- Likes
- Votes
- Logs / Log
- PrizePool จะถูกสร้างใหม่เป็น 60 slots ทั้งหมด

ระบบยังคงฟังก์ชันเดิมทั้งหมดจาก V20 และไม่มีระบบส่งอีเมล
