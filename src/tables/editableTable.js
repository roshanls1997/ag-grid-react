import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import "ag-grid-community";
import { editTableData } from '../component/mock/editableTableData';

const EditableTable = () => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [ whichCellIsEditing, setWhichCellIsEditing ] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onBtStartEditing = (key, char, pinned) => {
        gridApi.setFocusedCell(0, 'lastName', pinned);
        gridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'lastName',
          rowPinned: pinned,
          keyPress: key,
          charPress: char,
        });
    };

    const onBtStopEditing = () => {
        gridApi.stopEditing();
    };

    const onBtNextCell = () => {
        gridApi.tabToNextCell();
    };

    const onBtPreviousCell = () => {
        gridApi.tabToPreviousCell();
    };

    const onBtWhich = () => {
        var cellDefs = gridApi.getEditingCells();
        if (cellDefs.length > 0) {
            var cellDef = cellDefs[0];
            console.log('editing cell is: row = ' + cellDef.rowIndex + ', col = ' + cellDef.column.getId());
        } else {
          console.log('no cells are editing');
        }
    };

    return (
        <div className="editable-table-wrapper">
            <div className='btn-list'>
            <div>
            <button onClick={() => onBtStartEditing()}>edit (0)</button>
            <button onClick={() => onBtStartEditing(46)}>
              edit (0, Delete)
            </button>
            <button onClick={() => onBtStartEditing(null, 'T')}>
              edit (0, 'T')
            </button>
            <button onClick={() => onBtStartEditing(null, null, 'top')}>
              edit (0, Top)
            </button>
            <button onClick={() => onBtStartEditing(null, null, 'bottom')}>
              edit (0, Bottom)
            </button>
          </div>
          <div>
            <button onClick={() => onBtStopEditing()}>stop ()</button>
            <button onClick={() => onBtNextCell()}>next ()</button>
            <button onClick={() => onBtPreviousCell()}>previous ()</button>
          </div>
          <div>
            <button onClick={() => onBtWhich()}>which ()</button>
          </div>
            </div>
            <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
                <div
                    id="myGrid"
                    style={{
                        height: "600px",
                        width: "100%",
                    }}
                    className="ag-theme-alpine"
                >
                    <AgGridReact
                        defaultColDef={{
                            resizable: true,
                            sortable: true,
                            filter: true,
                            editable: true,
                        }}
                        rowData={editTableData}
                        onGridReady={onGridReady}
                    >
                        <AgGridColumn field="firstName" />
                        <AgGridColumn field="lastName" />
                        <AgGridColumn field="gender" />
                        <AgGridColumn field="age" />
                        <AgGridColumn field="mood" />
                        <AgGridColumn field="country" />
                        <AgGridColumn field="address" minWidth={550} />
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default EditableTable;
