import React, { useState, useCallback, useEffect } from "react";
import * as Styled from "./style";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import fecther from "../../utils/fetcher";

function Login() {
  const { data, error, revalidate, mutate } = useSWR(
    "http://localhost:3095/api/users",
    fecther
  );

  const [logInError, setLogInError] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = info;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !password) return;

      axios
        .post(
          "http://localhost:3095/api/users/login",
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          //revalidate();
          mutate(res.data, false);
        })
        .catch(() => {
          setLogInError(error.response?.data?.statusCode === 401);
          console.log("로그인 실패");
        });
    },
    [info]
  );

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setInfo({ ...info, [name]: value });
    },
    [info]
  );

  if (data) {
    //로그인 되어있는 경우
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

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
          <input type="password" name="password" onChange={onChange}></input>
        </label>

        <button>로그인</button>
        <div>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup">
            <span className="goLogin">회원가입 하러가기</span>
          </Link>
        </div>
      </form>
    </Styled.LoginContainer>
  );
}

export default Login;
