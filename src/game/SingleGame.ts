import { RoomStruct } from "../net/socket/define";
import { Game, GameObject } from "@eva/eva.js";
import { RendererSystem } from "@eva/plugin-renderer";
import { Img, ImgSystem } from "@eva/plugin-renderer-img";
import { Graphics, GraphicsSystem } from "@eva/plugin-renderer-graphics";
import { Event, EventSystem, HIT_AREA_TYPE } from "@eva/plugin-renderer-event";
import { TilingSprite, TilingSpriteSystem } from "@eva/plugin-renderer-tiling-sprite";

export class SingleGame {
  game: Game
  renderWidth: number
  renderHeight: number
  constructor(struct: RoomStruct, canvas: HTMLCanvasElement) {
    this.renderHeight = canvas.clientHeight;
    this.renderWidth = canvas.clientWidth;
    this.game = new Game({
      systems: [
        new RendererSystem({
          width: canvas.clientWidth,
          height: canvas.clientHeight,
          canvas: canvas,
          enableScroll: false
        }),
        new ImgSystem(),
        new GraphicsSystem(),
        new EventSystem({

        }),
        new TilingSpriteSystem()
      ]
    });
    this.initGame(struct);
  }
  initGame(struct: RoomStruct) {
    const width = [1500, 2000, 3000][struct?.data?.size || 0];
    const height = [1500, 2000, 3000][struct?.data?.size || 0];
    // console.log(this.game.scene.transform.size.width, height, struct.data.size)
    const helper = new GameObject('', {
      position: {
        x: this.renderWidth,
        y: this.renderHeight / 2
      },
      rotation: Math.PI * .5,
    });
    this.game.scene.addChild(helper);
    const bg = new GameObject('', {
      size: {
        width,
        height
      },
      position: {
        x: 0,
        y: 0
      },
      origin: {
        x: 0.5,
        y: 0.5
      },
    });
    bg.addComponent(new TilingSprite({
      resource: '/background.jpg',
      tilePosition: {
        x: 0,
        y: 0
      },
      tileScale: {
        x: 1,
        y: 1
      }
    }));
    const e = bg.addComponent(new Event({
      hitArea: {
        type: HIT_AREA_TYPE.Rect,
        style: {
          x: 0,
          y: 0,
          width,
          height
        }
      }
    }));
    e.on('tap', e => {
      console.log(e.data.localPosition);
    })
    helper.addChild(bg);
  }
  destroy() {
    this.game.destroy();
  }
}