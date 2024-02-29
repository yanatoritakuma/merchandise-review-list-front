import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ItemCart } from "@/components/mypage/itemCart";
import { useQueryUserProductTimeLimitAll } from "@/hooks/product/useQueryUserProductTimeLimitAll";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";
import { RadioBox } from "@/components/elements/radioBox";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeLimitSort, setTimeLimitSort] = useState("new");
  const { data: productTimeLimit, refetch } = useQueryUserProductTimeLimitAll(
    currentPage,
    10,
    timeLimitSort === "new" ? true : false
  );
  const initialMoreTextFlags = Array.from({ length: 20 }, () => false);
  //   todo:共通化したい
  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, timeLimitSort]);

  return (
    <main css={productTimeLimitBox}>
      <div className="productTimeLimitBox__box">
        <h2>購入期日設定済みの商品</h2>
        <div>
          <RadioBox
            labels={["近い期日順", "遠い期日順"]}
            radioValues={["new", "old"]}
            value={timeLimitSort}
            onChange={(e) => setTimeLimitSort(e.target.value)}
          />
        </div>
        {productTimeLimit?.products?.map((product, index) => (
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
            productTimeLimit !== undefined
              ? productTimeLimit?.totalPageCount
              : 0
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
