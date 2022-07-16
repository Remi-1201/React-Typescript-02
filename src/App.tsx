import axios from "axios";
import { Usercard } from "./components/UserCard";
import "./styles.css";
// types/api/user.tsで指定した配列のUser型をaxiosに渡す
import { User } from "./types/api/user";
// useStateを使って、axiosで取得したデータをコンポネントのUserCardに渡す
import { useState } from "react";
// types/userProfile.tsで指定した配列のUserProfile型をuseStateに渡す
import { UserProfile } from "./types/userProfile";

export default function App() {
  //  UserProfile の配列を useState で定義
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  // loadingのフラグ、初期値 = false
  const [loading, setLoading] = useState(false);
  // エラーがあるかどうかを判定するState
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    // clickした時にloadingの状態がtrueになる
    setLoading(true);
    setError(false);

    // get<Array<User>> = types/api/user.tsで指定した配列のUser型をaxiosに渡す
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // APIから取得したデータの各要素(user)を処理する関数
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      // catch() = エラーがある時の処理
      .catch(() => {
        setError(true);
      })
      // tsconfig.jsonにある"es2015"を"es2018"に変更すると、finally()も使えるようになる
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      {/* APIデータを取得するボタン */}
      <button onClick={onClickFetchUser}>Get data</button>
      <br />
      {/* {error ? (エラーがある時) : (エラーがない時)} */}
      {error ? (
        <p style={{ color: "red" }}>Some API errors occurred</p>
      ) : loading ? (
        <p>Loading ... </p>
      ) : (
        // エラーでもloadingでもない場合
        <>
          {userProfiles.map((user) => (
            <Usercard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
