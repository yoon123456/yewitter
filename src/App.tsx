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
