RemBG Test Tool

What is inside:
- index.html  — Simple frontend UI (static) to upload and test images
- styles.css  — Minimal CSS
- script.js   — Main client logic (ES module import)
- config.js   — Replace RAILWAY_API_URL value with your Railway public URL
- test_image_path.txt — the uploaded sandbox file path (for platform tests)

How to use:
1. Open index.html in a browser (double-click or serve via local static server).
2. Edit config.js and set RAILWAY_API_URL to your Railway deployment URL (example: https://rembg-railway-production.up.railway.app).
3. Choose a file and click 'Remove Background'.
4. Or click 'Send Uploaded Sandbox File' if your environment supports sandbox path fetch (only in the same platform).

Sandbox image path (available in this environment):
sandbox:/mnt/data/333cb253-4096-4df3-9f6b-a415b344b1f1.png

Notes:
- If you run into CORS errors, ensure your Railway API allows cross-origin requests (it should, by default if set in server).
- The endpoint used by this frontend is <RAILWAY_API_URL>/remove (POST form-data with 'image' field).
