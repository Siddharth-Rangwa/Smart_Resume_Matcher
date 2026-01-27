/**
 * Smart Resume Matcher - Matching Engine
 * NLP-based resume vs job description matching
 */

const MatchingEngine = {
    // Common tech skills and keywords
    skillsDatabase: [
        // Programming Languages
        'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'swift', 'kotlin',
        'typescript', 'php', 'scala', 'perl', 'r', 'matlab', 'sql', 'html', 'css', 'sass',
        // Frameworks & Libraries  
        'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'rails',
        'nextjs', 'nuxt', 'gatsby', 'jquery', 'bootstrap', 'tailwind', 'redux', 'graphql',
        // Databases
        'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle',
        'sqlite', 'dynamodb', 'firebase', 'supabase',
        // Cloud & DevOps
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'terraform', 'ansible',
        'ci/cd', 'git', 'github', 'gitlab', 'bitbucket', 'linux', 'nginx', 'apache',
        // AI/ML
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras', 'nlp',
        'computer vision', 'data science', 'pandas', 'numpy', 'scikit-learn',
        // Soft Skills
        'leadership', 'teamwork', 'communication', 'problem solving', 'agile', 'scrum',
        'project management', 'analytical', 'creative', 'time management'
    ],

    async analyze(resumeText, jobDescription) {
        const resumeWords = this.tokenize(resumeText.toLowerCase());
        const jobWords = this.tokenize(jobDescription.toLowerCase());

        const resumeSkills = this.extractSkills(resumeText);
        const jobSkills = this.extractSkills(jobDescription);

        const matchedKeywords = resumeSkills.filter(s => jobSkills.includes(s));
        const missingKeywords = jobSkills.filter(s => !resumeSkills.includes(s));

        // Calculate match percentage
        const skillMatch = jobSkills.length > 0 ? (matchedKeywords.length / jobSkills.length) * 100 : 0;
        const textSimilarity = this.calculateSimilarity(resumeWords, jobWords);
        const matchPercentage = Math.round(skillMatch * 0.7 + textSimilarity * 0.3);

        return {
            matchPercentage: Math.min(matchPercentage, 100),
            matchedKeywords: [...new Set(matchedKeywords)].slice(0, 20),
            missingKeywords: [...new Set(missingKeywords)].slice(0, 15),
            suggestions: this.generateSuggestions(matchPercentage, missingKeywords)
        };
    },

    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9\s+#]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 2);
    },

    extractSkills(text) {
        const lower = text.toLowerCase();
        const found = [];

        // Check for known skills
        this.skillsDatabase.forEach(skill => {
            if (lower.includes(skill)) found.push(skill);
        });

        // Extract years of experience patterns
        const expPattern = /(\d+)\+?\s*(?:years?|yrs?)/gi;
        let match;
        while ((match = expPattern.exec(text)) !== null) {
            found.push(`${match[1]}+ years experience`);
        }

        // Extract degree requirements
        const degrees = ['bachelor', 'master', 'phd', 'b.tech', 'm.tech', 'bsc', 'msc', 'mba'];
        degrees.forEach(deg => {
            if (lower.includes(deg)) found.push(deg);
        });

        return [...new Set(found)];
    },

    calculateSimilarity(words1, words2) {
        const set1 = new Set(words1);
        const set2 = new Set(words2);
        const intersection = [...set1].filter(w => set2.has(w));
        const union = new Set([...set1, ...set2]);
        return (intersection.length / union.size) * 100;
    },

    generateSuggestions(score, missing) {
        const suggestions = [];

        if (score < 40) {
            suggestions.push('Consider tailoring your resume more specifically to this role');
        }
        if (missing.length > 5) {
            suggestions.push(`Add these key skills if you have them: ${missing.slice(0, 3).join(', ')}`);
        }
        if (missing.some(k => k.includes('experience'))) {
            suggestions.push('Highlight relevant experience more prominently');
        }
        suggestions.push('Use keywords from the job description in your resume');
        suggestions.push('Quantify achievements with numbers where possible');

        return suggestions.slice(0, 5);
    }
};

window.MatchingEngine = MatchingEngine;
