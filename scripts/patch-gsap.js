import fs from 'fs';
import path from 'path';

const gsapPath = path.resolve('node_modules', 'gsap');
const distPath = path.join(gsapPath, 'dist', 'gsap.js');
const indexPath = path.join(gsapPath, 'index.js');

try {
    if (fs.existsSync(distPath)) {
        const content = fs.readFileSync(distPath, 'utf8');
        fs.writeFileSync(indexPath, content, 'utf8');
        console.log('Successfully patched gsap/index.js with CJS content.');
    } else {
        console.error('GSAP dist file not found at:', distPath);
        // Don't fail the build if path is wrong, just warn
    }
} catch (error) {
    console.error('Error patching GSAP:', error);
}
