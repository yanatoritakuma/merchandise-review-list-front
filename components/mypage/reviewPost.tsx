import { memo, useState } from "react";
import { useQueryUserReviewPost } from "@/hooks/review-post/useQueryUserReviewPost";
import { ItmeReviewPost } from "@/components/mypage/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";
import { ItemSkeleton } from "@/components/mypage/itemSkeleton";

export const ReviewPost = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userReviewPosts, isLoading } = useQueryUserReviewPost(
    currentPage,
    10
  );

  const countPages = (totalPage: number) => {
    const total = totalPage / 10;
    return Math.ceil(total);
  };

  if (isLoading) {
    return <ItemSkeleton />;
  }

  return (
    <section>
      {userReviewPosts?.reviewPosts.map((reviewPost) => (
        <ItmeReviewPost key={reviewPost.id} reviewPost={reviewPost} />
      ))}
      <PaginationBox
        count={countPages(
          userReviewPosts !== undefined ? userReviewPosts.totalPageCount : 0
        )}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
});

ReviewPost.displayName = "ReviewPost";
