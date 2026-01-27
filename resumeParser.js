/**
 * Smart Resume Matcher - Resume Parser
 * Handles PDF and DOCX file parsing
 */

const ResumeParser = {
    async parse(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'pdf') return await this.parsePDF(file);
        if (ext === 'docx') return await this.parseDOCX(file);
        throw new Error('Unsupported format. Use PDF or DOCX.');
    },

    async parsePDF(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const typedArray = new Uint8Array(e.target.result);
                    const pdfjsLib = window.pdfjsLib;
                    if (!pdfjsLib) throw new Error('PDF.js not loaded');

                    pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('libs/pdf.worker.min.js');
                    const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

                    let text = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map(item => item.str).join(' ') + '\n';
                    }
                    resolve(this.cleanText(text));
                } catch (err) {
                    reject(new Error('PDF parse failed: ' + err.message));
                }
            };
            reader.onerror = () => reject(new Error('File read failed'));
            reader.readAsArrayBuffer(file);
        });
    },

    async parseDOCX(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    if (!window.mammoth) throw new Error('Mammoth.js not loaded');
                    const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                    resolve(this.cleanText(result.value || ''));
                } catch (err) {
                    reject(new Error('DOCX parse failed: ' + err.message));
                }
            };
            reader.onerror = () => reject(new Error('File read failed'));
            reader.readAsArrayBuffer(file);
        });
    },

    cleanText(text) {
        return text.replace(/\s+/g, ' ').replace(/[^\w\s.,;:!?@#$%&*()\-+='"]/g, ' ').replace(/  +/g, ' ').trim();
    }
};

window.ResumeParser = ResumeParser;
