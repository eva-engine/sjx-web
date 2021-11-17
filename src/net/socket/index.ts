import { storage } from "../../storage";
import { Actions } from "./action";
import { CreateStruct, MessageStruct, RoomOptions, ToBType, ToSType } from "./define";

const WSBASE_URL = import.meta.env.VITE_WS_DOMAIN as string;
export const globalSocket = new class {
  socket?: WebSocket

  get linking() {
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }
  async ready() {
    return this.linking ? this : this.init();
  }
  async init(): Promise<this> {
    const socket = this.socket = new WebSocket(`${WSBASE_URL}?token=${storage.token}`);

    return await new Promise((resolve, reject) => {
      socket.onopen = () => resolve(this);
      socket.onmessage = e => {
        try {
          const struct = JSON.parse(e.data) as MessageStruct<ToBType>;
          console.log(struct);
          Actions[struct.type]?.call(this, struct);
        } catch (e) {
          console.error(e);
        }
      }
      socket.onerror = (e) => reject(e);
    })
  }

  send<T extends MessageStruct<ToSType>>(m: T) {
    this.socket?.send(JSON.stringify(m));
  }

  async createRoom(config: Partial<RoomOptions>) {
    this.send<CreateStruct>({
      type: ToSType.Create,
      data: {
        options: config,
        playerConfig: {
          hp: 100,
          atk: 10
        }
      }
    });
  }

  // async 

}();
