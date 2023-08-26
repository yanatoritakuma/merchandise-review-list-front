"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/style/product-search/productSearch.scss";
import { TextBox } from "@/app/components/elements/textBox";
import { ButtonBox } from "@/app/components/elements/buttonBox";

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <section className="">
      <TextBox
        label="商品検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ButtonBox
        onClick={() => router.push(`/product-search/${search}?page=1`)}
      >
        検索
      </ButtonBox>
    </section>
  );
}
