import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {RecoilRoot} from "recoil";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <RecoilRoot>
      {/*<CookiesProvider>*/}

      <div className="full-page" style={{
        // backgroundImage: `url(${background})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 색상 + 투명도 적용
        // opacity: 0.5,
      }}>
        <App/>
      </div>
      {/*</CookiesProvider>*/}
    </RecoilRoot>
    // </StrictMode>,
)
