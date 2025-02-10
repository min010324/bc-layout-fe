import {atom} from 'recoil';

export interface IUser {
  userId: number;
  name: string;
  nickname: string;
  email: string;
  role: string;
  team: string;
  project: string;
}


const userAtom = atom<IUser>({
  key: 'userAtom',
  default: null,
});

export default userAtom;
