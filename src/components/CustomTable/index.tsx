import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Colors from "../../constant/colors";

export type Column = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: any, index: number) => React.ReactNode;
  cellStyle?: React.CSSProperties;
};

type ReusableTableProps = {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
  page?: number;
  rowsPerPage?: number;
  total?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
};

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available.",
  onRowClick,
  page = 0,
  total = 0,
  onPageChange,
}) => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || "left"}
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: Colors.teal.dark,
                    color: Colors.white,
                    fontWeight: 300,
                    zIndex: 1,
                    ...col.cellStyle,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  hover
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align || "left"}>
                      {col.render ? col.render(row, rowIndex) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {onPageChange && (
        <TablePagination
          sx={{ marginTop: "10px", height: "100px" }}
          component="div"
          count={total}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      )}
    </>
  );
};

export default ReusableTable;
