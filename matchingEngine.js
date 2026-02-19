/**
 * Smart Resume Matcher - Enhanced Matching Engine
 * Uses TF-IDF + compromise.js NLP for semantic similarity
 * 100% local processing, no external dependencies
 */

const MatchingEngine = {
    /**
     * Analyze resume against job description
     */
    async analyze(resumeText, jobDescription, onProgress) {
        console.log('Starting analysis...');

        if (onProgress) onProgress(10, 'Extracting skills...');

        // Normalize text using compromise.js NLP if available
        const normalizedResume = this.normalizeText(resumeText);
        const normalizedJob = this.normalizeText(jobDescription);

        // Extract skills using database (run on BOTH original and normalized)
        const resumeSkills = this.mergeSkills(
            SkillsDatabase.extractSkills(resumeText),
            SkillsDatabase.extractSkills(normalizedResume)
        );
        const jobSkills = this.mergeSkills(
            SkillsDatabase.extractSkills(jobDescription),
            SkillsDatabase.extractSkills(normalizedJob)
        );

        console.log('Resume skills:', resumeSkills.length);
        console.log('Job skills:', jobSkills.length);

        if (onProgress) onProgress(30, 'Matching keywords...');

        // Extract experience
        const resumeExp = SkillsDatabase.extractExperience(resumeText);
        const jobExp = SkillsDatabase.extractExperience(jobDescription);

        // Calculate matched and missing skills
        const matchedSkills = jobSkills.filter(skill =>
            resumeSkills.some(rs => this.skillsMatch(rs, skill))
        );
        const missingSkills = jobSkills.filter(skill =>
            !resumeSkills.some(rs => this.skillsMatch(rs, skill))
        );

        if (onProgress) onProgress(50, 'Calculating similarity...');

        // Calculate scores
        const keywordScore = this.calculateKeywordScore(matchedSkills, jobSkills);
        const semanticScore = this.calculateSemanticScore(normalizedResume, normalizedJob);
        const experienceScore = this.calculateExperienceScore(resumeExp, jobExp);

        console.log('Scores - Keyword:', keywordScore, 'Semantic:', semanticScore, 'Experience:', experienceScore);

        if (onProgress) onProgress(80, 'Generating suggestions...');

        // Weighted final score
        const matchPercentage = Math.round(
            (keywordScore * 0.45) +
            (semanticScore * 0.35) +
            (experienceScore * 0.20)
        );

        // Generate suggestions
        const suggestions = this.generateSuggestions(missingSkills, resumeExp, jobExp, matchPercentage);

        if (onProgress) onProgress(100, 'Done!');

        return {
            matchPercentage: Math.min(100, Math.max(0, matchPercentage)),
            matchedKeywords: matchedSkills.slice(0, 20),
            missingKeywords: missingSkills.slice(0, 15),
            suggestions: suggestions,
            breakdown: {
                keywordScore: Math.round(keywordScore),
                semanticScore: Math.round(semanticScore),
                experienceScore: Math.round(experienceScore)
            },
            method: window.nlp ? 'NLP Engine (compromise.js)' : 'NLP Engine'
        };
    },

    /**
     * Normalize text using compromise.js NLP (lemmatization + cleaning).
     * Falls back to basic lowercasing if compromise is not loaded.
     */
    normalizeText(text) {
        if (window.nlp) {
            try {
                const doc = window.nlp(text);
                // Convert verbs to infinitive form: "managed" -> "manage", "building" -> "build"
                doc.verbs().toInfinitive();
                // Convert plural nouns to singular: "frameworks" -> "framework"
                doc.nouns().toSingular();
                return doc.text();
            } catch (e) {
                console.warn('compromise.js normalization failed, using raw text:', e);
            }
        }
        return text;
    },

    /**
     * Merge two skill arrays, deduplicating by lowercase value.
     */
    mergeSkills(arr1, arr2) {
        const seen = new Set(arr1.map(s => s.toLowerCase()));
        const merged = [...arr1];
        for (const skill of arr2) {
            if (!seen.has(skill.toLowerCase())) {
                seen.add(skill.toLowerCase());
                merged.push(skill);
            }
        }
        return merged;
    },

    /**
     * Check if two skills match (including synonyms)
     */
    skillsMatch(skill1, skill2) {
        skill1 = skill1.toLowerCase();
        skill2 = skill2.toLowerCase();

        if (skill1 === skill2) return true;

        // Check synonyms
        const synonyms = SkillsDatabase.synonyms;
        for (const [main, syns] of Object.entries(synonyms)) {
            const allVariants = [main, ...syns].map(s => s.toLowerCase());
            if (allVariants.includes(skill1) && allVariants.includes(skill2)) {
                return true;
            }
        }

        return false;
    },

    /**
     * Calculate keyword match score
     */
    calculateKeywordScore(matchedSkills, jobSkills) {
        // Return 0 instead of 50 when no job skills found — don't fake confidence
        if (jobSkills.length === 0) return 0;
        return Math.round((matchedSkills.length / jobSkills.length) * 100);
    },

    /**
     * Calculate semantic similarity using enhanced TF-IDF
     */
    calculateSemanticScore(resumeText, jobDescription) {
        const resumeTokens = this.tokenize(resumeText);
        const jobTokens = this.tokenize(jobDescription);

        // Build vocabulary with IDF weights
        const allDocs = [resumeTokens, jobTokens];
        const vocab = new Set([...resumeTokens, ...jobTokens]);

        // Calculate IDF for each term
        const idf = {};
        vocab.forEach(term => {
            const docCount = allDocs.filter(doc => doc.includes(term)).length;
            idf[term] = Math.log(allDocs.length / (docCount + 1)) + 1;
        });

        // Calculate TF-IDF vectors
        const resumeVector = this.calculateTFIDFVector(resumeTokens, vocab, idf);
        const jobVector = this.calculateTFIDFVector(jobTokens, vocab, idf);

        // Calculate cosine similarity
        const similarity = this.cosineSimilarity(resumeVector, jobVector);

        return Math.round(Math.max(0, similarity) * 100);
    },

    /**
     * Tokenize and clean text.
     * Important short tech terms (go, r, ai, ml, etc.) are whitelisted
     * so they are not dropped by the length filter.
     */
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2 || this.shortSkillTokens.has(word))
            .filter(word => !this.stopWords.includes(word));
    },

    /**
     * Calculate TF-IDF vector for a document
     */
    calculateTFIDFVector(tokens, vocab, idf) {
        const tf = {};
        const totalTokens = tokens.length || 1;

        // Calculate term frequency
        tokens.forEach(token => {
            tf[token] = (tf[token] || 0) + 1;
        });

        // Normalize TF and multiply by IDF
        const vector = [];
        vocab.forEach(word => {
            const tfValue = (tf[word] || 0) / totalTokens;
            const idfValue = idf[word] || 1;
            vector.push(tfValue * idfValue);
        });

        return vector;
    },

    /**
     * Calculate cosine similarity between two vectors
     */
    cosineSimilarity(vec1, vec2) {
        if (!vec1 || !vec2 || vec1.length !== vec2.length) return 0;

        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;

        for (let i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            norm1 += vec1[i] * vec1[i];
            norm2 += vec2[i] * vec2[i];
        }

        norm1 = Math.sqrt(norm1);
        norm2 = Math.sqrt(norm2);

        if (norm1 === 0 || norm2 === 0) return 0;

        return dotProduct / (norm1 * norm2);
    },

    /**
     * Calculate experience match score
     */
    calculateExperienceScore(resumeExp, jobExp) {
        if (jobExp === 0) return 80; // No experience mentioned in job
        if (resumeExp === 0) return 40; // No experience found in resume

        if (resumeExp >= jobExp) {
            return 100; // Meets or exceeds requirement
        } else {
            const ratio = resumeExp / jobExp;
            return Math.round(40 + (ratio * 60));
        }
    },

    /**
     * Generate improvement suggestions
     */
    generateSuggestions(missingSkills, resumeExp, jobExp, matchScore) {
        const suggestions = [];

        // Skill-based suggestions
        if (missingSkills.length > 0) {
            const topMissing = missingSkills.slice(0, 3).map(s =>
                s.charAt(0).toUpperCase() + s.slice(1)
            );
            suggestions.push(`Add these key skills to your resume: ${topMissing.join(', ')}`);

            if (missingSkills.length > 3) {
                const moreMissing = missingSkills.slice(3, 6).map(s =>
                    s.charAt(0).toUpperCase() + s.slice(1)
                );
                suggestions.push(`Consider adding: ${moreMissing.join(', ')}`);
            }
        }

        // Experience-based suggestions
        if (jobExp > 0 && resumeExp < jobExp) {
            const gap = jobExp - resumeExp;
            suggestions.push(`Job requires ${jobExp}+ years experience (you have ${resumeExp}). Highlight transferable skills and projects.`);
        }

        // Score-based suggestions
        if (matchScore < 50) {
            suggestions.push('Consider tailoring your resume specifically for this role - add relevant keywords.');
            suggestions.push('Review the job description and mirror its language in your resume.');
        } else if (matchScore < 70) {
            suggestions.push('Good foundation! Emphasize your experience with the technologies mentioned in the job.');
        } else if (matchScore < 85) {
            suggestions.push('Strong match! Quantify your achievements (e.g., "improved performance by 40%").');
        } else {
            suggestions.push('Excellent match! Ensure your resume formatting is ATS-friendly (no tables, graphics).');
        }

        // Always-useful suggestions
        if (suggestions.length < 4) {
            suggestions.push('Use action verbs: Led, Developed, Implemented, Optimized, Reduced, Increased.');
        }

        return suggestions.slice(0, 5);
    },

    /**
     * Short but important tech/skill tokens that must NOT be filtered by length.
     */
    shortSkillTokens: new Set([
        'go', 'r', 'ai', 'ml', 'dl', 'cv', 'ui', 'ux', 'qa', 'ci', 'cd',
        'js', 'ts', 'c', 'db', 'vm', 'os', 'bi', 'rpa', 'sre', 'iac'
    ]),

    /**
     * Common stop words to filter out
     */
    stopWords: [
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
        'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be',
        'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
        'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used',
        'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
        'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
        'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
        'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
        'just', 'also', 'now', 'here', 'there', 'then', 'once', 'about', 'into',
        'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under',
        'again', 'further', 'any', 'your', 'our', 'their', 'its', 'his', 'her', 'my',
        'am', 'been', 'being', 'having', 'such', 'own', 'same', 'doing', 'while',
        'job', 'work', 'working', 'company', 'team', 'role', 'position', 'candidate',
        'looking', 'seeking', 'join', 'able', 'well', 'good', 'great', 'best', 'etc'
    ]
};

window.MatchingEngine = MatchingEngine;
