import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../assets/style/login.css"
import SlackIcon from '../assets/image/slack_icon.svg';


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSuccessToLogin = params.get("redirectedFromSocialLogin");
    if (isSuccessToLogin === null) {
      return;
    }
    if (isSuccessToLogin === "true") {
      // const accessToken = getCookie("accessToken");
      const accessToken = params.get("accessToken");
      if(accessToken){
        localStorage.setItem('accessToken', accessToken);
      }
      navigate("/seat")
    } else {
      alert("로그인에 실패했습니다. 재시도해주세요");
    }
  }, []);

  return (
      <>
        <div className="login-page">
          <div className="login-container">
            <div className="title">
              빌드 센터 내 자리 배치 <br/>
              사물함 현황 관리 서비스
            </div>

            <div className="button-container">
              {/*<a href="https://slack.com/openid/connect/authorize?scope=openid&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fslack&amp;client_id=8309858670839.8309909022439">*/}
              {/*  <img src={SlackIcon as string} alt="slack-login-icon"/>*/}
              {/*  Sign in with Slack</a>*/}
              <a href="https://localhost:8080/oauth2/authorization/slack">
                {/*<a onClick={handleLogin}>*/}
                <img src={SlackIcon as string} alt="slack-login-icon"/>
                Sign in with Slack
              </a>
            </div>

          </div>
        </div>
      </>
  )

}
export default LoginPage;
