/**
 * Smart Resume Matcher - Popup Script
 * Handles UI interactions, resume upload, and local NLP analysis
 * No API key required - runs 100% in browser
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
    await loadStoredData();
    setupEventListeners();
    updateAnalyzeButton();
});

// ============================================
// Event Listeners Setup
// ============================================
function setupEventListeners() {
    // Upload area
    uploadArea.addEventListener('click', () => resumeInput.click());
    resumeInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    // Resume actions
    removeResumeBtn.addEventListener('click', handleRemoveResume);
    analyzeBtn.addEventListener('click', handleAnalyze);
}

// ============================================
// Data Loading
// ============================================
async function loadStoredData() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['resume'], (result) => {
            if (result.resume) {
                currentResume = result.resume;
                resumeText = result.resume.text;
                showResumeLoaded(result.resume.name, result.resume.uploadedAt);
            }
            resolve();
        });
    });
}

function updateAnalyzeButton() {
    analyzeBtn.disabled = !currentResume;

    analyzeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2"/>
            <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Analyze Match</span>
    `;
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
    if (e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
    }
}

function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        processFile(e.target.files[0]);
    }
}

async function processFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();

    if (!['pdf', 'docx'].includes(ext)) {
        showError('Please upload a PDF or DOCX file');
        return;
    }

    showLoading(true);
    hideError();

    try {
        resumeText = await ResumeParser.parse(file);

        if (!resumeText || resumeText.trim().length === 0) {
            throw new Error('Could not extract text from resume');
        }

        currentResume = {
            name: file.name,
            text: resumeText,
            uploadedAt: Date.now()
        };

        await chrome.storage.local.set({ resume: currentResume });
        showResumeLoaded(file.name);
        updateAnalyzeButton();

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
async function handleRemoveResume() {
    await chrome.storage.local.remove(['resume']);
    currentResume = null;
    resumeText = '';
    showUploadArea();
    resumeInput.value = '';
    updateAnalyzeButton();
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
}

function formatUploadTime(timestamp) {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Uploaded just now';
    if (diff < 3600000) return `Uploaded ${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `Uploaded ${Math.floor(diff / 3600000)} hours ago`;
    return `Uploaded ${Math.floor(diff / 86400000)} days ago`;
}

function showLoading(show) {
    loadingOverlay.classList.toggle('hidden', !show);
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
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

    // Get progress elements
    const loadingText = document.getElementById('loadingText');
    const loadingProgress = document.getElementById('loadingProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Progress callback for model loading
    const onProgress = (percent, file) => {
        loadingText.textContent = 'Loading AI model...';
        loadingProgress.classList.remove('hidden');
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
    };

    try {
        const jobDescription = await getJobDescription();

        if (!jobDescription || jobDescription.trim().length < 50) {
            throw new Error('Could not find job description. Navigate to a job posting page.');
        }

        console.log('Job description extracted, length:', jobDescription.length);

        // Reset progress UI
        loadingText.textContent = 'Analyzing your resume...';
        loadingProgress.classList.add('hidden');
        progressFill.style.width = '0%';

        // Use matching engine with progress callback
        const results = await MatchingEngine.analyze(resumeText, jobDescription, onProgress);

        // Log which method was used
        console.log('Analysis method:', results.method || 'TF-IDF');

        displayResults(results);

    } catch (error) {
        console.error('Analysis error:', error);
        showError(error.message);
    } finally {
        showLoading(false);
        loadingProgress.classList.add('hidden');
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
                    func: () => {
                        // Comprehensive selectors for all major job portals
                        const selectors = [
                            // Wellfound (AngelList) - PRIORITY (CSS modules with hashes)
                            '.styles_description__xjvTf',
                            '[class^="styles_description__"]',
                            '[class*="styles_description__"]',
                            'div.styles_description__xjvTf',

                            // LinkedIn
                            '.jobs-description__content',
                            '.jobs-box__html-content',
                            '.jobs-description',

                            // Naukri
                            '.job-desc',
                            '.jd-container',
                            '#job_desc',
                            '.dang-inner-html',
                            '.styles_JDC__dang-inner-html__h0K4t',

                            // Indeed
                            '#jobDescriptionText',
                            '.jobsearch-jobDescriptionText',

                            // Wellfound additional patterns
                            '[class*="styles_jobDescription"]',
                            '[class*="styles_details"]',
                            '[data-test="job-description"]',
                            '.job-listing-about',

                            // Glassdoor
                            '.jobDescriptionContent',
                            '[data-test="description"]',

                            // Monster
                            '.job-description',
                            '#JobDescription',

                            // Generic patterns (must be after specific ones)
                            '[class*="job-description"]',
                            '[class*="jobDescription"]',
                            '[class*="JobDescription"]',
                            '[class*="job_description"]',
                            '[class*="jobDetail"]',
                            '[class*="job-detail"]',

                            // Fallback containers
                            '.posting-requirements',
                            '.job-details',
                            '.job-content',
                            'article[class*="job"]',
                            'div[class*="listing"]',
                            'section[class*="description"]',

                            // Last resort
                            'article',
                            'main',
                            '.description'
                        ];

                        // Try each selector
                        for (const sel of selectors) {
                            try {
                                const el = document.querySelector(sel);
                                if (el) {
                                    const text = el.innerText || el.textContent;
                                    if (text && text.trim().length > 100) {
                                        console.log('Found job description with selector:', sel);
                                        return text.trim().substring(0, 10000);
                                    }
                                }
                            } catch (e) {
                                // Ignore invalid selectors
                            }
                        }

                        // Additional fallback: Find largest text block on page
                        const allDivs = document.querySelectorAll('div, section, article');
                        let bestMatch = null;
                        let maxLength = 200;

                        allDivs.forEach(div => {
                            const text = div.innerText;
                            if (text && text.length > maxLength && text.length < 15000) {
                                // Check if it looks like a job description
                                const hasJobKeywords = /experience|skills|requirements|responsibilities|qualifications|about|role|position|job|work/i.test(text);
                                if (hasJobKeywords) {
                                    maxLength = text.length;
                                    bestMatch = text;
                                }
                            }
                        });

                        if (bestMatch) {
                            console.log('Found job description via fallback scan');
                            return bestMatch.substring(0, 10000);
                        }

                        return null;
                    }
                });

                resolve(results?.[0]?.result || null);
            } catch (error) {
                reject(new Error('Cannot access this page. Navigate to a job portal.'));
            }
        });
    });
}

// ============================================
// Results Display
// ============================================
function displayResults(results) {
    resultsSection.classList.remove('hidden');

    animateScore(results.matchPercentage);
    updateMatchLabel(results.matchPercentage);

    displayKeywords(missingKeywords, results.missingKeywords, 'missing');
    missingCount.textContent = results.missingKeywords.length;

    displayKeywords(matchedKeywords, results.matchedKeywords, 'matched');
    matchedCount.textContent = results.matchedKeywords.length;

    displaySuggestions(results.suggestions);

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function animateScore(score) {
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

    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (score / 100) * circumference;

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

    if (!keywords || keywords.length === 0) {
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

    if (!suggestions || suggestions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Your resume looks well-matched for this role!';
        suggestionsList.appendChild(li);
        return;
    }

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}
