/* eslint-disable no-console */
import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import { MockData } from "../mock/data";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridAppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      sideBar: true,
      rowData: MockData,
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-times"/>',
        filter: '<i class="fa fa-filter"/>',
        sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
        sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
        groupExpanded: '<i class="far fa-minus-square"/>',
        groupContracted: '<i class="far fa-plus-square"/>',
      },
      rowSelection: "multiple",
      sortingOrder: ["desc", "asc", null],
      defaultColDef: {
        width: 150,
        sortable: true,
        filter: true,
      },
      frameworkComponents: {
        // add framework component
      },
      columnDefs: [
        {
          checkboxSelection: true,
          headerName: "id",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          sortable: false,
          filter: false,
          resizable: true,
          rowDrag: true,
          field: "id",
          width: 120,
        },
        {
          headerName: "name",
          field: "first_name",
          filter: "agTextColumnFilter",
          width: 120,
          sortable: true,
          tooltipField: "first_name",
          enablePivot: true,
          resizable: true,
          editable: false,
        },
        {
          headerName: "last name",
          field: "last_name",
          tooltipField: "last_name",
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          resizable: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "Email",
          field: "email",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "country",
          field: "country",
          filter: "agSetColumnFilter",
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: {
            values: ["india", "USA", "Russia", "China"],
          },
          onCellValueChanged: this.onCellValueChanged.bind(this),
          width: 155,
          resizable: true,
          sortable: true,
          enablePivot: true,
          editable: true,
        },
        {
          headerName: "company",
          field: "company",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "city",
          field: "city",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "state",
          field: "state",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "street",
          field: "street",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "ip_address",
          field: "ip_address",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
        {
          headerName: "gender",
          field: "gender",
          resizable: true,
          sortable: true,
          filter: "agTextColumnFilter",
          enablePivot: true,
          editable: false,
          width: 140,
        },
      ],
    };
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.api.setSuppressRowDrag(false);
    this.columnApi = params.columnApi;
  };

  onSelectionChanged(event) {}

  onCellValueChanged(params, newValue) {
    //const sysid = params.data.sys_id;
   // const newVal = params.newValue;
    //const oldVal = params.oldValue;
    // track cell vaue
  }

  render() {
    return (
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid1"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            enableBrowserTooltips={true}
            allowContextMenuWithControlKey={true}
            columnDefs={this.state.columnDefs}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            rowSelection={this.state.rowSelection}
            animateRows={true}
            floatingFilter={true}
            onGridReady={this.onGridReady}
            pagination={true}
            paginationPageSize={100}
            sideBar={this.state.sideBar}
            icons={this.state.icons}
            rowData={this.state.rowData}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              editable: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default GridAppComponent;
