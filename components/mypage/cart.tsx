import { useEffect, useState } from "react";
import { PaginationBox } from "@/components/common/paginationBox";
import { useQueryUserProduct } from "@/hooks/product/useQueryUserProduct";
import { ItemCart } from "./itemCart";
import { ItemSkeleton } from "@/components/common/itemSkeleton";
import { countPages } from "@/utils/countPages";

export const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
    refetch,
  } = useQueryUserProduct(currentPage, 10);

  const initialFlagCount = 20;

  const initialMoreTextFlags = Array.from(
    { length: initialFlagCount },
    () => false
  );

  //   todo:共通化したい
  const [moreTextFlag, setMoreTextFlag] = useState(initialMoreTextFlags);

  useEffect(() => {
    refetch();
    setMoreTextFlag(initialMoreTextFlags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (isLoading || isFetching) {
    return <ItemSkeleton />;
  }

  return (
    <div>
      {products?.products.map((pr, index) => (
        <ItemCart
          key={index}
          product={pr}
          index={index}
          refetch={refetch}
          moreTextFlag={moreTextFlag}
          setMoreTextFlag={setMoreTextFlag}
        />
      ))}
      <PaginationBox
        count={countPages(
          products !== undefined ? products?.totalPageCount : 0
        )}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
