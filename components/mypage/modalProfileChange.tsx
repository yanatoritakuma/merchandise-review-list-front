import { memo, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useChangeImage } from "@/hooks/useChangeImage";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { useMutateUser } from "@/hooks/user/useMutateUser";
import { ButtonBox } from "@/components/elements/buttonBox";
import { ImageRegistration } from "@/utils/imageRegistration";
import { UserValidation } from "@/utils/validations/userValidation";
import { DeleteImgStorage } from "@/utils/deleteImgStorage";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalProfileChange = memo((props: Props) => {
  const { open, setOpen } = props;
  const { data: user } = useQueryUser();
  const { onClickRegistration } = ImageRegistration();
  const { updateUserMutation } = useMutateUser();
  const { deleteImg } = DeleteImgStorage();
  const [previewUrl, setPreviewUrl] = useState("");
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { accountRegisterValidation } = UserValidation();

  useEffect(() => {
    if (user !== undefined) {
      setPreviewUrl(user.image);
      setPhotoUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, open]);

  const registrationImage = async (file: string | null) => {
    try {
      if (user) {
        await updateUserMutation
          .mutateAsync({
            name: user.name,
            image: file ? file : user.image,
            email: user.email,
          })
          .then(
            () =>
              file &&
              user.image !== "" &&
              deleteImg(user.image, "userImages", user.id)
          );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!photoUrl) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const res = reader?.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    reader.readAsDataURL(photoUrl);

    return () => {
      reader = null;
    };
  }, [photoUrl]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={editBox}>
        <h3>プロフィール画像変更</h3>
        {previewUrl !== "" && (
          <div css={previewBox}>
            <Image src={previewUrl} fill sizes="100%" alt="プレビュー" />
          </div>
        )}
        <div className="profilePictureInBox__uploadIcon">
          <ButtonBox onChange={onChangeImageHandler} upload />
        </div>
        <ButtonBox
          onClick={() => {
            if (accountRegisterValidation(photoUrl)) {
              onClickRegistration(
                photoUrl,
                setPhotoUrl,
                setPreviewUrl,
                registrationImage
              );
              setOpen(false);
            }
          }}
          disabled={photoUrl === null}
        >
          変更
        </ButtonBox>
      </Box>
    </Modal>
  );
});

ModalProfileChange.displayName = "ModalProfileChange";

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

  .profilePictureInBox__uploadIcon {
    text-align: center;
    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const previewBox = css`
  margin: 12px auto;
  width: 260px;
  height: 250px;
  position: relative;

  @media (max-width: 425px) {
    width: 200px;
    height: 200px;
  }

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
