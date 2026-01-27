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
        // LinkedIn
        const linkedIn = [
            '.jobs-description__content',
            '.jobs-box__html-content',
            '.job-details-jobs-unified-top-card__job-insight'
        ];

        // Naukri
        const naukri = [
            '.job-desc', '.jd-container', '#job_desc', '.dang-inner-html'
        ];

        // Indeed
        const indeed = [
            '#jobDescriptionText', '.jobsearch-jobDescriptionText'
        ];

        // Generic
        const generic = [
            '[class*="job-description"]', '[class*="jobDescription"]',
            '[id*="job-description"]', 'article', '.description'
        ];

        const allSelectors = [...linkedIn, ...naukri, ...indeed, ...generic];

        for (const selector of allSelectors) {
            const el = document.querySelector(selector);
            if (el) {
                const text = el.innerText || el.textContent;
                if (text && text.trim().length > 100) {
                    return text.trim();
                }
            }
        }

        const main = document.querySelector('main');
        return main ? main.innerText.substring(0, 8000) : null;
    }
})();
