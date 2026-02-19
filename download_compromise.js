/**
 * Downloads compromise.js browser build following all redirects.
 * Run with: node download_compromise.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const DEST = path.join(__dirname, 'libs', 'compromise.min.js');
// Try different known CDN URLs for the compromise browser bundle
const URLS = [
    'https://unpkg.com/compromise@14.10.0/builds/compromise.min.js',
    'https://cdn.jsdelivr.net/npm/compromise@14.10.0/builds/compromise.min.js',
];

function download(url, redirectCount = 0) {
    if (redirectCount > 10) {
        console.error('Too many redirects');
        process.exit(1);
    }
    console.log(`Fetching: ${url}`);
    https.get(url, { headers: { 'User-Agent': 'node.js' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
            let loc = res.headers.location;
            if (loc.startsWith('/')) {
                const u = new URL(url);
                loc = `${u.protocol}//${u.host}${loc}`;
            }
            return download(loc, redirectCount + 1);
        }
        if (res.statusCode !== 200) {
            console.error(`HTTP ${res.statusCode} for ${url}`);
            process.exit(1);
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
            const data = Buffer.concat(chunks);
            if (data.length < 10000) {
                console.error(`File too small (${data.length} bytes) — may be a redirect page.`);
                console.error(data.toString().substring(0, 200));
                process.exit(1);
            }
            fs.writeFileSync(DEST, data);
            console.log(`✅ Downloaded compromise.min.js — ${data.length} bytes`);
        });
    }).on('error', err => {
        console.error('Request error:', err.message);
        process.exit(1);
    });
}

download(URLS[1]); // Use jsDelivr which handles redirects better
