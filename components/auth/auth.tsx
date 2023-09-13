import { useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useMutateAuth } from "@/hooks/auth/useMutateAuth";

export const Auth = () => {
  const { loginMutation, registerMutation } = useMutateAuth();
  const router = useRouter();
  const [authState, setAuthState] = useState({
    mail: "",
    password: "",
    name: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const createAccount = async () => {
    try {
      await registerMutation.mutateAsync({
        email: authState.mail,
        password: authState.password,
        name: authState.name,
        image: "",
      });

      await loginMutation.mutateAsync({
        email: authState.mail,
        password: authState.password,
      });

      await router.push("/auth/profile-img-setting");
    } catch (err) {
      console.error(err);
    }
  };

  const onClickAuth = () => {
    if (isLogin) {
      loginMutation.mutate({
        email: authState.mail,
        password: authState.password,
      });
    } else {
      createAccount();
    }
  };

  return (
    <section css={authInputBox}>
      <h2>{isLogin ? "ログイン" : "新規登録"}</h2>
      <div className="authInputBox__inputBox">
        <TextBox
          label="メールアドレス"
          value={authState.mail}
          onChange={(e) =>
            setAuthState({
              ...authState,
              mail: e.target.value,
            })
          }
          className="authInputBox__input"
          fullWidth
        />
        <TextBox
          label="パスワード"
          value={authState.password}
          onChange={(e) =>
            setAuthState({
              ...authState,
              password: e.target.value,
            })
          }
          password
          className="authInputBox__input"
          fullWidth
        />
        {!isLogin && (
          <TextBox
            label="名前"
            value={authState.name}
            onChange={(e) =>
              setAuthState({
                ...authState,
                name: e.target.value,
              })
            }
            className="authInputBox__input"
            fullWidth
          />
        )}

        <span
          className="authInputBox__text"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "アカウントをまだ作成ではない方はこちら"
            : "アカウントをお持ちの方はこちら"}
        </span>
        <ButtonBox onClick={() => onClickAuth()}>
          {isLogin ? "ログイン" : "登録"}
        </ButtonBox>
      </div>
    </section>
  );
};

const authInputBox = css`
  h2 {
    text-align: center;
    font-size: 46px;
  }
  .authInputBox__inputBox {
    margin: 0 auto;
    padding: 40px;
    background-color: #fffff9;
    border-radius: 10px;
    width: 60%;
    min-width: 300px;

    @media (max-width: 768px) {
      padding: 18px;
    }

    button {
      margin: 40px auto;
      display: block;
      width: 50%;
    }
  }

  .authInputBox__input {
    margin: 20px 0;
  }

  .authInputBox__text {
    margin: 20px 0;
    display: block;
    color: #aaa;
    cursor: pointer;
    width: fit-content;
  }
`;
