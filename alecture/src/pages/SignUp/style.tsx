import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .goLogin {
    margin-left: 5px;
    font-weight: 500;
    color: blue;
    cursor: pointer;
  }

  .confirmMsg {
    display: flex;
    flex-direction: column;
    color: red;
    gap: 5px;
  }

  form {
    display: flex;
    width: 70%;
    flex-direction: column;
    gap: 20px;

    header {
      font-size: 3rem;
      font-weight: 500;
      align-self: center;
    }

    button {
      background-color: purple;
      color: white;
      font-weight: 500;
      font-size: 1rem;
      padding: 15px;
      cursor: pointer;
      border-radius: 5px;
      border: 0px;
    }
    label {
      display: flex;
      gap: 8px;
      flex-direction: column;

      span {
        font-weight: 500;
      }

      input {
        padding: 10px;
      }
    }
  }
`;
