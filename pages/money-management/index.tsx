import { useQueryGetMyMoneyManagements } from "@/hooks/money-management/useQueryGetMyMoneyManagements";
import { css } from "@emotion/react";

const Index = () => {
  const { data } = useQueryGetMyMoneyManagements(202404, false);
  return (
    <main css={moneyManagementBox}>
      <h2>金額管理</h2>
    </main>
  );
};

export default Index;

const moneyManagementBox = css`
  margin: 60px auto;
  width: 100%;
  max-width: 1200px;
  background-color: skyblue;

  h2 {
    text-align: center;
  }
`;
