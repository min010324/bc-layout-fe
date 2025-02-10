import seatAtom, {ISeat} from "./atom.ts";
import {atom, selector} from "recoil";
import {ILabel} from "../label/atom.ts";

const selectedLabelState = atom<ILabel>({
  key: 'selectedLabelState',
  default: null
});

const labeledSeatState = selector<ISeat[]>({
  key: 'labeledSeatState',
  get: ({get}) => {
    const selectedLabel = get(selectedLabelState);
    const seatList = get(seatAtom);

    if (!selectedLabel) {
      return [];
    }
    return seatList.filter(seat =>
        selectedLabel?.users?.some(user => user?.userId === seat?.user?.userId)
    );
  }
})
export default labeledSeatState;
export {selectedLabelState};
