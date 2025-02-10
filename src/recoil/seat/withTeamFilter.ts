import seatAtom, {ISeat} from "./atom.ts";
import {atom, selector} from "recoil";

export type Team = "Advanced Build" |"클라우드데브옵스개발" |"클라우드네이티브개발" |"모바일개발" |"슈퍼앱개발" |"모바일서비스개발" |"플랫폼엔지니어링" |"모던애플리케이션리드" |"AX리드" |"AM Innovation" |"글로벌 Discovery";


const selectedTeamState = atom<Team>({
  key: 'selectedTeamState',
  default: null
});

const teamSeatState = selector<ISeat[]>({
  key: 'teamSeatState',
  get: ({get}) => {
    const selectedTeam = get(selectedTeamState);
    const seatList = get(seatAtom);

    if (!selectedTeam) {
      return [];
    }
    return seatList.filter(seat => seat?.user?.team === selectedTeam);
  }
})
export default teamSeatState;
export {selectedTeamState};
