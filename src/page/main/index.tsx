import { MutableRefObject, useEffect, useRef, useState } from "react";
import { globalSocket } from "../../net/socket";
import { RoomMode, RoomSize } from "../../net/socket/define";
import { GlobalUser } from "../../net/user";
import "./index.scss";

export function MainPage() {

  const [battlePage, setBattlePage] = useState(true);
  const [rank, setRank] = useState('Loading');

  useEffect(() => {
    const socket = globalSocket.ready();

  }, [])

  async function wantCreateRoom() {
    (await globalSocket.ready()).createRoom({
      mode: RoomMode.OneVsOne,
      size: RoomSize.Large
    });
  }
  async function wantQuickStart() {

  }

  return (
    <div className="main-page">
      <div className="header">
        <div className="nav">
          <div className={battlePage ? "item target" : "item"}>联机对战</div>
          <div className={battlePage ? "item" : "item target"}>排行榜</div>
        </div>
        <hr />
        <div className="title">闪箭侠</div>
        <div className="user-info">
          <span className="uname">{GlobalUser.uname}</span>
          <span className="divider"></span>
          <span className="rank">{rank}</span>
        </div>
      </div>
      <div className="home-list">
        {/* {new Array(50).fill({}).map((s) => (
          <div key={}>{s}</div>
        ))} */}
      </div>
      <div className="footer">
        <div className="item create-room-btn" onClick={wantCreateRoom}>创建房间</div>
        <div className="item quick-start-btn" onClick={wantQuickStart}>快速加入</div>
      </div>
    </div >
  );
}