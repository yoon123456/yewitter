import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  width: 100%;
  color: black;
  background-color: white;
  font-weight: 600;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 50px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

const GoogleButton = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/google-mark.svg" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
