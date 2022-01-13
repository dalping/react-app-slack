import React from "react";
import * as Styled from "./style";
import { Link } from "react-router-dom";

function Login() {
  const onSubmit = () => {};
  const onChange = () => {};
  return (
    <Styled.LoginContainer>
      <form className="signup" onSubmit={onSubmit}>
        <header>Sleact</header>
        <label>
          <span>아이디</span>
          <input type="email" name="email" onChange={onChange}></input>
        </label>
        <label>
          <span>비밀번호</span>
          <input name="password" onChange={onChange}></input>
        </label>

        <button>로그인</button>
        <div>
          <span>아직 계정이 없으신가요?</span>
          <Link to="/signup">
            <span className="goLogin">회원가입 하러가기</span>
          </Link>
        </div>
      </form>
    </Styled.LoginContainer>
  );
}

export default Login;
