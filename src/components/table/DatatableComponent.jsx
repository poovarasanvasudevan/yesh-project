import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from 'ag-grid-community'
import { useMemo } from "react";



export const DatatableComponent = ({ rows, columns , loading = false, ...props}) => {


  const myTheme = useMemo(() => {
    return themeQuartz
      .withParams({
        borderRadius: 10,

        browserColorScheme: "light",
        cellHorizontalPaddingScale: 0.7,
        chromeBackgroundColor: {
          ref: "backgroundColor"
        },
        columnBorder: false,
        fontFamily: "inherit",
        fontSize: 13,
        headerFontSize: 14,
        headerFontWeight: 600,
        headerTextColor: 'black',
        headerBackgroundColor:'#f9fafb',
        rowBorder: true,
        rowVerticalPaddingScale: 0.8,
        sidePanelBorder: true,
        spacing: 6,
        wrapperBorder: true,
        wrapperBorderRadius: 4,
        headerHeight: 38,
      });
  },[ ])

  return (
    <div className={'w-full pb-2'}>
      <AgGridReact
        loading={loading}
        rowData={rows}
        pagination={true}
        theme={myTheme}
        columnDefs={columns}
        {...props}
      />
    </div>
  );
};
