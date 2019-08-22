import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }

  h2 {
    margin: 10px 10px;
  }

  footer {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      margin: 0 10px;
      max-width: 60px;
    }

    button {
      border: 0;
      background-color: #715c91;
      color: #fff;
      font-size: 18px;
      border-radius: 3px;
      padding: 5px;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export default Container;
