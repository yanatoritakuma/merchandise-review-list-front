"use client";

import { useState } from "react";
import { createHeaders } from "@/utils/getCsrf";

export default function Auth() {
  const [authState, setAuthState] = useState({
    mail: "",
    password: "",
    name: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const email = authState.mail;
  const password = authState.password;
  const name = authState.name;

  const handleSubmit = async () => {
    const headers = await createHeaders();
    if (isLogin) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password }),
        cache: "force-cache",
        credentials: "include",
      });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password, name }),
        cache: "force-cache",
        credentials: "include",
      });
    }
  };

  const getPost = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "force-cache",
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <section>
      <span>mail</span>
      <input
        type="text"
        value={authState.mail}
        onChange={(e) =>
          setAuthState({
            ...authState,
            mail: e.target.value,
          })
        }
      />
      <span>password</span>
      <input
        type="text"
        value={authState.password}
        onChange={(e) =>
          setAuthState({
            ...authState,
            password: e.target.value,
          })
        }
      />
      <span>name</span>
      <input
        type="text"
        value={authState.name}
        onChange={(e) =>
          setAuthState({
            ...authState,
            name: e.target.value,
          })
        }
      />
      <button onClick={() => handleSubmit()}>実行</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "アカウント作成" : "ログイン"}
      </button>
      <button onClick={() => getPost()}>get</button>
    </section>
  );
}
