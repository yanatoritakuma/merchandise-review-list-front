"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { TLoginUser } from "@/app/api/fetchLoginUser";
import { ButtonBox } from "../elements/buttonBox";
import { useRouter } from "next/navigation";
import { UserValidation } from "@/utils/validations/userValidation";
import { useChangeImage } from "@/app/hooks/useChangeImage";
import { ImageRegistration } from "@/utils/imageRegistration";
import { MessageContext } from "@/app/provider/messageProvider";
import { createHeaders } from "@/utils/getCsrf";

type Props = {
  loginUser: TLoginUser;
};

export default function ProfileImgSetting({ loginUser }: Props) {
  console.log("loginUser", loginUser);
  const router = useRouter();
  const { message, setMessage } = useContext(MessageContext);
  const [previewUrl, setPreviewUrl] = useState("");

  const { accountRegisterValidation } = UserValidation();
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = ImageRegistration();

  const registrationImage = async (file: string | null) => {
    const headers = await createHeaders();
    console.log("headers", headers);

    const name = loginUser.name;
    const email = loginUser.email;
    const image = file;

    try {
      if (loginUser.id !== undefined) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({ name, email, image }),
          cache: "force-cache",
          credentials: "include",
        });

        if (res.ok) {
          router.push("/");
          router.refresh();
          setMessage({
            ...message,
            text: "プロフィール画像の設定をしました。",
            type: "success",
          });
        } else {
          setMessage({
            ...message,
            text: "プロフィール画像の設定に失敗しました。",
            type: "error",
          });
        }
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
    <section className="profileImgSettingBox">
      <h2>プロフィール画像設定</h2>
      <p>
        はじめまして。
        <br />
        {loginUser.name}さん
      </p>
      <p>プロフィール画像の設定をしますか？</p>
      {previewUrl !== "" && (
        <div className="profileImgSettingBox__preview">
          <Image src={previewUrl} width={240} height={240} alt="プレビュー" />
        </div>
      )}
      <div className="profilePictureInBox__uploadIcon">
        <ButtonBox onChange={onChangeImageHandler} upload />
      </div>
      <div className="profilePictureInBox__footBtnBox">
        <ButtonBox
          onClick={() => {
            if (accountRegisterValidation(photoUrl)) {
              onClickRegistration(
                photoUrl,
                setPhotoUrl,
                setPreviewUrl,
                registrationImage
              );
            }
          }}
          disabled={photoUrl === null}
        >
          プロフィール画像設定
        </ButtonBox>
        <ButtonBox onClick={() => router.push("/")}>今は設定しない</ButtonBox>
      </div>
    </section>
  );
}
