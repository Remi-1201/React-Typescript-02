import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

// 全ユーザ一覧カスタムフック作成
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // データを取得する関数
  const getUsers = () => {
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

  // return文 = StateとgetUsers関数が他のコンポネントにも使えるように
  // returnがオブジェクトを返すようにという書き方
  return { getUsers, userProfiles, loading, error };
};
