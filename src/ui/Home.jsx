import ReturnToMenu from "./ReturnToMenu";
import CreateUser from "../features/user/CreateUser";
function Home() {
  return (
    <ReturnToMenu>
      <CreateUser />
    </ReturnToMenu>
  );
}

export default Home;
