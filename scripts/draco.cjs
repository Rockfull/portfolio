const fs = require('fs-extra');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

async function copyDraco() {
  try {
    await fs.ensureDir(output);
    await fs.copy(`${src}/draco_decoder.wasm`, `${output}/draco_decoder.wasm`);
    await fs.copy(`${src}/draco_wasm_wrapper.js`, `${output}/draco_wasm_wrapper.js`);
    console.log('Draco decoder copied successfully to public/draco');
  } catch (err) {
    console.error('Error copying Draco decoder:', err);
    process.exit(1);
  }
}

copyDraco();
