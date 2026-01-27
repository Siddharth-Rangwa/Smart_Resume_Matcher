/**
 * Smart Resume Matcher - Background Service Worker
 */

// Extension installed
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Smart Resume Matcher installed successfully!');
    }
});

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeResume') {
        // Handle analysis request if needed
        sendResponse({ success: true });
    }
    return true;
});
