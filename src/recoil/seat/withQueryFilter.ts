import seatAtom, {ISeat} from "./atom.ts";
import {selector} from "recoil";
import queryAtom from "../query";

const queriedSeatState = selector<ISeat[]>({
  key: 'queriedSeatState',
  get: ({get}) => {
    const query = get(queryAtom);
    const seatList = get(seatAtom);
    const target = query?.query?.toLowerCase();
    if (!target) {
      return [];
    }
    return seatList.filter(seat => {
      const name = seat?.user?.name?.toLowerCase() || "";
      const nickname = seat?.user?.nickname?.toLowerCase() || "";
      return name.includes(target) || nickname.includes(target);
    });
  }
})

export default queriedSeatState;
