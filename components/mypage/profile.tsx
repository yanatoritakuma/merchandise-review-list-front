import { useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { ProfileSkeleton } from "@/components/mypage/profileSkeleton";
import NoImage from "@/images/noimage-user.png";
import Badge from "@mui/material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UserEditMenu } from "@/components/mypage/userEditMenu";
import { TabsBox } from "@/components/elements/tabsBox";
import { Cart } from "@/components/mypage/cart";
import { ReviewPost } from "@/components/mypage/reviewPost";
import { LikePost } from "@/components/mypage/likePost";
import { useQueryUserProductTimeLimit } from "@/hooks/product/useQueryUserProductTimeLimit";
import { ModalCalendarRegistered } from "@/components/mypage/modal/modalCalendarRegistered";

export const Profile = () => {
  const { data: user, isLoading } = useQueryUser();
  const { data: productTimeLimit } = useQueryUserProductTimeLimit(1, 10);

  console.log("productTimeLimit", productTimeLimit);

  const [selectTab, setSelectTab] = useState(0);
  const [modalCalendarRegisteredFlag, setModalCalendarRegisteredFlag] =
    useState(false);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
  };

  const selectOpneProduct = (tab: number) => {
    switch (tab) {
      case 0:
        return <Cart />;

      case 1:
        return <ReviewPost />;
      case 2:
        return <LikePost />;
      default:
        return "カート";
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <section css={profile}>
      {user?.id !== undefined ? (
        <>
          <div className="profile__imgBox">
            {user.image !== "" ? (
              <Image
                src={user?.image}
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
            <h4>{user?.name}</h4>
            <div className="profile__editIcon">
              <UserEditMenu />
              <span onClick={() => setModalCalendarRegisteredFlag(true)}>
                <Badge
                  badgeContent={productTimeLimit?.totalPageCount}
                  color="error"
                >
                  <CalendarMonthIcon className="profile__calendarIcon" />
                </Badge>
              </span>
            </div>
          </div>
          <span className="profile__useDate">
            {formatDate(user?.created_at)}から利用しています
          </span>
          <div>
            <div css={tabBox}>
              <TabsBox
                labels={["カート", "投稿", "いいね"]}
                selectTab={selectTab}
                setSelectTab={setSelectTab}
              />
            </div>
            <div>{selectOpneProduct(selectTab)}</div>
          </div>
        </>
      ) : (
        <>
          <h4>ログインしていません。</h4>
        </>
      )}
      <ModalCalendarRegistered
        open={modalCalendarRegisteredFlag}
        setOpen={() => setModalCalendarRegisteredFlag(false)}
        productTimeLimit={productTimeLimit}
      />
    </section>
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
    display: flex;
    align-items: center;
  }

  .profile__calendarIcon {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
`;

const tabBox = css`
  margin: 32px auto;
  display: block;
`;
