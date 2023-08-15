"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TLoginUser } from "@/app/api/fetchLoginUser";
import { ButtonBox } from "../elements/buttonBox";
import { useRouter } from "next/navigation";
import { UserValidation } from "@/utils/validations/userValidation";
import { useChangeImage } from "@/app/hooks/useChangeImage";
import { ImageRegistration } from "@/utils/imageRegistration";

type Props = {
  loginUser: TLoginUser;
};

export default function ProfileImgSetting({ loginUser }: Props) {
  console.log("loginUser", loginUser);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState("");

  const { accountRegisterValidation } = UserValidation();
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { onClickRegistration } = ImageRegistration();

  const registrationImage = async (file: string | null) => {
    // try {
    //   if (user) {
    //     await updateUserMutation.mutateAsync({
    //       name: user.name,
    //       image: file ? file : user.image,
    //       email: user.email,
    //     });
    //     await router.push("/");
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
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
        <div>
          <Image src={previewUrl} fill alt="プレビュー" />
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
          }
        }}
        disabled={photoUrl === null}
      >
        プロフィール画像設定
      </ButtonBox>
      <ButtonBox onClick={() => router.push("/")}>今は設定しない</ButtonBox>
    </section>
  );
}
