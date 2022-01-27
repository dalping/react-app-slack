import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import useInput from "../../hooks/useInput";
import * as Styled from "./style";
import useSWR from "swr";
import { Link, Redirect } from "react-router-dom";
import fetcher from "../../utils/fetcher";

function SignUp() {
  const { data, error, revalidate, mutate } = useSWR(
    "http://localhost:3095/api/users",
    fetcher
  );

  const [info, setInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [checkPassword, setCheckPassword] = useState(true);

  const { email, nickname, password, confirmPassword } = info;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !nickname || !password) {
        return;
      }

      if (password !== confirmPassword) {
        setCheckPassword(false);
        return;
      }

      axios
        .post("http://localhost:3095/api/users", {
          email,
          nickname,
          password,
        })
        .then(() => {})
        .catch(() => {});
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
    <Styled.SignUpContainer>
      <form className="signup" onSubmit={onSubmit}>
        <header>Sleact</header>
        <label>
          <span>이메일 주소</span>
          <input type="email" name="email" onChange={onChange}></input>
        </label>
        <label>
          <span>닉네임</span>
          <input name="nickname" onChange={onChange}></input>
        </label>
        <label>
          <span>비밀번호</span>
          <input type="password" name="password" onChange={onChange}></input>
        </label>
        <label>
          <span>비밀번호 확인</span>
          <input
            type="password"
            name="confirmPassword"
            onChange={onChange}
          ></input>
        </label>
        <div className="confirmMsg">
          {!nickname && <span>닉네임을 입력해주세요.</span>}
          {!password && <span>패스워드를 입력해주세요.</span>}
          {!email && <span>이메일을 입력해주세요.</span>}
          {checkPassword ? null : <span>비밀번호가 일치하지 않습니다.</span>}
        </div>
        <button>회원가입</button>
        <div>
          <span>이미 회원이신가요?</span>
          <Link to="/login">
            <span className="goLogin">로그인 하러가기</span>
          </Link>
        </div>
      </form>
    </Styled.SignUpContainer>
  );
}

export default SignUp;
