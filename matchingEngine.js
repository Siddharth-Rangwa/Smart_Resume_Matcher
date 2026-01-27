/**
 * Smart Resume Matcher - Gemini AI Matching Engine
 * Uses Google Gemini API for intelligent resume analysis
 */

const MatchingEngine = {
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

    /**
     * Analyze resume against job description using Gemini AI
     */
    async analyze(resumeText, jobDescription, apiKey) {
        if (!apiKey) {
            throw new Error('Please set your Gemini API key in settings');
        }

        const prompt = this.buildPrompt(resumeText, jobDescription);

        try {
            const response = await fetch(`${this.GEMINI_API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        topP: 0.8,
                        maxOutputTokens: 2048
                    }
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error('No response from Gemini');

            return this.parseResponse(text);
        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    },

    /**
     * Build the analysis prompt
     */
    buildPrompt(resumeText, jobDescription) {
        return `You are an expert ATS (Applicant Tracking System) and career coach. Analyze how well the resume matches the job description.

## RESUME:
${resumeText.substring(0, 4000)}

## JOB DESCRIPTION:
${jobDescription.substring(0, 3000)}

## TASK:
Analyze the resume against the job requirements and respond ONLY with valid JSON in this exact format:

{
  "matchPercentage": <number 0-100>,
  "matchedKeywords": ["skill1", "skill2", ...],
  "missingKeywords": ["skill1", "skill2", ...],
  "suggestions": [
    "Specific actionable suggestion 1",
    "Specific actionable suggestion 2",
    "Specific actionable suggestion 3",
    "Specific actionable suggestion 4",
    "Specific actionable suggestion 5"
  ],
  "summary": "One paragraph summary of the match analysis"
}

IMPORTANT RULES:
1. matchPercentage should reflect realistic ATS scoring
2. matchedKeywords: Skills/technologies from the resume that match job requirements
3. missingKeywords: Important skills from job description NOT found in resume
4. suggestions: Specific, actionable tips to improve the resume for THIS job
5. Be honest - don't inflate the match percentage
6. Return ONLY the JSON object, no markdown, no explanation`;
    },

    /**
     * Parse Gemini response into structured data
     */
    parseResponse(text) {
        try {
            // Clean up the response - remove markdown code blocks if present
            let cleaned = text.trim();
            cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            cleaned = cleaned.trim();

            const result = JSON.parse(cleaned);

            return {
                matchPercentage: Math.min(100, Math.max(0, parseInt(result.matchPercentage) || 0)),
                matchedKeywords: Array.isArray(result.matchedKeywords) ? result.matchedKeywords.slice(0, 20) : [],
                missingKeywords: Array.isArray(result.missingKeywords) ? result.missingKeywords.slice(0, 15) : [],
                suggestions: Array.isArray(result.suggestions) ? result.suggestions.slice(0, 5) : [],
                summary: result.summary || ''
            };
        } catch (e) {
            console.error('Failed to parse Gemini response:', e, text);
            throw new Error('Failed to parse AI response. Please try again.');
        }
    },

    /**
     * Validate API key by making a simple request
     */
    async validateApiKey(apiKey) {
        try {
            const response = await fetch(`${this.GEMINI_API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Say "OK" only' }] }]
                })
            });
            return response.ok;
        } catch {
            return false;
        }
    }
};

window.MatchingEngine = MatchingEngine;
