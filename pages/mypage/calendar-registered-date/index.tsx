import { useState } from "react";
import { css } from "@emotion/react";
import { ItemCart } from "@/components/mypage/itemCart";
import { useQueryUserProductTimeLimitDate } from "@/hooks/product/useQueryUserProductTimeLimitDate";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productDate, refetch } = useQueryUserProductTimeLimitDate(
    currentPage,
    10,
    // 登録した時の時間とDB保存の時間差があるので正しいデータ取得できない
    20240227
  );
  const initialMoreTextFlags = Array.from({ length: 20 }, () => false);
  //   todo:共通化したい
  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  return (
    <main css={productTimeLimitBox}>
      <div className="productTimeLimitBox__box">
        <h2>？？？？年？月？日までの期日商品一覧</h2>
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
