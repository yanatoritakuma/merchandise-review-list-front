import { SetStateAction, memo, useEffect, useState } from "react";
import { useQueryUserLike } from "@/hooks/review-post/useQueryUserLike";
import { ItemSkeleton } from "@/components/common/itemSkeleton";
import { ItmeReviewPost } from "@/components/common/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";
import { ModalComment } from "@/components/common/modalComment";

export const LikePost = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postId, setPostId] = useState<number | null>(null);
  const { data, isLoading, refetch, isFetching } = useQueryUserLike(
    currentPage,
    10
  );

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
          setCommentFlag={setPostId}
        />
      ))}
      <PaginationBox
        count={countPages(data !== undefined ? data.totalPageCount : 0)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalComment postId={postId} setPostId={setPostId} />
    </section>
  );
});

LikePost.displayName = "LikePost";
