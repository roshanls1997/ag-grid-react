import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Selections = () => {
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

  const onSelectionChanged = (params) => {
    //console.log(params);
    return true;
  };

  const onBtExportExcel = () => {
    const selectedNodes = gridApi.selectionController.selectedNodes;
    let onlySelected = false;
    for (const key in selectedNodes) {
      if (selectedNodes[key] !== undefined) {
        onlySelected = true;
      }
    }

    gridApi.exportDataAsExcel({
      onlySelected,
    });
  };

  const onBtExportCSV = () => {
    gridApi.exportDataAsCsv();
  };

  const clearFilters = () => {
    gridApi.setFilterModel(null);
    gridApi.clearRangeSelection();
  };

  const onPageSizeChanged = (newPageSize) => {
    var value = document.getElementById("page-size").value;
    gridApi.paginationSetPageSize(Number(value));
  };

  const numberToColor = val => {
    if (val === 0) {
      return '#ffaaaa';
    } else if (val == 1) {
      return '#aaaaff';
    } else {
      return '#aaffaa';
    }
  }

  const cellStyle = params => {
    var color = numberToColor(params.value);
    return { backgroundColor: color };
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="container">
        <div style={{ display: "flex", spacing: "20px" }}>
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
            style={{
              marginBottom: "5px",
              fontWeight: "bold",
              marginRight: "5px",
            }}
          >
            Export to CSV
          </button>
          <button
            onClick={() => clearFilters()}
            style={{
              marginBottom: "5px",
              fontWeight: "bold",
              marginRight: "5px",
            }}
          >
            Reset Filters
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
                editable: true,
                resizable: true,
                minWidth: 100,
                flex: 1,
              }}
              rowDragManaged={true}
              animateRows={true}
              rowSelection={"multiple"}
              singleClickEdit={true}
              enableRangeSelection={true}
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
                  rowDrag={true}
                  filterParams={{ applyMiniFilterWhileTyping: true }}
                  headerCheckboxSelection={true}
                  headerCheckboxSelectionFilteredOnly={true}
                  checkboxSelection={true}
                  cellStyle={{ backgroundColor: '#aaffaa' }}
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
                  cellStyle={{ backgroundColor: 'lightcoral' }}
                />
                <AgGridColumn field="gold" filter="agNumberColumnFilter" cellStyle={cellStyle}/>
                <AgGridColumn field="silver" filter="agNumberColumnFilter" />
                <AgGridColumn field="bronze" filter="agNumberColumnFilter" />
                <AgGridColumn field="total" filter="agNumberColumnFilter" />
              </AgGridColumn>
            </AgGridReact>
            <div style={{ margin: "5px" }}>
              Page Size:
              <select onChange={() => onPageSizeChanged()} id="page-size">
                <option value="10" selected={true}>
                  10
                </option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selections;