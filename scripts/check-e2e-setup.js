#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking E2E test setup...\n');

let allChecked = true;

// Check Node version
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
  
  if (majorVersion >= 16) {
    console.log('✅ Node.js version:', nodeVersion);
  } else {
    console.log('❌ Node.js version:', nodeVersion, '(requires 16+)');
    allChecked = false;
  }
} catch (error) {
  console.log('❌ Could not check Node.js version');
  allChecked = false;
}

// Check if Playwright is installed
try {
  const playwrightVersion = execSync('npx playwright --version', { encoding: 'utf8' }).trim();
  console.log('✅ Playwright installed:', playwrightVersion);
} catch (error) {
  console.log('❌ Playwright not installed');
  console.log('   Run: npm install -D @playwright/test');
  allChecked = false;
}

// Check if browsers are installed
try {
  // Check for browser binaries
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const playwrightPath = path.join(homeDir, '.cache', 'ms-playwright');
  
  if (fs.existsSync(playwrightPath)) {
    const browsers = fs.readdirSync(playwrightPath);
    const installedBrowsers = browsers.filter(dir => 
      dir.includes('chromium') || dir.includes('firefox') || dir.includes('webkit')
    );
    
    if (installedBrowsers.length > 0) {
      console.log('✅ Browsers installed:', installedBrowsers.length, 'browser(s) found');
      installedBrowsers.forEach(browser => {
        console.log('   -', browser);
      });
    } else {
      console.log('⚠️  No browsers found in Playwright cache');
      console.log('   Run: npm run test:e2e:install');
      allChecked = false;
    }
  } else {
    console.log('❌ Playwright browser cache not found');
    console.log('   Run: npm run test:e2e:install');
    allChecked = false;
  }
} catch (error) {
  console.log('⚠️  Could not verify browser installation');
  console.log('   Run: npm run test:e2e:install to ensure browsers are installed');
}

// Check disk space (rough estimate)
try {
  const diskSpace = execSync('df -h . | tail -1', { encoding: 'utf8' });
  const available = diskSpace.split(/\s+/)[3];
  console.log('✅ Available disk space:', available);
} catch (error) {
  // Windows or other OS, skip this check
  console.log('ℹ️  Could not check disk space (non-Unix system)');
}

// Check if dev server can start
console.log('\n📋 Configuration:');
console.log('   Dev server URL: http://localhost:3005');
console.log('   Test directory: ./tests/e2e');
console.log('   Config file: playwright.config.ts');

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecked) {
  console.log('✅ E2E testing environment is ready!');
  console.log('\nYou can now run:');
  console.log('   npm run test:e2e        - Run tests in headless mode');
  console.log('   npm run test:e2e:ui     - Run tests with UI');
} else {
  console.log('⚠️  Some requirements are missing.');
  console.log('\nTo complete setup:');
  console.log('1. Install any missing dependencies: npm install');
  console.log('2. Install browsers: npm run test:e2e:install');
  console.log('3. Try this check again: npm run test:e2e:check');
  process.exit(1);
}