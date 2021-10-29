import { ImmediateStorager } from "./core";
type StorageConfig = {
  token?: string
}
const defaultStorageConfig = {
  token: undefined
}
export const storager = new ImmediateStorager<StorageConfig>('www.anxyser.xyz:sjx', defaultStorageConfig);
export const storage = storager.getValue();
export const originalStorage = storager.getBaseValue();