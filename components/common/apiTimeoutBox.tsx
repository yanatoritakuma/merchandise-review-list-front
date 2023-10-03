import { memo, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import { BackdropContext } from "@/provider/backdropProvider";
import { ButtonBox } from "../elements/buttonBox";

export const ApiTimeoutBox = memo(() => {
  const router = useRouter();
  const { apiTimeOutFlag, setApiTimeOutFlag, backdropFlag, setBackdropFlag } =
    useContext(BackdropContext);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // タイムアウトを設定（3分間）
    const setAlertTimeout = () => {
      timeoutId = setTimeout(() => {
        if (backdropFlag) {
          setApiTimeOutFlag(true);
          setBackdropFlag(false);
        }
      }, 10000);
    };

    // データがロードされたらタイムアウトをクリア
    const clearAlertTimeout = () => {
      clearTimeout(timeoutId);
    };

    // コンポーネントのマウント時にタイムアウトを設定
    setAlertTimeout();

    // コンポーネントのアンマウント時にタイムアウトをクリア
    return () => {
      clearAlertTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backdropFlag]);

  const handleLinkClick = () => {
    router.push("/");
    setApiTimeOutFlag(false);
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <Modal open={apiTimeOutFlag}>
      <div css={apiTimeoutBox}>
        <h3>タイムアウト</h3>
        <p>
          初期起動に時間がかかる場合があります。
          <br />
          時間をおいてから再度、アクセスしてください。
        </p>
        <ButtonBox onClick={() => handleLinkClick()}>ホームへ</ButtonBox>
      </div>
    </Modal>
  );
});

ApiTimeoutBox.displayName = "ApiTimeoutBox";

const apiTimeoutBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;

  h3 {
    text-align: center;
    color: #e9546b;
  }

  p {
    text-align: center;
    line-height: 1.5em;
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;
