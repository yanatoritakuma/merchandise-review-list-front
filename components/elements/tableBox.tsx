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

type Props<T, U> = {
  tableHeads: string[];
  tableDatas: T[];
  tableDetailHeads?: string[];
  tableDetails?: U[];
};

export const TableBox = <T extends RowData, U extends RowData>({
  tableHeads,
  tableDatas,
  tableDetailHeads,
  tableDetails,
}: Props<T, U>) => {
  const Row = ({ row }: { row: T }) => {
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
            <TableCell key={index} align={index !== 0 ? "right" : "center"}>
              {value}
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
                  <Table size="small" aria-label="purchases">
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
                      {tableDetails?.map(
                        (detail, index) =>
                          detail.category === row.category && (
                            <TableRow key={index}>
                              <TableCell align="center">
                                {detail.date}
                              </TableCell>
                              <TableCell align="center">
                                {detail.name}
                              </TableCell>
                              <TableCell align="center">
                                {detail.unitPrice}
                              </TableCell>
                              <TableCell align="center">
                                {detail.quantity}
                              </TableCell>
                              <TableCell align="center">
                                {detail.totalPrice}
                              </TableCell>
                            </TableRow>
                          )
                      )}
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
            <Row key={index} row={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableBox.displayName = "TableBox";
