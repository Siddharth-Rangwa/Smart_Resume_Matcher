/**
 * Skills Database - 500+ skills with categories and synonyms
 * Used for keyword matching and skill extraction
 */

const SkillsDatabase = {
    // Programming Languages
    programming: [
        'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'golang', 'rust', 'swift',
        'kotlin', 'typescript', 'php', 'scala', 'r', 'matlab', 'perl', 'haskell', 'erlang',
        'elixir', 'clojure', 'dart', 'lua', 'groovy', 'fortran', 'cobol', 'assembly',
        'objective-c', 'vb.net', 'f#', 'julia', 'solidity', 'apex'
    ],

    // Frontend Technologies
    frontend: [
        'html', 'html5', 'css', 'css3', 'sass', 'scss', 'less', 'tailwind', 'tailwindcss',
        'bootstrap', 'react', 'reactjs', 'react.js', 'angular', 'angularjs', 'vue', 'vuejs',
        'vue.js', 'svelte', 'next.js', 'nextjs', 'nuxt', 'nuxt.js', 'gatsby', 'remix',
        'jquery', 'webpack', 'vite', 'parcel', 'rollup', 'babel', 'eslint', 'prettier',
        'material-ui', 'mui', 'chakra', 'antd', 'ant design', 'styled-components', 'emotion',
        'redux', 'mobx', 'zustand', 'recoil', 'context api', 'graphql', 'apollo', 'relay',
        'pwa', 'service worker', 'responsive design', 'flexbox', 'css grid', 'animations'
    ],

    // Backend Technologies
    backend: [
        'node', 'nodejs', 'node.js', 'express', 'expressjs', 'fastify', 'koa', 'hapi',
        'django', 'flask', 'fastapi', 'tornado', 'spring', 'spring boot', 'springboot',
        'hibernate', 'jpa', 'rails', 'ruby on rails', 'ror', 'laravel', 'symfony', 'codeigniter',
        'asp.net', 'asp.net core', '.net', '.net core', 'dotnet', 'gin', 'echo', 'fiber',
        'nest', 'nestjs', 'nest.js', 'graphql', 'rest', 'restful', 'rest api', 'grpc',
        'microservices', 'api development', 'websocket', 'socket.io', 'oauth', 'jwt',
        'authentication', 'authorization', 'middleware'
    ],

    // Databases
    databases: [
        'sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'mariadb', 'oracle', 'mssql',
        'sql server', 'mongodb', 'mongo', 'redis', 'memcached', 'elasticsearch', 'elastic',
        'cassandra', 'dynamodb', 'firebase', 'firestore', 'supabase', 'couchdb', 'couchbase',
        'neo4j', 'graphdb', 'influxdb', 'timescaledb', 'cockroachdb', 'planetscale',
        'prisma', 'sequelize', 'typeorm', 'mongoose', 'knex', 'drizzle', 'database design',
        'normalization', 'indexing', 'query optimization', 'stored procedures', 'triggers'
    ],

    // Cloud & DevOps
    cloud: [
        'aws', 'amazon web services', 'ec2', 's3', 'lambda', 'rds', 'dynamodb', 'cloudfront',
        'route53', 'sns', 'sqs', 'ecs', 'eks', 'fargate', 'elastic beanstalk', 'cloudwatch',
        'azure', 'microsoft azure', 'azure functions', 'azure devops', 'azure ad',
        'gcp', 'google cloud', 'google cloud platform', 'compute engine', 'cloud functions',
        'bigquery', 'cloud storage', 'firebase', 'heroku', 'digitalocean', 'vercel',
        'netlify', 'railway', 'render', 'fly.io', 'cloudflare', 'linode', 'vultr'
    ],

    devops: [
        'docker', 'kubernetes', 'k8s', 'helm', 'terraform', 'ansible', 'puppet', 'chef',
        'jenkins', 'github actions', 'gitlab ci', 'circleci', 'travis ci', 'bamboo',
        'argocd', 'flux', 'spinnaker', 'prometheus', 'grafana', 'datadog', 'new relic',
        'splunk', 'elk', 'logstash', 'kibana', 'jaeger', 'nginx', 'apache', 'caddy',
        'ci/cd', 'continuous integration', 'continuous deployment', 'infrastructure as code',
        'iac', 'gitops', 'devsecops', 'site reliability', 'sre', 'monitoring', 'logging',
        'containerization', 'orchestration', 'load balancing', 'auto scaling'
    ],

    // Data & AI/ML
    data: [
        'data analysis', 'data analytics', 'data science', 'data engineering', 'etl',
        'data pipeline', 'data warehouse', 'data lake', 'data modeling', 'data visualization',
        'tableau', 'power bi', 'looker', 'metabase', 'superset', 'quicksight',
        'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn', 'plotly', 'dask',
        'spark', 'pyspark', 'hadoop', 'hive', 'presto', 'trino', 'airflow', 'dagster',
        'prefect', 'dbt', 'fivetran', 'airbyte', 'kafka', 'rabbitmq', 'pulsar',
        'snowflake', 'databricks', 'redshift', 'bigquery', 'synapse'
    ],

    aiml: [
        'machine learning', 'ml', 'deep learning', 'dl', 'artificial intelligence', 'ai',
        'neural networks', 'nlp', 'natural language processing', 'computer vision', 'cv',
        'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn', 'xgboost', 'lightgbm',
        'catboost', 'opencv', 'huggingface', 'transformers', 'bert', 'gpt', 'llm',
        'large language models', 'generative ai', 'genai', 'rag', 'langchain', 'llamaindex',
        'mlflow', 'kubeflow', 'mlops', 'model deployment', 'model training', 'feature engineering',
        'recommendation systems', 'classification', 'regression', 'clustering', 'reinforcement learning'
    ],

    // Mobile Development
    mobile: [
        'android', 'ios', 'react native', 'flutter', 'xamarin', 'ionic', 'cordova',
        'swift', 'swiftui', 'kotlin', 'java', 'objective-c', 'xcode', 'android studio',
        'mobile development', 'app development', 'mobile ui', 'mobile ux', 'push notifications',
        'app store', 'play store', 'testflight', 'firebase', 'crashlytics', 'analytics',
        'expo', 'capacitor', 'native', 'hybrid', 'cross-platform', 'responsive mobile'
    ],

    // Testing & QA
    testing: [
        'testing', 'unit testing', 'integration testing', 'e2e testing', 'end to end',
        'jest', 'mocha', 'chai', 'jasmine', 'karma', 'cypress', 'playwright', 'selenium',
        'puppeteer', 'pytest', 'unittest', 'junit', 'testng', 'rspec', 'minitest',
        'postman', 'insomnia', 'swagger', 'api testing', 'load testing', 'jmeter',
        'locust', 'k6', 'performance testing', 'stress testing', 'security testing',
        'penetration testing', 'tdd', 'bdd', 'test automation', 'qa', 'quality assurance',
        'manual testing', 'regression testing', 'smoke testing', 'sanity testing'
    ],

    // Version Control & Collaboration
    versionControl: [
        'git', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial', 'version control',
        'branching', 'merging', 'pull request', 'code review', 'gitflow', 'trunk based',
        'jira', 'confluence', 'trello', 'asana', 'monday', 'notion', 'linear',
        'slack', 'teams', 'discord', 'zoom', 'agile', 'scrum', 'kanban', 'sprint',
        'standup', 'retrospective', 'planning', 'estimation', 'story points'
    ],

    // Security
    security: [
        'cybersecurity', 'security', 'owasp', 'penetration testing', 'pen testing',
        'vulnerability', 'encryption', 'ssl', 'tls', 'https', 'oauth', 'oauth2',
        'saml', 'openid', 'jwt', 'api security', 'web security', 'network security',
        'firewall', 'waf', 'ddos', 'xss', 'csrf', 'sql injection', 'authentication',
        'authorization', 'rbac', 'abac', 'sso', 'mfa', '2fa', 'zero trust',
        'soc', 'siem', 'compliance', 'gdpr', 'hipaa', 'pci dss', 'iso 27001'
    ],

    // Soft Skills
    softSkills: [
        'communication', 'leadership', 'teamwork', 'collaboration', 'problem solving',
        'critical thinking', 'analytical', 'creativity', 'innovation', 'adaptability',
        'time management', 'organization', 'attention to detail', 'multitasking',
        'project management', 'stakeholder management', 'mentoring', 'coaching',
        'presentation', 'public speaking', 'negotiation', 'conflict resolution',
        'decision making', 'strategic thinking', 'customer focus', 'client facing',
        'self motivated', 'proactive', 'initiative', 'ownership', 'accountability'
    ],

    // Experience Levels
    experienceLevels: [
        'intern', 'internship', 'fresher', 'entry level', 'junior', 'associate',
        'mid level', 'intermediate', 'senior', 'lead', 'principal', 'staff',
        'architect', 'manager', 'director', 'vp', 'vice president', 'head',
        'chief', 'cto', 'ceo', 'cio', 'ciso', 'executive'
    ],

    // Education
    education: [
        'bachelor', 'bachelors', 'bs', 'bsc', 'ba', 'btech', 'be', 'bca', 'bba',
        'master', 'masters', 'ms', 'msc', 'ma', 'mtech', 'me', 'mca', 'mba',
        'phd', 'doctorate', 'diploma', 'certification', 'certified', 'degree',
        'computer science', 'cs', 'engineering', 'information technology', 'it',
        'software engineering', 'data science', 'mathematics', 'statistics'
    ],

    // Synonyms for common terms
    synonyms: {
        'javascript': ['js', 'ecmascript', 'es6', 'es2015'],
        'typescript': ['ts'],
        'python': ['py'],
        'machine learning': ['ml'],
        'deep learning': ['dl'],
        'artificial intelligence': ['ai'],
        'natural language processing': ['nlp'],
        'computer vision': ['cv'],
        'database': ['db', 'databases'],
        'api': ['apis', 'rest api', 'restful api'],
        'continuous integration': ['ci'],
        'continuous deployment': ['cd'],
        'ci/cd': ['cicd', 'ci cd'],
        'kubernetes': ['k8s'],
        'react': ['reactjs', 'react.js'],
        'vue': ['vuejs', 'vue.js'],
        'angular': ['angularjs'],
        'node': ['nodejs', 'node.js'],
        'experience': ['exp', 'years', 'yrs']
    },

    /**
     * Get all skills as a flat array
     */
    getAllSkills() {
        const allSkills = new Set();
        const categories = ['programming', 'frontend', 'backend', 'databases', 'cloud',
            'devops', 'data', 'aiml', 'mobile', 'testing', 'versionControl', 'security', 'softSkills'];

        categories.forEach(cat => {
            this[cat].forEach(skill => allSkills.add(skill.toLowerCase()));
        });

        return Array.from(allSkills);
    },

    /**
     * Extract skills from text
     */
    extractSkills(text) {
        const textLower = text.toLowerCase();
        const foundSkills = new Set();
        const allSkills = this.getAllSkills();

        allSkills.forEach(skill => {
            // Word boundary check to avoid partial matches
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (regex.test(textLower)) {
                foundSkills.add(skill);
            }
        });

        // Check synonyms
        Object.entries(this.synonyms).forEach(([main, syns]) => {
            syns.forEach(syn => {
                const regex = new RegExp(`\\b${syn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                if (regex.test(textLower)) {
                    foundSkills.add(main);
                }
            });
        });

        return Array.from(foundSkills);
    },

    /**
     * Extract years of experience from text
     * Handles multiple formats:
     * - "5 years of experience"
     * - "Jan 2020 - Present"
     * - "January 2020 - December 2024"
     * - "2020 - 2025"
     * - "01/2020 - 01/2025"
     */
    extractExperience(text) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // 1-12

        // Month name to number mapping
        const months = {
            'jan': 1, 'january': 1,
            'feb': 2, 'february': 2,
            'mar': 3, 'march': 3,
            'apr': 4, 'april': 4,
            'may': 5,
            'jun': 6, 'june': 6,
            'jul': 7, 'july': 7,
            'aug': 8, 'august': 8,
            'sep': 9, 'sept': 9, 'september': 9,
            'oct': 10, 'october': 10,
            'nov': 11, 'november': 11,
            'dec': 12, 'december': 12
        };

        let totalMonths = 0;
        let maxExplicitYears = 0;

        // Pattern 1: Explicit years mentioned (e.g., "5+ years of experience")
        const explicitPatterns = [
            /(\d+)\+?\s*(?:years?|yrs?)[\s,]*(?:of)?[\s,]*(?:experience|exp)/gi,
            /(?:experience|exp)[\s:]*(?:of)?[\s:]*(\d+)\+?\s*(?:years?|yrs?)/gi,
            /(\d+)\+?\s*(?:years?|yrs?)[\s,]*(?:in|with|of)[\s,]/gi
        ];

        explicitPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const years = parseInt(match[1]);
                if (years > maxExplicitYears && years < 50) {
                    maxExplicitYears = years;
                }
            }
        });

        // Pattern 2: Date ranges (e.g., "Jan 2020 - Present", "January 2020 - December 2024")
        const dateRangePatterns = [
            // "Jan 2020 - Present" or "Jan 2020 - Dec 2024"
            /(?:^|\s)(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})?/gi,

            // "01/2020 - 01/2025" or "01-2020 - 01-2025"
            /(\d{1,2})[\/\-](\d{4})\s*[-–—to]+\s*(\d{1,2})[\/\-](\d{4})/gi,

            // "2020 - 2025" or "2020 - Present"
            /(?:^|\s)(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|\d{4})/gi
        ];

        // Extract date ranges and calculate duration
        const textLower = text.toLowerCase();

        // Pattern: "Month Year - Month Year" or "Month Year - Present"
        const monthYearPattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|till\s*date|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})?/gi;

        let match;
        while ((match = monthYearPattern.exec(textLower)) !== null) {
            const startMonth = months[match[1].toLowerCase()] || 1;
            const startYear = parseInt(match[2]);

            let endMonth, endYear;
            const endPart = match[3].toLowerCase();

            if (['present', 'current', 'now', 'ongoing'].includes(endPart) || endPart.includes('till')) {
                endMonth = currentMonth;
                endYear = currentYear;
            } else {
                endMonth = months[endPart] || 12;
                endYear = parseInt(match[4]) || currentYear;
            }

            // Calculate months between dates
            if (startYear >= 1990 && startYear <= currentYear && endYear >= startYear) {
                const monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
                if (monthsDiff > 0 && monthsDiff < 600) { // Max 50 years
                    totalMonths += monthsDiff;
                }
            }
        }

        // Pattern: "Year - Year" or "Year - Present"
        const yearPattern = /(?:^|[\s,])(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|\d{4})(?:[\s,]|$)/gi;

        while ((match = yearPattern.exec(textLower)) !== null) {
            const startYear = parseInt(match[1]);
            let endYear;

            const endPart = match[2].toLowerCase();
            if (['present', 'current', 'now', 'ongoing'].includes(endPart)) {
                endYear = currentYear;
            } else {
                endYear = parseInt(match[2]);
            }

            if (startYear >= 1990 && startYear <= currentYear && endYear >= startYear) {
                const yearsDiff = endYear - startYear;
                if (yearsDiff > 0 && yearsDiff < 50) {
                    // Only add if we didn't already capture this from month-year pattern
                    // Use a simple heuristic: if totalMonths is still 0, add this
                    if (totalMonths === 0) {
                        totalMonths += yearsDiff * 12;
                    }
                }
            }
        }

        // Convert total months to years (round to nearest 0.5)
        const calculatedYears = Math.round((totalMonths / 12) * 2) / 2;

        // Return the maximum of explicit years or calculated years
        const result = Math.max(maxExplicitYears, calculatedYears);

        console.log('Experience extraction:', {
            explicitYears: maxExplicitYears,
            totalMonths: totalMonths,
            calculatedYears: calculatedYears,
            finalResult: result
        });

        return result;
    }
};

window.SkillsDatabase = SkillsDatabase;
