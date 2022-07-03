/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
  Actor,
  AssetContainer,
  ColliderType,
  Context
} from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
  private text: Actor = null;
  private cube: Actor = null;
  private assets: AssetContainer;

  constructor(private context: Context) {
    console.log('constructor');
    this.context.onStarted(() => this.started());
  }

  /**
   * Once the context is "started", initialize the app.
   */
  private async started() {
    // set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
    this.assets = new AssetContainer(this.context);

    console.log('started');

    // Load a glTF model
    const model = Actor.CreateFromGltf(this.assets, {
      // at the given URL
      uri: 'chrishayuk.glb',
      // Also apply the following generic actor properties.
      actor: {
        name: 'chrishayuk',
        transform: {
          local: {
            position: { x: 0, y: -2.4, z: 0 },
            scale: { x: 3, y: 3, z: 3 }
          }
        }
      }
    });
  }
}
