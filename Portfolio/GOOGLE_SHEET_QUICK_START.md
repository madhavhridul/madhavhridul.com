# Google Drive + Website Integration Guide

## Quick Setup (5 minutes)

### Step 1: Create Google Sheet as CMS

1. Go to **https://sheets.google.com**
2. Create a new spreadsheet
3. Name it: `Portfolio Projects`
4. Copy the **Sheet ID** from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

### Step 2: Add Columns (First Row)

Copy this header row (all columns required):

```
ID,Name,Category,Date,Description,Credits,Cover URL,Drive Folder,Document URL
```

### Step 3: Share Sheet Publicly

1. Click **Share** (top right)
2. Select **"Anyone with the link"**
3. Make sure **Viewer** access is selected
4. Click **Share**

### Step 4: Organize Drive Folder

Create this structure in your Drive:

```
Portfolio/
├── 2024-Photography/
│   ├── 2024-04-12_Project_Name/
│   │   ├── cover.jpg
│   │   ├── image_02.jpg
│   │   └── project_notes.pdf
│
├── 2024-Films/
│   └── 2024-05-01_Film_Title/
│       ├── thumbnail.jpg
│       └── credits.pdf
│
├── 2024-Designs/
    └── 2024-03-20_Design_System/
        ├── cover.jpg
        └── design_specs.pdf
```

**Naming Rule:** `YYYY-MM-DD_Project_Name`

### Step 5: Add Your First Project

#### Get Drive Image Link:

1. Upload `cover.jpg` to Drive
2. Right-click → **Share**
3. Change to "Viewer - Anyone with link"
4. Copy link: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
5. Convert to direct URL: `https://drive.google.com/uc?id=FILE_ID`

#### Add to Google Sheet:

| Column | Value |
|--------|-------|
| ID | `photo-001` |
| Name | `Lens Archive` |
| Category | `Photography` |
| Date | `2024-04-12` |
| Description | `A series of editorial portraits with cinematic light.` |
| Credits | `Hridul Madhav` |
| Cover URL | `https://drive.google.com/uc?id=ABC123DEF456` |
| Drive Folder | `https://drive.google.com/drive/folders/FOLDER_ID` |
| Document URL | `https://drive.google.com/uc?id=DOC789GHI012` |

### Step 6: Update Website Code

1. Open `portfolio-site/js/app.js`
2. Find line: `const SHEET_ID = 'YOUR_SHEET_ID_HERE';`
3. Replace with: `const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID';`
4. Save

**Done!** Your website now fetches projects from Google Sheets automatically.

---

## How to Add New Projects

### Weekly Workflow:

1. **Create folder in Drive:**
   - Name: `YYYY-MM-DD_Project_Title`
   - Add: cover.jpg + other files

2. **Get shareable Drive link:**
   - Right-click folder → Share
   - Get the folder URL (ends with `?usp=sharing`)

3. **Get image URL:**
   - Right-click cover.jpg → Share
   - Extract ID from link
   - Convert: `https://drive.google.com/uc?id=FILE_ID`

4. **Add to Google Sheet:**
   - Open sheet
   - New row with all columns filled
   - Save

5. **Website updates automatically** (might take a few seconds to refresh)

---

## Data Structure (CSV Format)

Use this exact header row in your Google Sheet:

```csv
ID,Name,Category,Date,Description,Credits,Cover URL,Drive Folder,Document URL
photo-001,Lens Archive,Photography,2024-04-12,Editorial portraits with cinematic light,Hridul Madhav,https://drive.google.com/uc?id=ABC123,https://drive.google.com/drive/folders/XYZ789,https://drive.google.com/uc?id=DOC456
film-001,Frame Narrative,Films,2024-05-01,Short film exploring identity,Director: Hridul Madhav,https://drive.google.com/uc?id=ABC789,https://drive.google.com/drive/folders/XYZ123,https://drive.google.com/uc?id=DOC789
design-001,Modular System UI,Designs,2024-03-20,Design system for content platform,Product Design: Hridul Madhav,https://drive.google.com/uc?id=DEF456,https://drive.google.com/drive/folders/ABC456,https://drive.google.com/uc?id=DOC123
```

---

## Categories (Use Exact Names)

- `Photography`
- `Films`
- `Designs`

---

## Date Format

Always use: `YYYY-MM-DD` (e.g., `2024-04-12`)

---

## Drive Link Conversion

### To get direct image/file link:

1. Share the file publicly (Viewer access)
2. Copy link: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
3. Convert to: `https://drive.google.com/uc?id=FILE_ID`

### To get folder link:

1. Right-click folder → Share
2. Copy: `https://drive.google.com/drive/folders/FOLDER_ID?usp=sharing`
3. Use exactly as is

---

## Troubleshooting

**"Projects not loading on website?"**
- Check that SHEET_ID is correct in `js/app.js`
- Make sure Google Sheet is publicly shared
- Check browser console for errors (F12)

**"Images not showing?"**
- Use `https://drive.google.com/uc?id=FILE_ID` format
- Make sure file is shared publicly
- Wait 30 seconds for Drive CDN to cache

**"Dates showing incorrectly?"**
- Use format: `YYYY-MM-DD`
- Not: `04/12/2024` or `12-04-2024`

---

## File Access Paths

### Via Website:
- Homepage: Latest 3 projects
- `/photography`, `/films`, `/designs`: Filtered by category
- Click project → Opens detail page
- "Project Folder on Drive" button → Full Drive folder

### Via Drive:
- Navigate chronologically: `YYYY-MM-DD` folders
- Open any file directly
- Share with collaborators

---

## Example: Complete Setup

### Drive Structure:
```
Portfolio/
├── 2024-Photography/
│   └── 2024-04-12_Lens_Archive/
│       ├── cover.jpg
│       ├── image_02.jpg
│       ├── image_03.jpg
│       └── notes.pdf
```

### Google Sheet Row:
| ID | Name | Category | Date | Description | Credits | Cover URL | Drive Folder | Document URL |
|----|------|----------|------|-------------|---------|-----------|--------------|--------------|
| photo-001 | Lens Archive | Photography | 2024-04-12 | Editorial portraits | Hridul Madhav | https://drive.google.com/uc?id=ABC123 | https://drive.google.com/drive/folders/XYZ789 | https://drive.google.com/uc?id=DOC456 |

### Website Result:
- Homepage shows: Lens Archive thumbnail + description
- Click "Photography" → Shows Lens Archive in grid
- Click project → Detail page with Drive folder link
- Click "📁 Project Folder" → Opens all files in Drive

---

## Support

For questions:
1. Check `DRIVE_SETUP.md` (full documentation)
2. Verify Google Sheet is publicly shared
3. Check SHEET_ID in code matches your sheet
4. Test with simple data first (1-2 projects)

