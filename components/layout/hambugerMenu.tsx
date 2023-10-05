import { memo, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { TUser } from "@/types/user";
import { useMutateAuth } from "@/hooks/auth/useMutateAuth";

type Props = {
  user: TUser | undefined;
};

export const HambugerMenu = memo(({ user }: Props) => {
  const [state, setState] = useState(false);
  const { logoutMutation } = useMutateAuth();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <div css={humMenuBox}>
            <CloseIcon onClick={() => toggleDrawer(false)} />
            <Link prefetch={false} href="/">
              ホーム
            </Link>
            <Link prefetch={false} href="/product-search">
              商品検索
            </Link>
            <Link prefetch={false} href="/review-post-lists">
              投稿一覧
            </Link>
            {user?.id !== undefined && (
              <Link prefetch={false} href="/mypage">
                マイページ
              </Link>
            )}
            {user?.id !== undefined && (
              <Link prefetch={false} href="/review-post">
                レビュー投稿
              </Link>
            )}
            {user?.id !== undefined ? (
              <>
                <span onClick={() => logoutMutation.mutate()}>ログアウト</span>
              </>
            ) : (
              <>
                <Link prefetch={false} href="/auth">
                  ログイン
                </Link>
              </>
            )}
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer(true)} />
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
});

HambugerMenu.displayName = "HambugerMenu";

const humMenuBox = css`
  padding: 20px;
  background-color: #fff;
  width: 60vw;
  min-width: 260px;

  a,
  span {
    margin: 24px 0 0 auto;
    display: block;
    color: #333;
    text-decoration: none;
    width: 50%;
    border-bottom: 1px solid #333;
    font-size: 18px;
  }
`;
