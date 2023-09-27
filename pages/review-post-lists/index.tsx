import { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useQueryReviewPostList } from "@/hooks/review-post/useQueryReviewPostList";
import { ItmeReviewPost } from "@/components/common/itmeReviewPost";
import { PaginationBox } from "@/components/common/paginationBox";
import { TextBox } from "@/components/elements/textBox";
import { ButtonBox } from "@/components/elements/buttonBox";
import { ReviewPostContext } from "@/provider/reviewPostProvider";
import { ItemSkeleton } from "@/components/common/itemSkeleton";

const Index = () => {
  const { reviewPostProcess, setReviewPostProcess } =
    useContext(ReviewPostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");
  const { data, refetch, isLoading, isFetching } = useQueryReviewPostList(
    searchCategory === "" ? "all" : searchCategory,
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

  useEffect(() => {
    refetch();
    setReviewPostProcess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewPostProcess]);

  if (isLoading || isFetching) {
    return <ItemSkeleton />;
  }

  return (
    <main css={reviewPostListsBox}>
      <div className="reviewPostListsBox__box">
        <h2>レビュー投稿一覧</h2>
        <div className="reviewPostListsBox__searchBox">
          <TextBox
            label="カテゴリー"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
          <ButtonBox onClick={() => refetch()}>絞り込む</ButtonBox>
        </div>
        <div>
          {data?.reviewPosts.map((reviewPost) => (
            <ItmeReviewPost key={reviewPost.id} reviewPost={reviewPost} />
          ))}
          <PaginationBox
            count={countPages(data !== undefined ? data.totalPageCount : 0)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Index;

const reviewPostListsBox = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffd900;

  .reviewPostListsBox__box {
    margin: 0 auto;
    padding: 40px;
    max-width: 1440px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    h2 {
      font-size: 28px;
      text-align: center;
    }
  }

  .reviewPostListsBox__searchBox {
    display: flex;
    button {
      margin-left: 24px;
    }
  }
`;
