# Portfolio CMS Setup — Google Drive + Google Sheets

## Overview

This system uses **Google Sheets** as a CMS (Content Management System) and **Google Drive** for storing project files. The website automatically fetches and displays projects.

---

## 1. Google Drive Folder Structure

Inside your shared Drive folder, create this structure:

```
Portfolio (Main Folder)
├── 2024-Photography
│   ├── 2024-01-01_Project_Name
│   │   ├── cover.jpg
│   │   ├── image_02.jpg
│   │   ├── image_03.jpg
│   │   └── project_doc.pdf
│   ├── 2024-03-15_Another_Project
│   │   ├── cover.jpg
│   │   └── ...
│
├── 2024-Films
│   ├── 2024-02-10_Film_Title
│   │   ├── thumbnail.jpg
│   │   ├── film_edit_notes.pdf
│   │   └── credits.txt
│
├── 2024-Designs
│   ├── 2024-04-05_Design_System
│   │   ├── cover.jpg
│   │   ├── design_specs.pdf
│   │   └── prototype_link.txt
```

**Naming Convention:**
- Folders: `YYYY-MM-DD_Project_Name`
- Chronological order (newest first when sorted)
- Separate by category (Photography, Films, Designs)

---

## 2. Create a Google Sheet as CMS

Create a public Google Sheet at: **https://sheets.google.com**

### Sheet Name: `Projects`

| Column | Example | Notes |
|--------|---------|-------|
| **ID** | photo-001 | Unique identifier |
| **Name** | Lens Archive | Project title |
| **Category** | Photography | photography / films / designs |
| **Date** | 2024-04-12 | YYYY-MM-DD format |
| **Description** | A series of editorial portraits... | Short description |
| **Credits** | Hridul Madhav | Creator/team |
| **Cover URL** | https://drive.google.com/uc?id=FILE_ID | Drive image link |
| **Drive Folder** | https://drive.google.com/drive/folders/FOLDER_ID | Link to project folder in Drive |
| **Document URL** | https://drive.google.com/uc?id=FILE_ID | Link to PDF/docs |

### How to Get Drive File IDs

1. Right-click file in Drive → Share
2. Copy the shareable link
3. Extract the ID from: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
4. Use direct image URL: `https://drive.google.com/uc?id=FILE_ID&export=download`

---

## 3. Make Sheet Public & Get Share Link

1. Click **Share** button (top right)
2. Change to **Anyone with the link** can view
3. Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
4. Note the **SHEET_ID**

---

## 4. Website Integration

The website fetches your Google Sheet automatically using CSV export:

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
```

Update this URL in the website code (see below).

---

## 5. Update Website Code

### Step A: Update `js/app.js`

Replace the hardcoded `projects.json` with your Google Sheet:

```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

async function fetchProjectsFromSheet() {
  try {
    const response = await fetch(SHEET_URL);
    const csv = await response.text();
    return parseCSV(csv);
  } catch (error) {
    console.error('Failed to load projects', error);
    return [];
  }
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const projects = [];
  
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = parseCSVLine(lines[i]);
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j]?.trim() || '';
    }
    
    projects.push(obj);
  }
  
  return projects;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inside = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') inside = !inside;
    else if (char === ',' && !inside) {
      result.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  result.push(current);
  return result;
}
```

---

## 6. Data Flow

```
You add projects to Google Sheet
        ↓
Website fetches CSV from Google Sheets
        ↓
Parses project data
        ↓
Displays on website dynamically
        ↓
Links to Drive folders for documents
```

---

## 7. Adding a New Project

1. Open your Google Sheet
2. Add a new row with:
   - ID
   - Name
   - Category (photography / films / designs)
   - Date (YYYY-MM-DD)
   - Description
   - Credits
   - Cover image URL (from Drive)
   - Drive folder URL
   - Document URL
3. Create corresponding folder in Drive with this structure:
   - `YYYY-MM-DD_Project_Name/`
     - `cover.jpg`
     - Other media
     - `project_doc.pdf`
4. Save sheet → Site updates automatically

---

## 8. Access Points

### Via Website
- Homepage: Featured projects (latest 3)
- /photography, /films, /designs: Filtered by category
- Project detail page: Full info + links to Drive

### Via Google Drive
- Navigate folder → Open files directly
- Share links with clients
- Organize chronologically

---

## 9. File Naming & Organization

```
PROJECT_FOLDER: 2024-04-12_Lens_Archive
├── cover.jpg (for website thumbnail)
├── image_full_01.jpg (hero image)
├── image_full_02.jpg
├── project_notes.pdf (info sheet)
└── credits.txt
```

---

## 10. Google Sheet CSV Column Order

Ensure columns are in this exact order (headers in first row):

```
ID,Name,Category,Date,Description,Credits,Cover URL,Drive Folder,Document URL
```

Example row:
```
photo-001,Lens Archive,Photography,2024-04-12,"Editorial portraits with cinematic light.",Hridul Madhav,https://drive.google.com/uc?id=ABC123,https://drive.google.com/drive/folders/XYZ789,https://drive.google.com/uc?id=DOC456
```

---

## Quick Start Checklist

- [ ] Create Google Sheet with correct columns
- [ ] Make sheet publicly shareable
- [ ] Get SHEET_ID from URL
- [ ] Create Drive folder structure
- [ ] Upload first few project covers
- [ ] Fill in Google Sheet rows
- [ ] Update website code with SHEET_ID
- [ ] Test on website
- [ ] Done!

