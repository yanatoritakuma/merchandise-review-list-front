import { headers, cookies } from "next/headers";
import Image from "next/image";
import "@/style/mypage/mypage.scss";
import { getAllCookies } from "@/utils/getAllCookies";
import ProfileSc from "@/app/components/mypage/profileSc";

// import { fetchLoginUser } from "@/app/api/fetchLoginUser";

type TLoginUser = {
  admin: boolean;
  created_at: string;
  email: string;
  id: number;
  image: string;
  name: string;
};

async function fetchLoginUser() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const headersList = headers();
  const token = headersList.get("cookie");
  const cookieStore = cookies();
  const Csrf = cookieStore.get("_csrf");
  const Token = cookieStore.get("token");

  const cookie = getAllCookies();
  const options: RequestInit = {
    headers: {
      cookie,
    },
    method: "GET",
    cache: "no-store",
    credentials: "include",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, options);

  const user: TLoginUser = await res.json();

  return user;
}

export default async function Profile() {
  const loginUser = await fetchLoginUser();
  const headersList = headers();
  const tokenHeadersList = headersList.get("cookie");

  const cookieStore = cookies();
  const Token = cookieStore.get("token");

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
  };

  return (
    <section className="profile">
      {loginUser.id !== undefined ? (
        <>
          <div className="profile__imgBox">
            <Image
              src={loginUser.image}
              width={80}
              height={80}
              alt="プロフィール画像"
            />
            <h4>{loginUser.name}</h4>
            <h4>headersList:{headersList}</h4>
          </div>
          <span className="profile__useDate">
            {formatDate(loginUser.created_at)}から利用しています
          </span>
          <h4>TokenHeadersList:{tokenHeadersList}</h4>
          <h4>Token:{Token?.value}</h4>
        </>
      ) : (
        <>
          <h4>ログインしていません。</h4>
          <h4>TokenHeadersList:{tokenHeadersList}</h4>
          <h4>header:{headersList}</h4>
          <h4>Token:{Token?.value}</h4>
        </>
      )}
      <ProfileSc />
    </section>
  );
}
