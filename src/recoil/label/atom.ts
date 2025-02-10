import {atom} from 'recoil';
import {IUser} from "../user/atom.ts";

export interface ILabel {
  labelId?:number;
  name: string;
  // color: string; // todo
  users: IUser[];
}


const labelAtom = atom<ILabel[]>({
  key: 'labelAtom',
  default: [],
});

export default labelAtom;
