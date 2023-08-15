import Auth from "@/app/components/auth/auth";
import "@/style/auth/auth.scss";

export default function Page() {
  return (
    <main className="auth">
      <div className="auth__box">
        <Auth />
      </div>
    </main>
  );
}
