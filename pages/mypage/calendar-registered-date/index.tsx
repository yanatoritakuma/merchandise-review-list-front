import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { ItemCart } from "@/components/mypage/itemCart";
import { useQueryUserProductTimeLimitDate } from "@/hooks/product/useQueryUserProductTimeLimitDate";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";
import { convertDateText, convertDateUtc } from "@/utils/convertDate";

const Index = () => {
  const router = useRouter();
  const { date } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productDate, refetch } = useQueryUserProductTimeLimitDate(
    currentPage,
    10,
    convertDateUtc(String(date))
  );

  const initialMoreTextFlags = Array.from({ length: 20 }, () => false);
  //   todo:共通化したい
  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertDateUtc(String(date))]);

  return (
    <main css={productTimeLimitBox}>
      <div className="productTimeLimitBox__box">
        <h2>{convertDateText(Number(date))}までの期日商品一覧</h2>
        {productDate?.products?.map((product, index) => (
          <ItemCart
            key={index}
            product={product}
            index={index}
            refetch={refetch}
            moreTextFlag={moreTextFlag}
            setMoreTextFlag={setMoreTextFlag}
            displayRemainingFlag
          />
        ))}
        <PaginationBox
          count={countPages(
            productDate !== undefined ? productDate?.totalPageCount : 0
          )}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default Index;

const productTimeLimitBox = css`
  width: 100%;

  .productTimeLimitBox__box {
    margin: 60px auto;
    padding: 40px;
    max-width: 1200px;
    width: 94%;
    border: 4px solid #ffd900;
    border-radius: 10px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    @media (max-width: 425px) {
      padding: 12px;
    }

    h2 {
      text-align: center;
    }
  }
`;
