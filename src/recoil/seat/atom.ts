import {atom} from 'recoil';
import {IUser} from "../user/atom.ts";

export interface ISeat {
  seatId: number;
  useYn: boolean;
  endDate: string; //todo 추후 변경
  user: IUser
}


const seatAtom = atom<ISeat[]>({
  key: 'seatAtom',
  default: [],
});

export default seatAtom;
