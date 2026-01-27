# Smart Resume Matcher Extension

A privacy-focused browser extension that helps job seekers evaluate their resumes against job descriptions across multiple portals (LinkedIn, Naukri, Indeed, etc.) and provides match percentage + keyword suggestions.

## ✨ Features

- **📄 Resume Upload** - Upload PDF or DOCX resumes, stored locally for privacy
- **🔍 Job Description Detection** - Auto-extracts job descriptions from major portals
- **📊 Match Percentage** - Shows % match between your resume and job requirements
- **🎯 Keyword Analysis** - Highlights matched and missing skills/keywords
- **💡 Smart Suggestions** - AI-powered recommendations to improve your resume
- **🔒 100% Private** - All processing happens locally, no cloud uploads

## 🌐 Supported Job Portals

- LinkedIn
- Naukri
- Indeed
- Glassdoor
- Monster
- Shine
- Foundit

## 🚀 Installation

### Method 1: Load Unpacked (Developer Mode)

1. Open Chrome/Edge and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `my_extension` folder
5. The extension icon will appear in your toolbar!

### Method 2: Chrome Web Store (Coming Soon)

## 📖 Usage

1. **Upload Your Resume**
   - Click the extension icon
   - Drag & drop or click to upload your PDF/DOCX resume

2. **Navigate to a Job Posting**
   - Go to any job listing on LinkedIn, Naukri, Indeed, etc.

3. **Analyze Match**
   - Click "Analyze Match" button
   - View your match percentage, matched/missing skills, and suggestions

4. **Improve Your Resume**
   - Use the missing keywords and suggestions to tailor your resume

## 🛠️ Tech Stack

- **Manifest V3** - Modern Chrome extension architecture
- **PDF.js** - PDF parsing
- **Mammoth.js** - DOCX parsing  
- **Local NLP** - Keyword extraction and matching
- **Chrome Storage API** - Secure local storage

## 🔐 Privacy

- ✅ Resume stored only in browser's local storage
- ✅ No data sent to external servers
- ✅ All processing happens in-browser
- ✅ No tracking or analytics

## 📁 Project Structure

```
my_extension/
├── manifest.json        # Extension config
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── popup.css           # Styling
├── content.js          # Job description extraction
├── content.css         # Overlay styles
├── background.js       # Service worker
├── resumeParser.js     # PDF/DOCX parsing
├── matchingEngine.js   # NLP matching
├── icons/              # Extension icons
└── libs/               # External libraries
    ├── pdf.min.js
    ├── pdf.worker.min.js
    └── mammoth.browser.min.js
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use for any purpose.

---

Made with ❤️ for job seekers everywhere
