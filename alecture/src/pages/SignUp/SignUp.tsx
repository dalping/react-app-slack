import React, { useState, useCallback, useEffect } from "react";
import * as Styled from "./style";

function SignUp() {
  const [Info, setInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const { email, nickname, password, confirmPassword } = Info;

  useEffect(() => {
    console.log(Info);
  }, [Info]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //이메일, 닉네임, 패스워드, 패스워드 체크, 패스워드 일치여부 확인
      if (nickname.length === 0) {
      }
    },
    [Info]
  );

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setInfo({ ...Info, [name]: value });
    },
    [Info]
  );

  const confirmHandeler = () => {};

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
          <span>비밀번호가 일치하지 않습니다.</span>
          <span>닉네임을 입력해주세요.</span>
        </div>
        <button>회원가입</button>
        <div>
          <span>이미 회원이신가요?</span>
          <span className="goLogin">로그인 하러가기</span>
        </div>
      </form>
    </Styled.SignUpContainer>
  );
}

export default SignUp;
