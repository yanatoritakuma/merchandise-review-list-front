import { memo, useEffect, useState } from "react";
import { useQueryUserLike } from "@/hooks/review-post/useQueryUserLike";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { ItemSkeleton } from "@/components/common/itemSkeleton";
import { ItmeReviewPost } from "@/components/common/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";

export const LikePost = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isFetching } = useQueryUserLike(
    currentPage,
    10
  );
  const { data: user } = useQueryUser();

  const countPages = (totalPage: number) => {
    const total = totalPage / 10;
    return Math.ceil(total);
  };

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
        <ItmeReviewPost
          key={reviewPost.id}
          reviewPost={reviewPost}
          user={user}
        />
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
