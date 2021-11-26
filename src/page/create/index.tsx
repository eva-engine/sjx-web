import { useHistory } from "react-router";
import { globalSocket } from "../../net/socket";
import { RoomMode, RoomOptions, RoomSize, RoomStruct, ToBType } from "../../net/socket/define";
import "./index.scss";

const RoomConfig: Partial<RoomOptions>[] = [
  {
    lock: true
  },
  {
    mode: RoomMode.MultiVsMulti,
    size: RoomSize.Small,
    lock: true,
    limit: 10
  },
  {
    mode: RoomMode.MultiVsMulti,
    size: RoomSize.Middle,
    lock: true,
    limit: 10
  },
  {
    mode: RoomMode.MultiVsMulti,
    size: RoomSize.Large,
    lock: true,
    limit: 10
  }
]

export function CreateRoomPage() {

  const history = useHistory();

  async function wantCreateRoom(index: number) {
    (await globalSocket.ready()).createRoom(RoomConfig[index]);
    globalSocket.once(`msg_${ToBType.Room}`, (struct: RoomStruct) => {
      history.push({
        pathname: '/fight',
        state: struct
      });
    })
  }

  return (
    <div className="create-room-page">
      <div className="wrap">
        <div className="item" onClick={() => wantCreateRoom(0)}>1V1模式</div>
        <div className="item" onClick={() => wantCreateRoom(1)}>5V5模式,小地图</div>
        <div className="item" onClick={() => wantCreateRoom(2)}>5V5模式,中地图</div>
        <div className="item" onClick={() => wantCreateRoom(3)}>5V5模式,大地图</div>
      </div>
    </div>
  )
}