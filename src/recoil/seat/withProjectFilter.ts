import seatAtom, {ISeat} from "./atom.ts";
import {atom, selector} from "recoil";

export type Project = "LAMF"|"AI"|"빌드센터 안마기계"|"빌드센터 좌석배치"|"NERP";


const selectedProjectState = atom<Project>({
  key: 'selectedProjectState',
  default: null
});

const projectSeatState = selector<ISeat[]>({
  key: 'projectSeatState',
  get: ({get}) => {
    const selectedProject = get(selectedProjectState);
    const seatList = get(seatAtom);

    if (!selectedProject) {
      return [];
    }
    return seatList.filter(seat => seat?.user?.project === selectedProject);
  }
})
export default projectSeatState;
export {selectedProjectState};
