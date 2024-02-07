import { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { useChangeImage } from "@/hooks/useChangeImage";
import { useRouter } from "next/router";
import { ButtonBox } from "@/components/elements/buttonBox";
import { ImageRegistration } from "@/utils/imageRegistration";
import { useMutateUser } from "@/hooks/user/useMutateUser";
import { UserValidation } from "@/utils/validations/userValidation";

const ProfileImgSetting = () => {
  const { data, isLoading } = useQueryUser();
  const { onClickRegistration } = ImageRegistration();
  const { updateUserMutation } = useMutateUser();
  const [previewUrl, setPreviewUrl] = useState("");
  const { onChangeImageHandler, photoUrl, setPhotoUrl } = useChangeImage();
  const { accountUpdateValidation } = UserValidation();
  const router = useRouter();

  const registrationImage = async (file: string | null) => {
    try {
      if (data) {
        await updateUserMutation.mutateAsync({
          name: data.name,
          image: file ? file : data.image,
          email: data.email,
        });
        await router.push("/");
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
    <main css={profilePictureBox}>
      {!isLoading ? (
        <>
          {data !== undefined && data.image === "" ? (
            <div css={profilePictureInBox}>
              <h2>アカウントを作成しました！</h2>
              <p>
                はじめまして、
                {data?.name}さん
              </p>
              <p>プロフィール画像の設定をしませんか？</p>
              {previewUrl !== "" && (
                <div css={previewBox}>
                  <Image src={previewUrl} fill alt="プレビュー" />
                </div>
              )}
              <div className="profilePictureInBox__uploadIcon">
                <ButtonBox onChange={onChangeImageHandler} upload />
              </div>
              <ButtonBox
                onClick={() => {
                  if (accountUpdateValidation(photoUrl)) {
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
              <ButtonBox onClick={() => router.push("/")}>
                今は設定しない
              </ButtonBox>
            </div>
          ) : (
            <h3>
              ログインしていないか
              <br />
              既にアカウントにプロフィール画像は設定済みです。
            </h3>
          )}
        </>
      ) : (
        <>
          <h2>アカウント確認中</h2>
          <p>しばらくお待ちください。</p>
        </>
      )}
    </main>
  );
};

export default ProfileImgSetting;

const profilePictureBox = css`
  margin: 100px auto;
  max-width: 1440px;
  width: 100%;

  h2 {
    text-align: center;

    @media (max-width: 425px) {
      font-size: 20px;
    }
  }

  h3 {
    padding: 20px;
    text-align: center;
  }

  p {
    text-align: center;
  }
`;

const profilePictureInBox = css`
  margin: 0 auto;
  width: 90%;
  max-width: 500px;

  button {
    margin: 20px auto;
    display: block;
    width: 200px;
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

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
