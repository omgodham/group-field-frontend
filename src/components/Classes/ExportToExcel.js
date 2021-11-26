import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
const useStyles = makeStyles((theme) => ({

  button: {
    display: "flex",
    backgroundColor: theme.palette.success.main,
    borderRadius: "20px",
    color: theme.palette.common.white,
    // width: "120px",
    fontSize: "13px",
    marginLeft:"auto",
    margin:theme.spacing(2)
  }
}))


export const ExportToExcel = ({ apiData, fileName }) => {
  const classes = useStyles();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button variant='contained' className={classes.button} onClick={(e) => exportToCSV(apiData, fileName)}  startIcon={<GetAppIcon />}>Export Data</Button>
  );
};