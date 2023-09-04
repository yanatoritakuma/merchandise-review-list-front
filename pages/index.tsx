import { css } from "@emotion/react";
import Image from "next/image";

export default function Home() {
  return (
    <main css={mainBox}>
      <h1>aaaa</h1>
    </main>
  );
}

const mainBox = css`
  h2 {
    margin: 30px 0;
    text-align: center;
  }
`;
