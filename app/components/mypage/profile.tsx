import Image from "next/image";
import "@/style/mypage/mypage.scss";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";

export default async function Profile() {
  const loginUser = await fetchLoginUser();

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
  };

  return (
    <section className="profile">
      <div className="profile__imgBox">
        <Image
          src={loginUser.image}
          width={80}
          height={80}
          alt="プロフィール画像"
        />
        <h4>{loginUser.name}</h4>
      </div>
      <span className="profile__useDate">
        {formatDate(loginUser.created_at)}から利用しています
      </span>
    </section>
  );
}