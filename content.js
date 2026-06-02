/**
 * Smart Resume Matcher - Content Script
 * Extracts job descriptions from job portal pages
 */

(function () {
    // Message listener for popup communication
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'getJobDescription') {
            const jobDesc = extractJobDescription();
            sendResponse({ jobDescription: jobDesc });
        }
        return true;
    });

    function extractJobDescription() {
        let jdText = '';

        // Strategy A: Semantic Traversal - Look for common job description headers
        const headerKeywords = ['requirements', 'qualifications', 'what you', 'tech stack', 'experience', 'about the role', 'responsibilities'];
        const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, strong, b'));
        
        const relevantHeaders = headers.filter(h => {
            const text = (h.innerText || '').toLowerCase();
            return headerKeywords.some(keyword => text.includes(keyword));
        });

        if (relevantHeaders.length > 0) {
            const firstNode = relevantHeaders[0];
            let container = firstNode.closest('article, [class*="description"], [class*="job"], [id*="job"]');
            
            if (container) {
                jdText = container.innerText || container.textContent;
            } else {
                const uniqueParents = new Set();
                relevantHeaders.forEach(h => {
                    let parent = h.parentElement;
                    while (parent && parent.innerText.length < 500 && parent !== document.body) {
                        parent = parent.parentElement;
                    }
                    if (parent && parent !== document.body) {
                        uniqueParents.add(parent);
                    }
                });
                jdText = Array.from(uniqueParents).map(p => p.innerText).join('\n\n');
            }
        }

        // Strategy B: Legacy Selectors (Fallback)
        if (!jdText || jdText.length < 300) {
            const legacySelectors = [
                '.jobs-description__content', '.jobs-box__html-content', '.job-details-jobs-unified-top-card__job-insight',
                '.job-desc', '.jd-container', '#job_desc', '.dang-inner-html',
                '#jobDescriptionText', '.jobsearch-jobDescriptionText',
                '[class*="job-description"]', '[class*="jobDescription"]', '[id*="job-description"]', 'article', '.description'
            ];
            
            for (const selector of legacySelectors) {
                const el = document.querySelector(selector);
                if (el && el.innerText.trim().length > 300) {
                    jdText = el.innerText;
                    break;
                }
            }
        }

        // Strategy C: Text Density Scoring (Readability logic)
        if (!jdText || jdText.length < 300) {
            const divs = document.querySelectorAll('div, section, article');
            let bestNode = null;
            let highestScore = 0;
            
            divs.forEach(div => {
                const style = window.getComputedStyle(div);
                if (style.display === 'none' || div.closest('nav, footer, aside, header')) return;
                
                const text = div.innerText || '';
                const length = text.trim().length;
                
                if (length > 300 && length < 10000) {
                    const pCount = div.querySelectorAll('p, li').length;
                    const score = length + (pCount * 50);
                    
                    if (score > highestScore) {
                        highestScore = score;
                        bestNode = div;
                    }
                }
            });
            
            if (bestNode) {
                jdText = bestNode.innerText;
            }
        }

        // Strategy D: Ultimate Fallback
        if (!jdText || jdText.length < 300) {
            const main = document.querySelector('main') || document.body;
            jdText = main.innerText || '';
        }

        return jdText.substring(0, 15000).trim();
    }
})();
