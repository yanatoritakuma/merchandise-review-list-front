import { memo, useEffect, useState } from "react";
import { useQueryUserLike } from "@/hooks/review-post/useQueryUserLike";
import { ItemSkeleton } from "@/components/common/itemSkeleton";
import { ItmeReviewPost } from "@/components/common/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";
import { countPages } from "@/utils/countPages";

export const LikePost = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isFetching } = useQueryUserLike(
    currentPage,
    10
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (isLoading || isFetching) {
    return <ItemSkeleton />;
  }

  return (
    <section>
      {data?.reviewPosts.map((reviewPost) => (
        <ItmeReviewPost key={reviewPost.id} reviewPost={reviewPost} />
      ))}
      <PaginationBox
        count={countPages(data !== undefined ? data.totalPageCount : 0)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
});

LikePost.displayName = "LikePost";
