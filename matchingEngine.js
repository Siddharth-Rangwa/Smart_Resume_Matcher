/**
 * Smart Resume Matcher - Hugging Face AI Matching Engine
 * Uses Hugging Face Inference API for intelligent resume analysis
 */

const MatchingEngine = {
    HF_API_URL: 'https://router.huggingface.co/v1/chat/completions',

    // Hardcoded HF token (for personal use - don't push to public repos!)
    HARDCODED_KEY: 'REMOVED',

    /**
     * Analyze resume against job description using Hugging Face AI
     */
    async analyze(resumeText, jobDescription, apiKey) {
        const key = apiKey || this.HARDCODED_KEY;

        if (!key) {
            throw new Error('Please set your Hugging Face token in settings');
        }

        const prompt = this.buildPrompt(resumeText, jobDescription);

        try {
            const response = await fetch(this.HF_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'HuggingFaceTB/SmolLM3-3B:hf-inference',
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 2048,
                    temperature: 0.2
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const text = data.choices?.[0]?.message?.content;

            if (!text) throw new Error('No response from AI');

            return this.parseResponse(text);
        } catch (error) {
            console.error('Hugging Face API error:', error);
            throw error;
        }
    },

    /**
     * Build the analysis prompt
     */
    buildPrompt(resumeText, jobDescription) {
        return `You are an expert ATS (Applicant Tracking System) analyzer. Analyze how well the resume matches the job description.

RESUME:
${resumeText.substring(0, 3000)}

JOB DESCRIPTION:
${jobDescription.substring(0, 2000)}

TASK: Analyze the match and respond with ONLY a JSON object (no other text, no markdown):

{"matchPercentage": <number 0-100>, "matchedKeywords": ["skill1", "skill2"], "missingKeywords": ["skill1", "skill2"], "suggestions": ["suggestion1", "suggestion2", "suggestion3"]}

Rules:
- matchPercentage: realistic ATS score
- matchedKeywords: skills from resume that match job requirements
- missingKeywords: important skills from job NOT in resume
- suggestions: 3-5 specific tips to improve resume for this job
- Return ONLY the JSON, nothing else`;
    },

    /**
     * Parse AI response into structured data
     */
    parseResponse(text) {
        try {
            let cleaned = text.trim();

            // Remove thinking tags if present
            cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');

            // Remove markdown code blocks
            cleaned = cleaned.replace(/```json\s*/gi, '');
            cleaned = cleaned.replace(/```\s*/g, '');

            // Find JSON object in response
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleaned = jsonMatch[0];
            }

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
            console.error('Failed to parse AI response:', e);
            console.error('Raw response:', text);
            throw new Error('Failed to parse AI response. Please try again.');
        }
    },

    /**
     * Validate API key
     */
    async validateApiKey(apiKey) {
        try {
            const response = await fetch(this.HF_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'HuggingFaceTB/SmolLM3-3B:hf-inference',
                    messages: [{ role: 'user', content: 'Say OK' }],
                    max_tokens: 10
                })
            });
            return response.ok;
        } catch {
            return false;
        }
    }
};

window.MatchingEngine = MatchingEngine;
