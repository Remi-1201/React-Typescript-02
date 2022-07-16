import { Usercard } from "./components/UserCard";
import "./styles.css";
// カスタムフックを導入
import { useAllUsers } from "./hooks/useAllUsers";

export default function App() {
  // カスタムフックのStateと関数を受け取る
  const { getUsers, userProfiles, loading, error } = useAllUsers();
  // clickするときにgetUsers()を呼び出す
  const onClickFetchUser = () => getUsers();

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
