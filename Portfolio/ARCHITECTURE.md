# Portfolio Website Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR PORTFOLIO SITE                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐       ┌────────────────────────┐ │
│  │  Website Code    │       │  Project Data Source   │ │
│  │  (HTML/CSS/JS)   │◄──────┤  (Google Sheets CSV)   │ │
│  └──────────────────┘       └────────────────────────┘ │
│                                      ▲                   │
│                                      │                   │
│                           ┌──────────┴────────┐         │
│                           │   Google Drive    │         │
│                           │ (Media + Folders) │         │
│                           └───────────────────┘         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## File Structure

### Main Website (Portfolio folder)

```
Portfolio /
├── Madhavhridul.html          (Homepage - portal interface)
├── Photography.html           (Photography category page)
├── Films.html                 (Films category page)
├── Designs.html               (Designs category page)
├── DRIVE_SETUP.md             (Full setup documentation)
├── GOOGLE_SHEET_QUICK_START.md (Quick start guide)
└── portfolio-site/            (Complete website framework)
    ├── index.html
    ├── pages/
    │   ├── photography.html
    │   ├── films.html
    │   ├── designs.html
    │   └── project.html       (Dynamic detail page)
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js             (Fetches from Google Sheets)
    └── data/
        └── projects.json      (Fallback/reference data)
```

---

## Data Flow

### 1. You Add Project to Drive
```
Drive: 2024-04-12_Lens_Archive/
└── cover.jpg
└── image_02.jpg
└── project_notes.pdf
```

### 2. Add Row to Google Sheet
```
ID: photo-001
Name: Lens Archive
Category: Photography
Date: 2024-04-12
Description: Editorial portraits...
Credits: Hridul Madhav
Cover URL: https://drive.google.com/uc?id=ABC123
Drive Folder: https://drive.google.com/drive/folders/XYZ789
Document URL: https://drive.google.com/uc?id=DOC456
```

### 3. Website Fetches Data
```
JavaScript fetches CSV from Google Sheets
    ↓
Parses project data
    ↓
Displays on website
    ↓
Links to Google Drive folders
```

### 4. Two Access Points

**Via Website:**
- Homepage shows featured projects
- Category pages show filtered projects
- Detail page shows full info + Drive folder link

**Via Drive:**
- Browse folders chronologically
- Access all project files directly
- Share with clients/collaborators

---

## Quick Start (5 Steps)

### Step 1: Create Google Sheet
- Go: **sheets.google.com**
- New spreadsheet
- Name: **Portfolio Projects**
- Get **SHEET_ID** from URL

### Step 2: Add Header Row
```
ID,Name,Category,Date,Description,Credits,Cover URL,Drive Folder,Document URL
```

### Step 3: Share Publicly
- Click **Share** → **Anyone with link** → **Viewer** access

### Step 4: Add First Project
- Create Drive folder: `2024-04-12_Project_Name/`
- Upload cover image
- Get shareable links
- Add row to Google Sheet

### Step 5: Update Website Code
- Open: `portfolio-site/js/app.js`
- Find: `const SHEET_ID = 'YOUR_SHEET_ID_HERE';`
- Replace with your actual SHEET_ID
- Save

**Done!** Website updates automatically.

---

## Key Components

### Homepage (Madhavhridul.html)
- Dark, centered portal interface
- Three navigation cards (Photography, Films, Designs)
- Profile panel with contact info
- Links to category pages

### Category Pages
- Filters projects by category
- Displays project grid
- Links to detail pages
- Fetches from Google Sheets

### Detail Page (project.html)
- Full project information
- Cover image
- Description + Credits
- Direct link to Drive folder
- Document download link

### JavaScript (app.js)
- Fetches CSV from Google Sheets
- Parses project data
- Creates project cards dynamically
- Falls back to local JSON if needed

---

## Google Sheet Structure

**Required Columns (exact names):**

| Column | Format | Example |
|--------|--------|---------|
| ID | text | `photo-001` |
| Name | text | `Lens Archive` |
| Category | text | `Photography` or `Films` or `Designs` |
| Date | YYYY-MM-DD | `2024-04-12` |
| Description | text | `A series of editorial portraits...` |
| Credits | text | `Hridul Madhav` |
| Cover URL | Drive link | `https://drive.google.com/uc?id=ABC123` |
| Drive Folder | Drive URL | `https://drive.google.com/drive/folders/XYZ789` |
| Document URL | Drive link | `https://drive.google.com/uc?id=DOC456` |

---

## Drive Folder Organization

**Folder Structure:**

```
Portfolio/
├── 2024-Photography/
│   ├── 2024-04-12_Lens_Archive/
│   ├── 2024-03-25_Neon_Routes/
│   └── ...older projects...
│
├── 2024-Films/
│   ├── 2024-05-01_Frame_Narrative/
│   └── ...
│
├── 2024-Designs/
    ├── 2024-03-20_Modular_System/
    └── ...
```

**File Organization (inside each project folder):**

```
2024-04-12_Lens_Archive/
├── cover.jpg              (For website thumbnail)
├── image_full_01.jpg      (Hero image)
├── image_full_02.jpg
├── image_full_03.jpg
├── project_notes.pdf      (Document for download)
└── credits.txt            (Optional metadata)
```

---

## How Each Page Works

### 1. Homepage (index.html)
```
Loads →
  Fetches projects from Google Sheets →
    Shows latest 3 projects (one per category) →
      User clicks "Photography", "Films", or "Designs" →
        Redirects to category page
```

### 2. Category Page (photography.html, films.html, designs.html)
```
Loads →
  Fetches projects from Google Sheets →
    Filters by category →
      Display as grid →
        User clicks project →
          Redirects to detail page with project ID
```

### 3. Detail Page (project.html)
```
Loads →
  Gets project ID from URL parameter →
    Fetches projects from Google Sheets →
      Finds matching project →
        Display full info + images →
          Show Drive folder link + document link →
            User can access all files in Drive
```

---

## Integration Details

### Google Sheets CSV Export URL

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
```

The website uses this to automatically fetch your project data.

### How Links Work

**Images (direct URL):**
```
Original: https://drive.google.com/file/d/ABC123DEF456/view?usp=sharing
Converted: https://drive.google.com/uc?id=ABC123DEF456
```

**Folders (exact URL):**
```
Exact: https://drive.google.com/drive/folders/XYZ789?usp=sharing
```

**Documents (direct URL):**
```
Original: https://drive.google.com/file/d/DOC789/view?usp=sharing
Converted: https://drive.google.com/uc?id=DOC789
```

---

## Adding Projects (Weekly Workflow)

### 1. Create folder in Drive
- Name: `YYYY-MM-DD_Project_Title`
- Add: cover image + other files

### 2. Get shareable links
- Right-click folder/file → Share
- Copy link from browser
- Extract ID or use direct URL

### 3. Add to Google Sheet
- New row with all columns
- Paste links exactly
- Double-check: description, date, category

### 4. Website auto-updates
- Fetches new data within 10 seconds
- Updates all pages (homepage, categories, details)

---

## Troubleshooting

**Projects not showing on website?**
1. Check SHEET_ID in `js/app.js` matches your sheet
2. Verify Google Sheet is publicly shared
3. Check browser console (F12) for errors
4. Wait 30 seconds and refresh

**Images not displaying?**
1. Use correct URL format: `https://drive.google.com/uc?id=FILE_ID`
2. Make sure file is publicly shared
3. Drive CDN takes ~30 seconds to cache

**Categories not filtering correctly?**
1. Use exact category names: `Photography`, `Films`, `Designs`
2. Case-sensitive matching

**Dates showing wrong format?**
1. Use: `YYYY-MM-DD` (e.g., `2024-04-12`)
2. Don't use: `04/12/2024` or `12-Apr-2024`

---

## Deployability

This setup is ready for:

- **GitHub Pages**: Static HTML/CSS/JS, no backend needed
- **Netlify**: Drag & drop deployment
- **Vercel**: Automatic deployments from GitHub

The Google Sheets CSV export is publicly accessible, so no authentication required.

---

## Security Notes

- Google Sheet is publicly readable (CSV export only)
- Drive files are shared publicly (your choice)
- No sensitive data in the system
- You control all access via Drive sharing settings

---

## Support Files

1. **DRIVE_SETUP.md** - Full documentation
2. **GOOGLE_SHEET_QUICK_START.md** - Quick setup guide
3. **This file** - Architecture overview

Start with **GOOGLE_SHEET_QUICK_START.md** for fastest setup.

