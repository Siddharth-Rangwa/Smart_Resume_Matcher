# Smart Resume Matcher Extension - PRD

## 1. Product Name
**Smart Resume Matcher Extension**

## 2. Objective
Browser extension that helps users evaluate their resumes against job descriptions across multiple job portals (LinkedIn, Naukri, etc.) and provides match percentage + keyword suggestions for improvement.

## 3. Target Users
- Job seekers  
- Freshers & experienced professionals  
- Users applying on multiple job portals  

## 4. Key Features

1. **Resume Upload**  
   - User can upload resume in **PDF or DOCX** format  
   - Stored locally in browser (for privacy)  

2. **Job Description Analysis**  
   - Extension detects job description text on portal pages  
   - Compares with uploaded resume  

3. **Match Percentage**  
   - Shows % match between resume & job description  

4. **Keyword Suggestions**  
   - Highlights missing skills / keywords  
   - Suggests keywords to add to resume  

5. **Multi-Portal Support**  
   - Works on LinkedIn, Naukri, Indeed, and other job portals  

6. **UI/UX**  
   - Extension popup shows **resume upload** + **match result**  
   - Inline suggestions as overlay on job portal pages (optional)  

7. **Privacy & Security**  
   - All processing happens **locally in browser**  
   - No resume or job description data sent to cloud  

## 5. Non-Functional Requirements

- **Performance:** Extension should analyze resume & job description in < 3 seconds for typical jobs (1-2 pages PDF/DOCX).  
- **Compatibility:** Latest versions of Chrome & Edge.  
- **Accessibility:** Popup and overlay should be mobile-friendly if possible.  
- **Security:** Data stored locally; no external leaks.  

## 6. Tech Stack

### Frontend / Browser Extension
- HTML / CSS / JS → Popup UI & overlay  
- Manifest V3 → Extension config  
- Libraries:  
  - `PDF.js` → PDF parsing  
  - `docx` or `mammoth.js` → DOCX parsing  
  - `Fuse.js` → Lightweight local keyword matching / fuzzy search  

### AI / NLP (Local)
- JavaScript NLP libraries:  
  - `compromise` → Entity extraction / skills  
  - `natural` → Text similarity / keyword extraction  
- Optional: `TensorFlow.js` → Local ML model for semantic similarity  

### Browser APIs
- `chrome.scripting` → Inject scripts on job pages  
- `chrome.storage.local` → Store uploaded resumes  

## 7. High-Level Architecture

1. **User**
    - Interacts with Browser Extension Popup

2. **Browser Extension Popup**
    - Allows Resume Upload (PDF/DOCX)
    - Sends resume to Local NLP Parser

3. **Local NLP Parser**
    - Parses resume text
    - Prepares data for matching

4. **Job Portal Page**
    - Content Script extracts Job Description from page

5. **Local Matching Engine**
    - Compares resume vs job description
    - Calculates match percentage
    - Generates missing keywords / suggestions

6. **UI Overlay / Popup**
    - Displays match %, missing keywords, suggestions
    - User can use this info to update resume


## 8. User Flow

1. User installs extension → sees extension icon.  
2. Opens popup → uploads resume (PDF/DOCX).  
3. Visits a job posting → extension detects job description.  
4. Clicks “Analyze Resume” → match % + missing keywords displayed.  
5. User updates resume based on suggestions → better job application.  

## 9. Required Documents / Files for AI IDE

1. `manifest.json` → Extension config  
2. `popup.html` + `popup.js` → Resume upload UI  
3. `content.js` → Job description extraction  
4. `resumeParser.js` → PDF/DOCX to text conversion  
5. `matchingEngine.js` → NLP for match % and keyword suggestions  
6. `style.css` → UI styling  
7. `README.md` → Project overview, install instructions, usage  

## 10. Privacy Recommendation

- Store resumes only in **`chrome.storage.local`**  
- Avoid sending data to any server  
- Process job description & resume entirely **in browser**  
- Optional: Use WebAssembly / TensorFlow.js models for semantic similarity if needed  

