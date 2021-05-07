import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgGridTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    //setRowData(data);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const onBtExportExcel = () => {
    gridApi.exportDataAsExcel();
  };

  const onBtExportCSV = () => {
    gridApi.exportDataAsCsv();
  };

  const onPageSizeChanged = (newPageSize) => {
    var value = document.getElementById("page-size").value;
    gridApi.paginationSetPageSize(Number(value));
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="container">
        <div style={{ display: "flex", spacing: "20px" }}>
          <div style={{ margin: "5px" }}>
            Page Size:
            <select onChange={() => onPageSizeChanged()} id="page-size">
              <option value="10" selected={true}>
                10
              </option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>
          <button
            onClick={() => onBtExportExcel()}
            style={{
              marginBottom: "5px",
              fontWeight: "bold",
              marginRight: "5px",
            }}
          >
            Export to Excel
          </button>
          <button
            onClick={() => onBtExportCSV()}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to CSV
          </button>
        </div>
        <div className="grid-wrapper">
          <div
            id="myGrid"
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              defaultColDef={{
                sortable: true,
                floatingFilter: true,
                resizable: true,
                minWidth: 100,
                flex: 1,
              }}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={10}
              rowData={rowData}
              domLayout={"autoHeight"}
            >
              <AgGridColumn headerName="Group A">
                <AgGridColumn
                  field="athlete"
                  filter="agSetColumnFilter"
                  filterParams={{ applyMiniFilterWhileTyping: true }}
                />
                <AgGridColumn
                  field="country"
                  filter="agSetColumnFilter"
                  filterParams={{ applyMiniFilterWhileTyping: true }}
                />
              </AgGridColumn>
              <AgGridColumn headerName="Group B">
                <AgGridColumn
                  field="sport"
                  filter="agSetColumnFilter"
                  filterParams={{ applyMiniFilterWhileTyping: true }}
                />
                <AgGridColumn field="gold" filter="agNumberColumnFilter" />
                <AgGridColumn field="silver" filter="agNumberColumnFilter" />
                <AgGridColumn field="bronze" filter="agNumberColumnFilter" />
                <AgGridColumn field="total" filter="agNumberColumnFilter" />
              </AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="ag-theme-alpine" style={{ height: 900, width: "100%" }}>
  //       <AgGridReact rowData={data}>
  //         <AgGridColumn field="athlete" minWidth={200} />
  //         <AgGridColumn field="age" minWidth={200} />
  //         <AgGridColumn field="country" minWidth={200} />
  //         <AgGridColumn field="year" minWidth={150} />
  //         <AgGridColumn field="date" minWidth={200} />
  //         <AgGridColumn field="sport" minWidth={200} />
  //         <AgGridColumn field="gold" />
  //         <AgGridColumn field="silver" />
  //         <AgGridColumn field="bronze" />
  //         <AgGridColumn field="total" />
  //       </AgGridReact>
  //     </div>
  //   );
};

export default AgGridTable;
