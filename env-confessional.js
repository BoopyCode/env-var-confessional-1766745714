#!/usr/bin/env node

// ENV Var Confessional - Where your environment variables come to confess their sins
// Because runtime surprises are only fun at birthday parties

const fs = require('fs');
const path = require('path');

// The sacred scripture of expected variables
const EXPECTED_ENV = {
    // Database sins
    'DATABASE_URL': 'string',
    'DB_PASSWORD': 'string',
    
    // API confessions
    'API_KEY': 'string',
    'API_SECRET': 'string',
    
    // Feature flag felonies
    'ENABLE_FEATURE_X': 'boolean',
    'DEBUG_MODE': 'boolean',
    
    // Numeric naughtiness
    'PORT': 'number',
    'TIMEOUT_MS': 'number'
};

function typeCheck(value, expectedType) {
    // JavaScript's type system: "Hold my beer"
    if (expectedType === 'boolean') {
        return value === 'true' || value === 'false' || value === '1' || value === '0';
    }
    if (expectedType === 'number') {
        return !isNaN(Number(value)) && value.trim() !== '';
    }
    return typeof value === 'string' && value.trim() !== '';
}

function confess() {
    console.log('\n📖 ENVIRONMENT VARIABLE CONFESSIONAL 📖');
    console.log('Let us begin the ritual of truth...\n');
    
    let sins = 0;
    let virtues = 0;
    
    Object.entries(EXPECTED_ENV).forEach(([key, expectedType]) => {
        const value = process.env[key];
        
        if (!value) {
            console.log(`❌ ${key}: ABSENT (Expected: ${expectedType})`);
            console.log(`   "Forgive me father, for I am not set"`);
            sins++;
        } else if (!typeCheck(value, expectedType)) {
            console.log(`⚠️  ${key}: WRONG TYPE (Got: "${value}", Expected: ${expectedType})`);
            console.log(`   "I confess to being a ${typeof value} pretending to be a ${expectedType}"`);
            sins++;
        } else {
            console.log(`✅ ${key}: Present and correctly typed as ${expectedType}`);
            virtues++;
        }
    });
    
    console.log(`\n📊 CONFESSION COMPLETE:`);
    console.log(`   Virtues: ${virtues} | Sins: ${sins}`);
    
    if (sins > 0) {
        console.log(`\n🙏 Say 3 Hail Marys and fix your .env file`);
        process.exit(1);
    } else {
        console.log(`\n🎉 Go forth and sin no more!`);
    }
}

// Check if we have a custom confession file
const customEnvFile = process.argv[2];
if (customEnvFile) {
    try {
        require('dotenv').config({ path: path.resolve(customEnvFile) });
        console.log(`📄 Using confession from: ${customEnvFile}`);
    } catch {
        console.log(`⚠️  Could not load: ${customEnvFile}, using default confession`);
    }
}

confess();
