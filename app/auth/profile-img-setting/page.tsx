import { fetchLoginUser } from "@/app/api/fetchLoginUser";
import ProfileImgSetting from "@/app/components/auth/profileImgSetting";
import "@/style/auth/profile-img-setting.scss";

export default async function Page() {
  const loginUser = await fetchLoginUser();

  return (
    <main className="profileImgSetting">
      <div className="profileImgSetting__box">
        <ProfileImgSetting loginUser={loginUser} />
      </div>
    </main>
  );
}
