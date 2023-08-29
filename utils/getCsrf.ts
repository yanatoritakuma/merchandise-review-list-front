export const createHeaders = async () => {
  const headers = new Headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf`, {
    credentials: "include",
  });
  const data = await response.json();
  headers.append("Content-Type", "application/json");
  headers.append("X-CSRF-Token", data.csrf_token);
  // document.cookie = `_csrf=${data.csrf_token}`;
  // document.cookie = `token=${data.token}`;
  // todo: 下記のようにtokenを直書きで設定すれば本番環境のサーバーからでもログイン可能
  // document.cookie = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyNzI3NzAsInVzZXJfaWQiOjF9.HyiXTyndMqLIydWTB31OQq-jGNxiZ_Px3rUy-mqyHZo`;
  headers.append("Cookie", `_csrf=${data.csrf_token}`);
  headers.append("Accept", "application/json, text/plain, */*");
  return headers;
};
