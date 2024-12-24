import { AgGridReact } from "ag-grid-react";
import Box from "@mui/joy/Box";
import { themeQuartz } from 'ag-grid-community'
import { useTheme } from "@mui/joy";



export const DatatableComponent = ({ rows, columns }) => {

  const theme = useTheme();
  const myTheme = themeQuartz
    .withParams({
      backgroundColor: theme.palette.background.body,
      borderColor: theme.palette.divider,
      borderRadius: 10,

      browserColorScheme: "light",
      cellHorizontalPaddingScale: 0.7,
      chromeBackgroundColor: {
        ref: "backgroundColor"
      },
      columnBorder: false,
      fontFamily: "inherit",
      fontSize: 13,
      foregroundColor: theme.palette.text.primary,
      headerBackgroundColor: theme.palette.background.level1,
      headerFontSize: 13,
      headerFontWeight: 600,
      headerTextColor: theme.palette.text.primary,
      rowBorder: true,
      rowVerticalPaddingScale: 0.8,
      sidePanelBorder: true,
      spacing: 6,
      wrapperBorder: true,
      wrapperBorderRadius: 10,
      headerHeight: 32,
    });

  return (
    <Box sx={{width: '100%', pb: 2}}>
    <AgGridReact
      rowData={rows}
      pagination={true}
      theme={myTheme}
      columnDefs={columns}
    />
    </Box>
    // <DataGrid
    //   columns={columns}
    //   rows={rows}
    //   className="w-full"
    //   style={{ resize: "both", blockSize: "100%" }}
    // />
  );
};
