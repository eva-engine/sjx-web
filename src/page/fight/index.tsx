import "./index.scss";
import { useHistory } from "react-router";
import { MutableRefObject, useEffect, useRef } from "react";
import { RoomStruct } from "../../net/socket/define";
import { SingleGame } from "../../game/SingleGame";
export function FightPage() {

  const history = useHistory();

  const canvas = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const struct = history.location.state as RoomStruct;
    const game = new SingleGame(struct, canvas.current!);
    return () => {
      game.destroy();
    }
  }, []);

  return (
    <div className="fight-page">
      <canvas ref={canvas as MutableRefObject<HTMLCanvasElement>} className="fight-canvas"></canvas>
    </div>
  )
}