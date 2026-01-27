/**
 * Smart Resume Matcher - Popup Script
 * Handles UI interactions, resume upload, and analysis
 */

// ============================================
// DOM Elements
// ============================================
const uploadArea = document.getElementById('uploadArea');
const resumeInput = document.getElementById('resumeInput');
const uploadSection = document.getElementById('uploadSection');
const resumeLoadedSection = document.getElementById('resumeLoadedSection');
const resumeName = document.getElementById('resumeName');
const resumeMeta = document.getElementById('resumeMeta');
const removeResumeBtn = document.getElementById('removeResume');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Score elements
const matchScore = document.getElementById('matchScore');
const scoreRing = document.getElementById('scoreRing');
const matchLabel = document.getElementById('matchLabel');

// Keywords elements
const missingKeywords = document.getElementById('missingKeywords');
const matchedKeywords = document.getElementById('matchedKeywords');
const missingCount = document.getElementById('missingCount');
const matchedCount = document.getElementById('matchedCount');
const suggestionsList = document.getElementById('suggestionsList');

// ============================================
// State
// ============================================
let currentResume = null;
let resumeText = '';

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadStoredResume();
    setupEventListeners();
});

// ============================================
// Event Listeners Setup
// ============================================
function setupEventListeners() {
    // Upload area click
    uploadArea.addEventListener('click', () => resumeInput.click());

    // File input change
    resumeInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    // Remove resume
    removeResumeBtn.addEventListener('click', handleRemoveResume);

    // Analyze button
    analyzeBtn.addEventListener('click', handleAnalyze);
}

// ============================================
// File Handling
// ============================================
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

async function processFile(file) {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && !['pdf', 'docx'].includes(fileExtension)) {
        showError('Please upload a PDF or DOCX file');
        return;
    }

    showLoading(true);
    hideError();

    try {
        // Parse the resume
        resumeText = await ResumeParser.parse(file);

        if (!resumeText || resumeText.trim().length === 0) {
            throw new Error('Could not extract text from resume');
        }

        // Store the resume
        currentResume = {
            name: file.name,
            type: file.type,
            size: file.size,
            text: resumeText,
            uploadedAt: Date.now()
        };

        await saveResume(currentResume);

        // Update UI
        showResumeLoaded(file.name);
        analyzeBtn.disabled = false;

    } catch (error) {
        console.error('Error processing file:', error);
        showError('Failed to parse resume: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// ============================================
// Resume Storage
// ============================================
async function saveResume(resume) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ resume }, resolve);
    });
}

async function loadStoredResume() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['resume'], (result) => {
            if (result.resume) {
                currentResume = result.resume;
                resumeText = result.resume.text;
                showResumeLoaded(result.resume.name, result.resume.uploadedAt);
                analyzeBtn.disabled = false;
            }
            resolve();
        });
    });
}

async function clearResume() {
    return new Promise((resolve) => {
        chrome.storage.local.remove(['resume'], resolve);
    });
}

// ============================================
// UI Updates
// ============================================
function showResumeLoaded(name, uploadedAt = Date.now()) {
    uploadSection.classList.add('hidden');
    resumeLoadedSection.classList.remove('hidden');
    resumeName.textContent = name;
    resumeMeta.textContent = formatUploadTime(uploadedAt);
}

function showUploadArea() {
    uploadSection.classList.remove('hidden');
    resumeLoadedSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    analyzeBtn.disabled = true;
}

function formatUploadTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return 'Uploaded just now';
    if (diff < 3600000) return `Uploaded ${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `Uploaded ${Math.floor(diff / 3600000)} hours ago`;
    return `Uploaded ${Math.floor(diff / 86400000)} days ago`;
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// ============================================
// Resume Removal
// ============================================
async function handleRemoveResume() {
    await clearResume();
    currentResume = null;
    resumeText = '';
    showUploadArea();
    resumeInput.value = '';
}

// ============================================
// Analysis
// ============================================
async function handleAnalyze() {
    if (!currentResume || !resumeText) {
        showError('Please upload a resume first');
        return;
    }

    showLoading(true);
    hideError();
    resultsSection.classList.add('hidden');

    try {
        // Get job description from the current tab
        const jobDescription = await getJobDescription();

        if (!jobDescription || jobDescription.trim().length === 0) {
            throw new Error('Could not find job description on this page. Please navigate to a job posting.');
        }

        // Analyze the match
        const results = await MatchingEngine.analyze(resumeText, jobDescription);

        // Display results
        displayResults(results);

    } catch (error) {
        console.error('Analysis error:', error);
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

async function getJobDescription() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs[0]) {
                reject(new Error('No active tab found'));
                return;
            }

            try {
                const results = await chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: extractJobDescription
                });

                if (results && results[0] && results[0].result) {
                    resolve(results[0].result);
                } else {
                    reject(new Error('Could not extract job description'));
                }
            } catch (error) {
                reject(new Error('Cannot access this page. Please navigate to a job portal.'));
            }
        });
    });
}

// This function runs in the context of the web page
function extractJobDescription() {
    // LinkedIn selectors
    const linkedInSelectors = [
        '.jobs-description__content',
        '.jobs-box__html-content',
        '.job-details-jobs-unified-top-card__job-insight',
        '[data-job-id] .jobs-description',
        '.jobs-unified-top-card__job-insight'
    ];

    // Naukri selectors
    const naukriSelectors = [
        '.job-desc',
        '.jd-container',
        '.job-description',
        '#job_desc',
        '.dang-inner-html'
    ];

    // Indeed selectors
    const indeedSelectors = [
        '#jobDescriptionText',
        '.jobsearch-jobDescriptionText',
        '.job-description'
    ];

    // Glassdoor selectors
    const glassdoorSelectors = [
        '.desc',
        '.jobDescriptionContent',
        '[data-test="jobDescription"]'
    ];

    // Generic selectors
    const genericSelectors = [
        '[class*="job-description"]',
        '[class*="jobDescription"]',
        '[id*="job-description"]',
        '[id*="jobDescription"]',
        '[class*="description"]',
        'article',
        '.content'
    ];

    const allSelectors = [
        ...linkedInSelectors,
        ...naukriSelectors,
        ...indeedSelectors,
        ...glassdoorSelectors,
        ...genericSelectors
    ];

    for (const selector of allSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            const text = element.innerText || element.textContent;
            if (text && text.trim().length > 100) {
                return text.trim();
            }
        }
    }

    // Fallback: try to get main content
    const main = document.querySelector('main');
    if (main) {
        return main.innerText.substring(0, 10000);
    }

    return null;
}

// ============================================
// Results Display
// ============================================
function displayResults(results) {
    resultsSection.classList.remove('hidden');

    // Animate score
    animateScore(results.matchPercentage);

    // Update match label based on score
    updateMatchLabel(results.matchPercentage);

    // Display missing keywords
    displayKeywords(missingKeywords, results.missingKeywords, 'missing');
    missingCount.textContent = results.missingKeywords.length;

    // Display matched keywords
    displayKeywords(matchedKeywords, results.matchedKeywords, 'matched');
    matchedCount.textContent = results.matchedKeywords.length;

    // Display suggestions
    displaySuggestions(results.suggestions);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function animateScore(score) {
    // Animate the number
    let current = 0;
    const duration = 1000;
    const increment = score / (duration / 16);

    const animate = () => {
        current += increment;
        if (current < score) {
            matchScore.textContent = Math.floor(current);
            requestAnimationFrame(animate);
        } else {
            matchScore.textContent = score;
        }
    };
    animate();

    // Animate the ring
    const circumference = 2 * Math.PI * 40; // radius = 40
    const offset = circumference - (score / 100) * circumference;

    // Add gradient definition if not exists
    const svg = scoreRing.closest('svg');
    if (!svg.querySelector('#scoreGradient')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6366f1"/>
        <stop offset="100%" style="stop-color:#10b981"/>
      </linearGradient>
    `;
        svg.insertBefore(defs, svg.firstChild);
    }

    scoreRing.style.stroke = 'url(#scoreGradient)';
    scoreRing.style.strokeDashoffset = offset;
}

function updateMatchLabel(score) {
    if (score >= 80) {
        matchLabel.textContent = 'Excellent Match! 🎉';
        matchLabel.style.color = '#10b981';
    } else if (score >= 60) {
        matchLabel.textContent = 'Good Match 👍';
        matchLabel.style.color = '#6366f1';
    } else if (score >= 40) {
        matchLabel.textContent = 'Fair Match';
        matchLabel.style.color = '#f59e0b';
    } else {
        matchLabel.textContent = 'Needs Improvement';
        matchLabel.style.color = '#ef4444';
    }
}

function displayKeywords(container, keywords, type) {
    container.innerHTML = '';

    if (keywords.length === 0) {
        container.innerHTML = `<span class="keyword-tag ${type}">None found</span>`;
        return;
    }

    keywords.slice(0, 15).forEach(keyword => {
        const tag = document.createElement('span');
        tag.className = `keyword-tag ${type}`;
        tag.textContent = keyword;
        container.appendChild(tag);
    });

    if (keywords.length > 15) {
        const more = document.createElement('span');
        more.className = `keyword-tag ${type}`;
        more.textContent = `+${keywords.length - 15} more`;
        container.appendChild(more);
    }
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}
