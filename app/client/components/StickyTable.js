import  React,  {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import  { Radio } from "@mui/material";

const statusColors = {
  Open: "#d6eaf8",
  "Awaiting Approval": "#d6eaf8",
  Approved: "#d4efdf",
  Processing: "#d6eaf8",
  Paid: "#d4efdf",
  Rejected: "#f2d7d5",
  "Vendor Not Found": "#f2d7d5",
  Duplicate: "#f2d7d5",
  Void: "#f2d7d5",
};

const columns = [
  { id: "vendorName", label: "Vendor Name", minWidth: 180, align: "center" },
  {
    id: "invoiceNumber",
    label: "Invoice Number",
    minWidth: 170,
    align: "center",
  },
  { id: "status", label: "Status", minWidth: 200, align: "center" },
  {
    id: "netAmount",
    label: "Net Amount",
    minWidth: 170,
    align: "center",
  },
  {
    id: "invoiceDate",
    label: "Invoice Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "dueDate",
    label: "Due Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    align: "center",
  },
  {
    id: "costCenter",
    label: "Cost Center",
    minWidth: 170,
    align: "center",
  },
  {
    id: "poNumber",
    label: "PO Number",
    minWidth: 170,
    align: "center",
  },

  { id: "createdDate", label: "Created Date", minWidth: 170, align: "center" },
  { id: "createdTime", label: "Created Time", minWidth: 170, align: "center" },
];

export default function StickyHeadTable({ rows, setSelectedInvoice }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null); 

  const handleSelectRow = (id) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      setSelectedInvoice(null);
      return;
    }   
    setSelectedRow(id);
    setSelectedInvoice(id);
  };

  const handleChangePage = (event, newPage) => {
    setSelectedRow(null);
    setSelectedInvoice(null);
    setPage(newPage);
  };

  useEffect(() => {
    setSelectedInvoice(null);
    setSelectedRow(null);
  }, [rows, setSelectedInvoice]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell 
                style={{
                  backgroundColor: "#ebf5fb",
                  borderTop: "2px solid #e0e0e0",
                  position: "sticky",
                  background: "#ebf5fb",
                  left: 0,
                  zIndex: 10,
                }}
              >
              </TableCell>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: index === 0 ? "white" : "inherit",
                    borderRight: index === 0 ? "1px solid #e0e0e0" : "none",
                    backgroundColor: "#ebf5fb",
                    borderTop: "2px solid #e0e0e0",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell padding="checkbox"
                     style={{
                      position: "sticky",
                      background: "white",
                      left: 0,
                      zIndex: 2,
                    }}>
                      <Radio
                        checked={selectedRow === row.id}
                        onClick={() =>  handleSelectRow(row.id)}
                        value={row.id}
                      />
                    </TableCell>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            position: "static",
                            borderRight:
                              index === 0 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          <span
                            style={{
                              padding: "4px 8px",
                              borderRadius: "20px",
                              backgroundColor:
                                column.id === "status"
                                  ? statusColors[value]
                                  : "transparent",
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value === ""
                              ? "-"
                              : value}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPageOptions={[]}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
        labelDisplayedRows={({ page }) => 
          `Page: ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`
        }
      />
    </Paper>
  );
}