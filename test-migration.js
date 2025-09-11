/**
 * Bootstrap 5 Migration Testing Script
 * Validates HTML pages for common migration issues
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class MigrationTester {
    constructor(templateDir) {
        this.templateDir = templateDir;
        this.results = {
            files: [],
            totalIssues: 0,
            gridClasses: 0,
            deprecatedClasses: 0,
            jqueryUsage: 0
        };
    }

    // Test patterns for Bootstrap 3 → 5 migration issues
    testPatterns = {
        // Grid system issues
        oldGridClasses: /\bcol-(xs|sm|md|lg)-offset-\d+\b/g,
        xsGridClasses: /\bcol-xs-\d+\b/g,
        noGuttersClass: /\bno-gutters\b/g,
        
        // Component issues  
        btnBlock: /\bbtn-block\b/g,
        badgeClasses: /\bbadge-(primary|secondary|success|info|warning|danger|light|dark)\b/g,
        fontWeightClasses: /\bfont-weight-(bold|normal|light)\b/g,
        mediaComponent: /\bmedia\b/g,
        
        // jQuery dependencies
        jquerySelectors: /\$\(/g,
        bootstrapModalJs: /\.modal\(/g,
        bootstrapTooltipJs: /\.tooltip\(/g
    };

    async testFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const fileName = path.basename(filePath);
            
            const fileResult = {
                name: fileName,
                path: filePath,
                issues: [],
                gridClasses: 0,
                deprecatedClasses: 0,
                jqueryUsage: 0
            };

            // Test for Bootstrap 3 grid classes
            const xsMatches = content.match(this.testPatterns.xsGridClasses) || [];
            const offsetMatches = content.match(this.testPatterns.oldGridClasses) || [];
            const gutterMatches = content.match(this.testPatterns.noGuttersClass) || [];
            
            if (xsMatches.length > 0) {
                fileResult.issues.push(`Found ${xsMatches.length} col-xs-* classes (need to become col-*)`);
                fileResult.gridClasses += xsMatches.length;
            }
            
            if (offsetMatches.length > 0) {
                fileResult.issues.push(`Found ${offsetMatches.length} old offset classes (col-*-offset-*)`);
                fileResult.gridClasses += offsetMatches.length;
            }
            
            if (gutterMatches.length > 0) {
                fileResult.issues.push(`Found ${gutterMatches.length} .no-gutters classes (change to .g-0)`);
                fileResult.gridClasses += gutterMatches.length;
            }

            // Test for deprecated component classes
            const btnBlockMatches = content.match(this.testPatterns.btnBlock) || [];
            const badgeMatches = content.match(this.testPatterns.badgeClasses) || [];
            const fontMatches = content.match(this.testPatterns.fontWeightClasses) || [];
            const mediaMatches = content.match(this.testPatterns.mediaComponent) || [];
            
            if (btnBlockMatches.length > 0) {
                fileResult.issues.push(`Found ${btnBlockMatches.length} .btn-block classes (replace with .d-grid)`);
                fileResult.deprecatedClasses += btnBlockMatches.length;
            }
            
            if (badgeMatches.length > 0) {
                fileResult.issues.push(`Found ${badgeMatches.length} .badge-* color classes (replace with .bg-*)`);
                fileResult.deprecatedClasses += badgeMatches.length;
            }
            
            if (fontMatches.length > 0) {
                fileResult.issues.push(`Found ${fontMatches.length} .font-weight-* classes (replace with .fw-*)`);
                fileResult.deprecatedClasses += fontMatches.length;
            }
            
            if (mediaMatches.length > 0) {
                fileResult.issues.push(`Found ${mediaMatches.length} .media components (replace with utilities)`);
                fileResult.deprecatedClasses += mediaMatches.length;
            }

            // Test for jQuery usage
            const jqueryMatches = content.match(this.testPatterns.jquerySelectors) || [];
            const modalMatches = content.match(this.testPatterns.bootstrapModalJs) || [];
            const tooltipMatches = content.match(this.testPatterns.bootstrapTooltipJs) || [];
            
            if (jqueryMatches.length > 0) {
                fileResult.issues.push(`Found ${jqueryMatches.length} jQuery selectors`);
                fileResult.jqueryUsage += jqueryMatches.length;
            }
            
            if (modalMatches.length > 0) {
                fileResult.issues.push(`Found ${modalMatches.length} Bootstrap 3 modal JS calls`);
                fileResult.jqueryUsage += modalMatches.length;
            }
            
            if (tooltipMatches.length > 0) {
                fileResult.issues.push(`Found ${tooltipMatches.length} Bootstrap 3 tooltip JS calls`);
                fileResult.jqueryUsage += tooltipMatches.length;
            }

            // Update totals
            this.results.gridClasses += fileResult.gridClasses;
            this.results.deprecatedClasses += fileResult.deprecatedClasses;
            this.results.jqueryUsage += fileResult.jqueryUsage;
            this.results.totalIssues += fileResult.issues.length;

            return fileResult;
        } catch (error) {
            return {
                name: path.basename(filePath),
                path: filePath,
                error: error.message,
                issues: [`Error reading file: ${error.message}`]
            };
        }
    }

    async testAllFiles() {
        const htmlFiles = fs.readdirSync(this.templateDir)
            .filter(file => file.endsWith('.html'))
            .map(file => path.join(this.templateDir, file));

        console.log(`🔍 Testing ${htmlFiles.length} HTML files for Bootstrap 5 migration issues...\n`);

        for (const filePath of htmlFiles) {
            const result = await this.testFile(filePath);
            this.results.files.push(result);
            
            if (result.issues.length > 0) {
                console.log(`❌ ${result.name}:`);
                result.issues.forEach(issue => console.log(`   • ${issue}`));
                console.log();
            } else if (!result.error) {
                console.log(`✅ ${result.name} - No issues found`);
            }
        }

        this.printSummary();
    }

    printSummary() {
        console.log('\n📊 MIGRATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total files tested: ${this.results.files.length}`);
        console.log(`Files with issues: ${this.results.files.filter(f => f.issues && f.issues.length > 0).length}`);
        console.log(`Total grid class updates needed: ${this.results.gridClasses}`);
        console.log(`Total deprecated class updates: ${this.results.deprecatedClasses}`);  
        console.log(`Total jQuery usage instances: ${this.results.jqueryUsage}`);
        console.log(`Total migration issues: ${this.results.totalIssues}`);
        console.log('='.repeat(50));
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: this.results,
            files: this.results.files.filter(f => f.issues && f.issues.length > 0)
        };

        fs.writeFileSync(
            path.join(process.cwd(), 'migration-report.json'), 
            JSON.stringify(report, null, 2)
        );

        console.log('\n📄 Detailed report saved to migration-report.json');
    }
}

// Usage
if (require.main === module) {
    const templateDir = process.argv[2] || './notika/green-horizotal';
    
    if (!fs.existsSync(templateDir)) {
        console.error(`❌ Template directory not found: ${templateDir}`);
        console.log('Usage: node test-migration.js [template-directory]');
        process.exit(1);
    }

    const tester = new MigrationTester(templateDir);
    tester.testAllFiles().then(() => {
        tester.generateReport();
    }).catch(console.error);
}

module.exports = MigrationTester;