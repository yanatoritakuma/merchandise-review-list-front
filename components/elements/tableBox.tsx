import { Fragment, useState } from "react";
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
  tableDatas: T[];
  tableDetails?: T[][];
};

export const TableBox = <T extends RowData>({
  tableHeads,
  tableDatas,
  tableDetails,
}: Props<T>) => {
  const Row = ({ row, categoryIndex }: { row: T; categoryIndex: number }) => {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {Object.values(row).map((value, index) => (
            <TableCell key={index} align={index !== 0 ? "right" : "center"}>
              {value}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={Object.keys(row).length + 1}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>日付</TableCell>
                      <TableCell>商品名</TableCell>
                      <TableCell>値段</TableCell>
                      <TableCell>個数</TableCell>
                      <TableCell>合計金額</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableDetails?.map((details, index) =>
                      details.map(
                        (detail) =>
                          categoryIndex === index && (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {detail.date}
                              </TableCell>
                              <TableCell>{detail.name}</TableCell>
                              <TableCell>{detail.unitPrice}</TableCell>
                              <TableCell>{detail.quantity}</TableCell>
                              <TableCell>{detail.totalPrice}</TableCell>
                            </TableRow>
                          )
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeads.map((head, index) => (
              <TableCell key={index} align={index !== 0 ? "right" : "center"}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDatas.map((row, index) => (
            <Row key={index} row={row} categoryIndex={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableBox.displayName = "TableBox";
