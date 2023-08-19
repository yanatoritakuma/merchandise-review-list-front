import "@/style/auth/auth.scss";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";

export default async function Page() {
  const loginUser = await fetchLoginUser();
  return (
    <main className="auth">
      <div className="auth__box">
        <h2>{loginUser.name}</h2>
        <h2>{loginUser.id}</h2>
      </div>
    </main>
  );
}
