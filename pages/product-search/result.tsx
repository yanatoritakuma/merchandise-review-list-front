import { TYahooProducts } from "@/types/yahoo";
import type { GetServerSideProps } from "next";

type Props = {
  data: TYahooProducts;
};

const Result = ({ data }: Props) => {
  return (
    <section>
      <h2>検索結果</h2>
      {data.hits.map((v, index) => (
        <div key={index}>
          <h2>{v.name}</h2>
        </div>
      ))}
    </section>
  );
};

export default Result;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.query.search;
  const page = context.query.page;

  const res = await fetch(
    `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${process.env.NEXT_PUBLIC_YAHOO_API_URL}&query=${search}&start=${page}`
  );
  const data = await res.json();
  return { props: { data } };
};
