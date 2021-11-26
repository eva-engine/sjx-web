import type { globalSocket } from ".";
import { MessageStruct, RoomStruct, ToBType } from "./define";

export type Actions = {
  [T in ToBType]: (this: typeof globalSocket, data: MessageStruct<T>) => void
}

export const Actions: Partial<Actions> = {
  [ToBType.Room]: function (struct: RoomStruct) {
    const room = struct.data;
  }
}