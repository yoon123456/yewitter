import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingScreen from "./component/loading-screen";
import { auth } from "./firebase";
import { router } from "./router/router";
import { GlobalStyles } from "./style/globalStyle";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;

// 비밀번호 변경 이메일 전송 기능 추가 해야함
