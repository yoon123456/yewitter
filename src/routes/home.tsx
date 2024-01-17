import { auth } from "../firebase";

const Home = () => {
  const onClickLogout = () => {
    auth.signOut;
  };
  return (
    <div>
      <button onClick={onClickLogout}>Logout</button>
      home
    </div>
  );
};

export default Home;
