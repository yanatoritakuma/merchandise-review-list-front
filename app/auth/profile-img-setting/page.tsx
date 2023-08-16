import { use } from "react";
import { fetchLoginUser } from "@/app/api/fetchLoginUser";
import ProfileImgSetting from "@/app/components/auth/profileImgSetting";
import "@/style/auth/profile-img-setting.scss";

export default function Page() {
  const loginUser = use(fetchLoginUser());

  return (
    <main className="profileImgSetting">
      <div className="profileImgSetting__box">
        <ProfileImgSetting loginUser={loginUser} />
      </div>
    </main>
  );
}
