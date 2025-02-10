import seatAtom, {ISeat} from "./atom.ts";
import {selector} from "recoil";
import queryAtom from "../query";
import {selectedLabelState} from "./withLabelFilter.ts";
import {selectedTeamState} from "./withTeamFilter.ts";
import {selectedProjectState} from "./withProjectFilter.ts";

const filteredSeatState = selector<ISeat[]>({
  key: 'filteredSeatState',
  get: ({get}) => {
    const seatList = get(seatAtom);
    const query = get(queryAtom)?.query?.toLowerCase();
    const selectedLabel = get(selectedLabelState);
    const selectedTeam = get(selectedTeamState);
    const selectedProject = get(selectedProjectState);
    if (!query && !selectedLabel && !selectedTeam && !selectedProject){
      return [];
    }

    return seatList.filter(seat => {
      const name = seat?.user?.name?.toLowerCase() || "";
      const nickname = seat?.user?.nickname?.toLowerCase() || "";
      const team = seat?.user?.team;
      const project = seat?.user?.project;
      const userId = seat?.user?.userId;

      // Query 필터 (검색어 포함 여부)
      const matchesQuery = query ? (name.includes(query) || nickname.includes(query)) : true;

      // Label 필터 (선택된 라벨의 users에 포함 여부)
      const matchesLabel = selectedLabel ? selectedLabel.users.some(user => user.userId === userId) : true;

      // Team 필터 (선택된 팀과 일치 여부)
      const matchesTeam = selectedTeam ? team === selectedTeam : true;

      // Project 필터 (선택된 프로젝트와 일치 여부)
      const matchesProject = selectedProject ? project === selectedProject : true;

      return matchesQuery && matchesLabel && matchesTeam && matchesProject;
    });
  }
})

export default filteredSeatState;
