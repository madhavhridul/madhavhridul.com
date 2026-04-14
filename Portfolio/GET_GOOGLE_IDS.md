# How to Get Google Drive & Sheet IDs

## 1. Get Your Google Sheet ID

### Step 1: Open Google Sheet

Go to: **https://sheets.google.com**

Create new spreadsheet or open existing one.

### Step 2: Copy Sheet ID from URL

**In your browser's address bar:**

```
https://docs.google.com/spreadsheets/d/1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX9YZ/edit
                                       └─────────────────────────────┘
                                         SHEET_ID (copy this part)
```

**Your SHEET_ID is:** `1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX9YZ`

### Step 3: Update Website Code

**File:** `portfolio-site/js/app.js`

**Find this line:**
```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
```

**Replace with:**
```javascript
const SHEET_ID = '1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX9YZ';
```

✅ Done!

---

## 2. Get Image File ID (Cover Photos)

### Step 1: Upload Image to Drive

Go to: **https://drive.google.com**

1. Click **New** → **File upload**
2. Select your `cover.jpg` or similar
3. Wait for upload to complete

### Step 2: Share the File

1. Right-click uploaded file
2. Click **Share**
3. In popup, change to **"Viewer - Anyone with the link"**
4. Click **Share** button

### Step 3: Copy the Share Link

The popup will show a link:
```
https://drive.google.com/file/d/1XYZ2ABC3DEF4GHI5JKL6MNO7/view?usp=sharing
                              └────────────────────────────┘
                                FILE_ID (copy this part)
```

**Your FILE_ID is:** `1XYZ2ABC3DEF4GHI5JKL6MNO7`

### Step 4: Convert to Direct URL

**Original link format:**
```
https://drive.google.com/file/d/1XYZ2ABC3DEF4GHI5JKL6MNO7/view?usp=sharing
```

**Convert to direct image URL:**
```
https://drive.google.com/uc?id=1XYZ2ABC3DEF4GHI5JKL6MNO7
```

This is the URL to use in your Google Sheet under **"Cover URL"** column.

✅ Done!

---

## 3. Get Folder ID (Project Folder)

### Step 1: Create Project Folder

In Drive:

1. Create folder: **2024-04-12_Lens_Archive**
2. Upload images inside it
3. Upload documents inside it

### Step 2: Share the Folder

1. Right-click folder
2. Click **Share**
3. Change to **"Viewer - Anyone with the link"**
4. Click **Share**

### Step 3: Copy the Folder Link

The popup will show:
```
https://drive.google.com/drive/folders/2ABC3DEF4GHI5JKL6MNO7PQR8?usp=sharing
                                       └──────────────────────────┘
                                         FOLDER_ID (copy this part)
```

**Your FOLDER_ID is:** `2ABC3DEF4GHI5JKL6MNO7PQR8`

### Step 4: Use in Google Sheet

**In "Drive Folder" column, paste:**
```
https://drive.google.com/drive/folders/2ABC3DEF4GHI5JKL6MNO7PQR8
```

✅ Done!

---

## 4. Get Document File ID (PDFs / Docs)

### Step 1: Upload Document

1. Upload your `project_notes.pdf` to Drive
2. Organize it in the project folder

### Step 2: Share Document

1. Right-click file
2. Click **Share**
3. Change to **"Viewer - Anyone with the link"**
4. Click **Share**

### Step 3: Copy the Document Link

```
https://drive.google.com/file/d/3XYZ2ABC3DEF4GHI5JKL6MNO7/view?usp=sharing
                              └────────────────────────────┘
                                FILE_ID (copy this part)
```

**Your FILE_ID is:** `3XYZ2ABC3DEF4GHI5JKL6MNO7`

### Step 4: Convert to Direct URL

Convert to direct link:
```
https://drive.google.com/uc?id=3XYZ2ABC3DEF4GHI5JKL6MNO7
```

Use this in Google Sheet under **"Document URL"** column.

✅ Done!

---

## 5. Complete Example

### Your Drive Structure:
```
Portfolio/
└── 2024-Photography/
    └── 2024-04-12_Lens_Archive/
        ├── cover.jpg             (FILE_ID: 1XYZ...)
        ├── image_02.jpg
        ├── image_03.jpg
        └── notes.pdf             (FILE_ID: 3XYZ...)
```

### Your Google Sheet Row:

| ID | Name | Category | Date | Description | Credits | Cover URL | Drive Folder | Document URL |
|----|------|----------|------|-------------|---------|-----------|--------------|--------------|
| photo-001 | Lens Archive | Photography | 2024-04-12 | Editorial portraits | Hridul Madhav | https://drive.google.com/uc?id=1XYZ... | https://drive.google.com/drive/folders/2ABC... | https://drive.google.com/uc?id=3XYZ... |

### Website Result:
✅ Homepage shows project thumbnail
✅ Photography page shows "Lens Archive"
✅ Click project → Shows detail
✅ Click "📁 Project Folder" → Opens Drive folder
✅ Click "📄 Document Link" → Downloads PDF

---

## Key Points

### 1. Different IDs for Different Things

| What | Example URL |
|------|-------------|
| **Sheet ID** | `1ABC2DEF3GHI4JKL5MNO6PQR7...` |
| **Image File ID** | `1XYZ2ABC3DEF4GHI5JKL6MNO7...` |
| **Folder ID** | `2ABC3DEF4GHI5JKL6MNO7PQR8...` |
| **Document ID** | `3XYZ2ABC3DEF4GHI5JKL6MNO7...` |

### 2. URL Formats

**For Images (direct access):**
```
https://drive.google.com/uc?id=FILE_ID
```

**For Folders (opens in Drive):**
```
https://drive.google.com/drive/folders/FOLDER_ID
```

**For Documents (preview/download):**
```
https://drive.google.com/uc?id=FILE_ID
```

### 3. Always Share "Publicly"

Before using any Drive link:
1. Right-click file/folder
2. Click **Share**
3. Change to **"Anyone with the link"**
4. Make sure **"Viewer"** access is selected
5. Click **Share**

Otherwise, people won't be able to access the files.

---

## Troubleshooting

**"Can't find the link in the share popup?"**
- Make sure you clicked "Share" button
- It should open a popup window with a URL
- Copy the URL from "Link copied to clipboard" message

**"Getting a 'file not found' error?"**
- The file isn't shared publicly
- Right-click → Share → "Anyone with link" → "Viewer"
- Wait 10 seconds, try again

**"Images showing as broken?"**
- Make sure using `https://drive.google.com/uc?id=FILE_ID` format
- Not: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- The `/uc?id=` format gets the actual image file
- The `/file/d/.../view` format shows the preview page

**"Document not downloading?"**
- Use `https://drive.google.com/uc?id=FILE_ID`
- The system will handle preview/download automatically

---

## Quick Reference

| What | Where | How to Get |
|------|-------|-----------|
| SHEET_ID | URL bar | `https://docs.google.com/spreadsheets/d/SHEET_ID/...` |
| Image URL | Share popup | Extract FILE_ID, use `/uc?id=` format |
| Folder URL | Share popup | Extract FOLDER_ID, use `/drive/folders/` format |
| Document URL | Share popup | Extract FILE_ID, use `/uc?id=` format |

---

**That's it!** 🎉

You now know how to:
- ✅ Get your Sheet ID
- ✅ Get image URLs
- ✅ Get folder URLs  
- ✅ Get document URLs
- ✅ Add them to your Google Sheet
- ✅ Have your website populate automatically

