import { memo, useContext, useEffect, useState } from "react";
import { useQueryUserReviewPost } from "@/hooks/review-post/useQueryUserReviewPost";
import { ItmeReviewPost } from "@/components/common/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";
import { ItemSkeleton } from "@/components/common/itemSkeleton";
import { ReviewPostContext } from "@/provider/reviewPostProvider";
import { useQueryUser } from "@/hooks/user/useQueryUser";

export const ReviewPost = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: userReviewPosts,
    isLoading,
    refetch,
    isFetching,
  } = useQueryUserReviewPost(currentPage, 10);
  const { data: user } = useQueryUser();
  const { reviewPostProcess, setReviewPostProcess } =
    useContext(ReviewPostContext);

  const countPages = (totalPage: number) => {
    const total = totalPage / 10;
    return Math.ceil(total);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    refetch();
    setReviewPostProcess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewPostProcess]);

  if (isLoading || isFetching) {
    return <ItemSkeleton />;
  }

  return (
    <section>
      {userReviewPosts?.reviewPosts.map((reviewPost) => (
        <ItmeReviewPost
          key={reviewPost.id}
          reviewPost={reviewPost}
          user={user}
        />
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
