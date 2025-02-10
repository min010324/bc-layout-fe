import SeatSheet from "../component/SeatSheet.tsx";
import {useEffect} from "react";
import {API} from "../util/api.ts";
import {useRecoilState} from "recoil";
import seatAtom from "../recoil/seat";
import {ISeat} from "../recoil/seat/atom.ts";
import userAtom from "../recoil/user";
import labelAtom from "../recoil/label";


const SeatPage = () => {
  const [seat, setSeat] = useRecoilState(seatAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [label, setLabel] = useRecoilState(labelAtom);

  useEffect(() => {
    API.get("/seat").then(res => {
      const seatList: ISeat[] = res.data.map(seatInfo => {
        return {
          seatId: seatInfo.seatId,
          useYn: seatInfo.useYn,
          endDate: seatInfo.endDate,
          user: seatInfo.user
        }
      })
      console.log(seatList);
      setSeat(seatList);
    })

    API.get("/user").then(res => {
      setUser(res.data)
    })

    API.get("/label").then(res => {
      setLabel(res.data)
    })
  }, []);
  return (
      <>
        <div style={{
          overflowY: "scroll",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <SeatSheet seatList={seat}/>
        </div>
      </>
  )

}
export default SeatPage;
