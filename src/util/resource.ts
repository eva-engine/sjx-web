import { ResourceBase, RESOURCE_TYPE } from "@eva/eva.js";

export const convertToResourceBase = (url: string): ResourceBase => ({
  type: RESOURCE_TYPE.IMAGE,
  name: url,
  src: {
    image: {
      type: 'IMAGE',
      url
    }
  },
  preload: true
});


export const resources: ResourceBase[] = [
  '/background.jpg',
  '/bow.png',
  '/arrow.png',
  '/box.png',
  '/btn.png'
].map(r => convertToResourceBase(r));
