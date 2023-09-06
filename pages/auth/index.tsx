import { Auth } from "@/components/auth/auth";
import { css } from "@emotion/react";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import Link from "next/link";

const Index = () => {
  const { data, isLoading } = useQueryUser();
  return (
    <main css={authBox}>
      <div className="auth__box">
        {data?.id !== undefined ? (
          <div className="auth__loggedIn">
            <h3>ログイン済みです。</h3>
            <Link prefetch={false} href="/">
              ホームへ
            </Link>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
};

export default Index;

const authBox = css`
  width: 100%;
  height: 100vh;
  background-color: #ffd900;

  .auth__box {
    margin: 0 auto;
    max-width: 1440px;
  }

  .auth__loggedIn {
    text-align: center;

    h3 {
      font-size: 40px;
    }

    a {
      text-decoration: none;
      color: #333;
    }
  }
`;
