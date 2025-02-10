import {atom} from 'recoil';

export interface IQuery {
  query: string;
}


const queryAtom = atom<IQuery>({
  key: 'queryAtom',
  default: {query: ""},
});

export default queryAtom;
