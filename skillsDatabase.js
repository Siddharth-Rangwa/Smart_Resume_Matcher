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
     * Build a regex pattern that correctly handles skills with dots, plus signs, etc.
     * Uses explicit boundary lookarounds instead of \b to preserve tech symbols.
     */
    buildSkillRegex(skill) {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Ensure the skill is bounded by space, common punctuation, or string ends.
        // This solves the problem where \b fails on symbols like +, #, .
        return new RegExp(`(?<=^|[\\s,.!?;:()\\[\\]{}&|"'-/\\\\])${escaped}(?=$|[\\s,.!?;:()\\[\\]{}&|"'-/\\\\])`, 'i');
    },

    /**
     * Extract skills from text
     */
    extractSkills(text) {
        const textLower = text.toLowerCase();
        const foundSkills = new Set();
        const allSkills = this.getAllSkills();

        allSkills.forEach(skill => {
            try {
                const regex = this.buildSkillRegex(skill);
                if (regex.test(textLower)) {
                    foundSkills.add(skill);
                }
            } catch (e) {
                // Ignore any regex construction errors for edge-case skills
            }
        });

        // Check synonyms
        Object.entries(this.synonyms).forEach(([main, syns]) => {
            syns.forEach(syn => {
                try {
                    const regex = this.buildSkillRegex(syn);
                    if (regex.test(textLower)) {
                        foundSkills.add(main);
                    }
                } catch (e) {
                    // Ignore
                }
            });
        });

        return Array.from(foundSkills);
    },

    /**
     * Extract years of experience from text using Interval Union Algorithm
     * Resolves overlapping concurrent employment dates
     */
    extractExperience(text) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // 1-12

        const months = {
            'jan': 1, 'january': 1, 'feb': 2, 'february': 2, 'mar': 3, 'march': 3,
            'apr': 4, 'april': 4, 'may': 5, 'jun': 6, 'june': 6, 'jul': 7, 'july': 7,
            'aug': 8, 'august': 8, 'sep': 9, 'sept': 9, 'september': 9,
            'oct': 10, 'october': 10, 'nov': 11, 'november': 11, 'dec': 12, 'december': 12
        };

        let maxExplicitYears = 0;
        const textLower = text.toLowerCase();

        // 1. Explicit years (e.g., "5 years of experience")
        const explicitPatterns = [
            /(\d+)\+?\s*(?:years?|yrs?)[\s,]*(?:of)?[\s,]*(?:experience|exp)/gi,
            /(?:experience|exp)[\s:]*(?:of)?[\s:]*(\d+)\+?\s*(?:years?|yrs?)/gi,
            /(\d+)\+?\s*(?:years?|yrs?)[\s,]*(?:in|with|of)[\s,]/gi
        ];

        explicitPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(textLower)) !== null) {
                const years = parseInt(match[1]);
                if (years > maxExplicitYears && years < 50) {
                    maxExplicitYears = years;
                }
            }
        });

        // 2. Parse intervals
        const intervals = [];

        const addInterval = (sYear, sMonth, eYear, eMonth) => {
            if (sYear >= 1990 && sYear <= currentYear && eYear >= sYear) {
                const startTotalMonths = sYear * 12 + sMonth;
                const endTotalMonths = eYear * 12 + eMonth;
                if (startTotalMonths <= endTotalMonths) {
                    intervals.push([startTotalMonths, endTotalMonths]);
                }
            }
        };

        // Pattern A: "Month Year - Month Year"
        const monthYearPattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|till\s*date|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[.,]?\s*['']?(\d{4})?/gi;

        let match;
        while ((match = monthYearPattern.exec(textLower)) !== null) {
            const startMonth = months[match[1]] || 1;
            const startYear = parseInt(match[2]);
            const endPart = match[3];

            let endMonth, endYear;
            if (['present', 'current', 'now', 'ongoing'].includes(endPart) || endPart.includes('till')) {
                endMonth = currentMonth;
                endYear = currentYear;
            } else {
                endMonth = months[endPart] || 12;
                endYear = parseInt(match[4]) || currentYear;
            }
            addInterval(startYear, startMonth, endYear, endMonth);
        }

        // Pattern B: "01/2020 - 01/2025"
        const mmYyyyPattern = /(\d{1,2})[\/\-](\d{4})\s*[-–—to]+\s*(\d{1,2})[\/\-](\d{4})/gi;
        while ((match = mmYyyyPattern.exec(textLower)) !== null) {
            const startMonth = parseInt(match[1]);
            const startYear = parseInt(match[2]);
            const endMonth = parseInt(match[3]);
            const endYear = parseInt(match[4]);
            if (startMonth >= 1 && startMonth <= 12 && endMonth >= 1 && endMonth <= 12) {
                addInterval(startYear, startMonth, endYear, endMonth);
            }
        }

        // Pattern C: "Year - Year"
        const yearPattern = /(?:^|[\s,])(\d{4})\s*[-–—to]+\s*(present|current|now|ongoing|\d{4})(?:[\s,]|$)/gi;
        while ((match = yearPattern.exec(textLower)) !== null) {
            const startYear = parseInt(match[1]);
            const endPart = match[2];
            const endYear = ['present', 'current', 'now', 'ongoing'].includes(endPart) ? currentYear : parseInt(endPart);
            addInterval(startYear, 1, endYear, 12);
        }

        // 3. Union Overlapping Intervals
        intervals.sort((a, b) => a[0] - b[0]);
        let totalMonthsCalculated = 0;

        if (intervals.length > 0) {
            let currentInterval = intervals[0];
            for (let i = 1; i < intervals.length; i++) {
                if (intervals[i][0] <= currentInterval[1]) {
                    // Overlapping, merge them
                    currentInterval[1] = Math.max(currentInterval[1], intervals[i][1]);
                } else {
                    // Not overlapping, add to total and advance
                    totalMonthsCalculated += (currentInterval[1] - currentInterval[0]);
                    currentInterval = intervals[i];
                }
            }
            // Add the last interval
            totalMonthsCalculated += (currentInterval[1] - currentInterval[0]);
        }

        const calculatedYears = Math.round((totalMonthsCalculated / 12) * 2) / 2;
        const result = Math.max(maxExplicitYears, calculatedYears);

        return result;
    }
};

window.SkillsDatabase = SkillsDatabase;
