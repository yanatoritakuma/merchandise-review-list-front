import Image from "next/image";
import { css } from "@emotion/react";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { ProfileSkeleton } from "@/components/mypage/profileSkeleton";
import NoImage from "@/images/noimage-user.png";
import { UserEditMenu } from "@/components/mypage/userEditMenu";

export const Profile = () => {
  const { data, isLoading } = useQueryUser();

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
  };

  return !isLoading ? (
    <section css={profile}>
      {data?.id !== undefined ? (
        <>
          <div className="profile__imgBox">
            {data.image !== "" ? (
              <Image
                src={data?.image}
                width={80}
                height={80}
                alt="プロフィール画像"
              />
            ) : (
              <Image
                src={NoImage}
                width={80}
                height={80}
                alt="プロフィール画像"
              />
            )}
            <h4>{data?.name}</h4>
            <div className="profile__editIcon">
              <UserEditMenu />
            </div>
          </div>
          <span className="profile__useDate">
            {formatDate(data?.created_at)}から利用しています
          </span>
        </>
      ) : (
        <>
          <h4>ログインしていません。</h4>
        </>
      )}
    </section>
  ) : (
    <ProfileSkeleton />
  );
};

const profile = css`
  .profile__imgBox {
    display: flex;
    align-items: center;
    position: relative;

    h4 {
      margin-left: 18px;

      @media (max-width: 425px) {
        max-width: 120px;
      }
    }

    img {
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .profile__useDate {
    margin: 20px 0;
    display: block;
    color: #aaa;
    font-size: 14px;
  }

  .profile__editIcon {
    position: absolute;
    right: -14px;
  }
`;
