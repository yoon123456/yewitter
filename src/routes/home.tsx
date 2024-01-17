import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  console.log(auth.currentUser);
  const onClickLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button onClick={onClickLogout}>Logout</button>
      home
    </div>
  );
};

export default Home;
