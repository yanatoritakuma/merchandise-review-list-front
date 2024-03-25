import { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type RowData = {
  [key: string]: any;
};

type Props<T> = {
  tableHeads: string[];
  tableDatas: T[]; // 詳細を表示する場合は、オブジェクトにdetails[]を追加する
  tableDetailHeads?: string[];
  tableDetails?: boolean;
  colors?: string[];
};

export const TableBox = <T extends RowData, U extends RowData>({
  tableHeads,
  tableDatas,
  tableDetailHeads,
  tableDetails,
  colors,
}: Props<T>) => {
  const Row = ({
    row,
    details,
    color,
  }: {
    row: T;
    details: U[];
    color?: string;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          {tableDetails !== undefined && (
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          )}
          {Object.values(row).map((value, index) => (
            <TableCell
              key={index}
              align={index !== 0 ? "right" : "center"}
              style={{ color: color && color }}
            >
              {typeof value !== "object" && value?.toLocaleString()}
            </TableCell>
          ))}
        </TableRow>
        {tableDetails !== undefined && (
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={Object.keys(row).length + 1}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    詳細
                  </Typography>
                  <Table
                    size="small"
                    aria-label="purchases"
                    css={tableDetailsBox}
                  >
                    <TableHead>
                      <TableRow>
                        {tableDetailHeads?.map((head, index) => (
                          <TableCell key={index} align="center">
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details?.map((detail, index) => (
                        <TableRow key={index}>
                          {Object.values(detail).map((value, detailInd) => (
                            <TableCell key={detailInd} align="center">
                              {value?.toLocaleString()}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </Fragment>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {tableDetails !== undefined && <TableCell />}
            {tableHeads.map((head, index) => (
              <TableCell key={index} align={index !== 0 ? "right" : "center"}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDatas.map((data, index) => (
            <Row
              key={index}
              row={data}
              details={data.details}
              color={colors && colors[index]}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableBox.displayName = "TableBox";

const tableDetailsBox = css`
  overflow-x: auto;
  width: 100%;
  min-width: 500px;
`;
