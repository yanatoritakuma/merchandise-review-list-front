import { ReactNode, memo } from "react";
import { css } from "@emotion/react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

type TLinks = {
  name: string;
  url: string;
};

type Props = {
  title: string;
  text?: string;
  links?: TLinks[];
  components?: ReactNode;
};

export const AccordionBox = memo(
  ({ title, text, links, components }: Props) => {
    return (
      <div>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>{text}</p>
            <div css={accordionBox}>
              {links?.map((link, index) => (
                <Link prefetch={false} key={index} href={link.url}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div>{components}</div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
);

AccordionBox.displayName = "AccordionBox";

const accordionBox = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  a {
    margin: 10px;
  }
`;
