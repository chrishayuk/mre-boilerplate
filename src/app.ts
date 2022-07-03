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
  // private variables
  private assets: AssetContainer;

  constructor(private context: Context) {
    // call the started event
    this.context.onStarted(() => this.started());
  }

  /**
   * Once the context is "started", initialize the app.
   */
  private async started() {
    // set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
    this.assets = new AssetContainer(this.context);

    // Load a glTF model
    Actor.CreateFromGltf(this.assets, {
      // at the given URL
      uri: 'chrishayuk.glb',
      // Also apply the following generic actor properties.
      actor: {
        name: 'chrishayuk',
        transform: {
          local: {
            position: { x: 0, y: -2.4, z: 0 },
            scale: { x: 2.5, y: 2.5, z: 2.5 }
          }
        }
      }
    });
  }
}
