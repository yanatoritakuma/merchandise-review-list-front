import { memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import "@/style/elements/accordion.scss";

type TLinks = {
  name: string;
  url: string;
};

type Props = {
  title: string;
  text?: string;
  links?: TLinks[];
};

export const AccordionBox = memo((props: Props) => {
  const { title, text, links } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>{text}</p>
          <div className="accordionBox">
            {links?.map((link, index) => (
              <Link prefetch={false} key={index} href={link.url}>
                {link.name}
              </Link>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
});

AccordionBox.displayName = "AccordionBox";
