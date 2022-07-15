// React.VFC = 関数コンポネントを定義するための型
// - React.FCと異なり、childrenは含まれないので、
// - 未定義の状態でchildrenを渡すとerrorを出してくれる
import { VFC } from "react";
import { UserProfile } from "../types/userProfile";

// types/userProfile.tsで指定した
// - UserProfileの型をPropsに渡す
type Props = {
  user: UserProfile;
};

// VFC<Props>  = Usercard関数 にPropsの型を渡す
export const Usercard: VFC<Props> = (props) => {
  const { user } = props;

  // カードのスタイルを設定
  const style = {
    border: "solid 1px #ccc",
    bordeRadius: "8px",
    padding: "0 16px",
    margin: "8px"
  };

  return (
    <div style={style}>
      <dl>
        <dt>Name</dt>
        <dd>{user.name}</dd>
        <dt>Mail</dt>
        <dd>{user.email}</dd>
        <dt>Address</dt>
        <dd>{user.address}</dd>
      </dl>
    </div>
  );
};
