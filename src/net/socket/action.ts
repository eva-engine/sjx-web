import type { globalSocket } from ".";
import { MessageStruct, ToBType } from "./define";

export const Actions: Partial<Record<ToBType, (this: typeof globalSocket, data: MessageStruct<ToBType>) => void>> = {
  [ToBType.Room]: function () {
    
  }
}