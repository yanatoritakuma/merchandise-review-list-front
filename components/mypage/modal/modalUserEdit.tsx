import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { useMutateUser } from "@/hooks/user/useMutateUser";
import { ButtonBox } from "@/components/elements/buttonBox";
import { UserValidation } from "@/utils/validations/userValidation";
import { TextBox } from "@/components/elements/textBox";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalUserEdit = memo(({ open, setOpen }: Props) => {
  const { data: user } = useQueryUser();
  const { updateUserMutation } = useMutateUser();
  const { accountRegisterValidation } = UserValidation();

  const [authStatte, setAuthStatte] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    if (user !== undefined) {
      setAuthStatte({
        ...authStatte,
        email: user.email,
        name: user.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, open]);

  const onClickUpDate = async () => {
    try {
      if (user) {
        await updateUserMutation.mutateAsync({
          name: authStatte.name,
          image: user.image,
          email: authStatte.email,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={editBox}>
        <h3>編集</h3>
        <div css={userInfoInputBox}>
          <TextBox
            className="text"
            label="メール"
            value={authStatte.email}
            onChange={(e) =>
              setAuthStatte({
                ...authStatte,
                email: e.target.value,
              })
            }
            fullWidth
          />
          <TextBox
            className="text"
            label="名前"
            value={authStatte.name}
            onChange={(e) =>
              setAuthStatte({
                ...authStatte,
                name: e.target.value,
              })
            }
            fullWidth
          />
        </div>
        <ButtonBox
          onClick={() => {
            if (accountRegisterValidation(null, authStatte)) {
              onClickUpDate();
              setOpen(false);
            }
          }}
        >
          更新
        </ButtonBox>
      </Box>
    </Modal>
  );
});

ModalUserEdit.displayName = "ModalUserEdit";

const editBox = css`
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
  }

  button {
    margin: 20px auto;
    display: block;
  }
`;

const userInfoInputBox = css`
  .text {
    margin: 20px 0;
    display: block;
  }
`;
