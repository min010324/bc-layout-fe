import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./page/LoginPage.tsx";
import Layout from "./component/Layout.tsx";
import SeatPage from "./page/SeatPage.tsx";

function App() {
  const HeaderTitle = "빌드 센터 내 자리 배치 및 사물함 현황 관리 서비스 ";
  const FooterMessage = "This is the footer message for the entire app.";

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout title={HeaderTitle} footermessage={FooterMessage}
                                  menuList={[
                                    {name: "자리 배치도", toGo: "/seat"},
                                    {name: "사물함 배치도", toGo: "/storage"},
                                    {name: "내 정보", toGo: "/myPage"}]}
          />}>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/seat" element={<SeatPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
