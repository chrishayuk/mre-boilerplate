import {
  Actor,
  AssetContainer,
  Context
} from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
  // private variables
  private assets: AssetContainer;
  private text: Actor;

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

    // Create a new actor with no mesh, but some text.
    this.text = Actor.Create(this.context, {
      actor: {
        name: 'Text',
        transform: {
          app: { position: { x: 0, y: 0.5, z: 0 } }
        },
        text: {
          contents: 'Hello World!',
          color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
          height: 0.3
        }
      }
    });
  }
}
