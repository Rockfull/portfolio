import { Cache, TextureLoader } from 'three';

// Enable caching for all loaders
Cache.enabled = true;

let dracoLoader;
let gltfLoader;
let textureLoader;

/**
 * Load a GLTF model with Draco decoding (client-side only)
 */
export const loadModel = async url => {
  if (typeof window === 'undefined') return;

  if (!gltfLoader) {
    const { DRACOLoader, GLTFLoader } = await import('three-stdlib');
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
  }

  return gltfLoader.loadAsync(url);
};

/**
 * Load a texture (client-side only)
 */
export const loadTexture = async url => {
  if (typeof window === 'undefined') return;

  if (!textureLoader) {
    textureLoader = new TextureLoader();
  }

  return textureLoader.loadAsync(url);
};

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = scene => {
  scene?.traverse(object => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      for (const material of object.material) {
        cleanMaterial(material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();

      // Close GLTF bitmap textures
      value.source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = renderer => {
  renderer.dispose();
  renderer = null;
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = lights => {
  for (const light of lights) {
    light.parent.remove(light);
  }
};

/**
 * Get child by name
 */
export const getChild = (name, object) => {
  let node;

  object.traverse(child => {
    if (child.name === name) {
      node = child;
    }
  });

  return node;
};
