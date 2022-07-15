import axios from "axios";
import { Usercard } from "./components/UserCard";
import "./styles.css";

// propsのuserに情報を渡す
const user = {
  id: 1,
  name: "Usachan",
  email: "usagi@suki.com",
  address: "USALAND"
};

export default function App() {
  const onClickFetchUser = () => {
    axios.get("https://jsonplaceholder.typicode.com/users");
  };
  return (
    <div className="App">
      {/* APIデータを取得するボタン */}
      <button onClick={onClickFetchUser}>Get data</button>
      <Usercard user={user} />
    </div>
  );
}
