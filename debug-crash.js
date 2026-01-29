
import fs from 'fs';
import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";

installGlobals();

console.log("Attempting to import server build...");

try {
    // Use the correct path
    const build = await import('./build/server/nodejs-eyJydW50aW1lIjoibm9kZWpzIn0/index.js');
    console.log("Import success");

    console.log("Creating request handler...");
    const handler = createRequestHandler(build, "production");

    console.log("Sending test request to /...");
    const res1 = await handler(new Request("http://localhost/"));
    console.log("/ status:", res1.status);

    if (res1.status === 500) {
        console.log("500 detected on /");
        // Try to read body?
    }

} catch (e) {
    console.error("Execution failed!");
    console.error(e.message);
    try {
        fs.writeFileSync('crash.log', e.stack);
        console.log("Stack trace written to crash.log");
    } catch (err) {
        console.error("Failed to write log:", err);
    }
}
