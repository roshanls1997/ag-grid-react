import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './Practice.scss';
import 'ag-grid-enterprise';
import { Button } from 'semantic-ui-react';


const Practice = () => {

	const [tableData, setTableData ] = useState();
	useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.then(resp => resp.json())
			.then(data => setTableData(data))
			.catch(error =>
				 alert('some error occured: ', error));
	}, []);

	const [ gridApi, setGridApi ] = useState();
	const [ columnApi, setColumnApi ] = useState();
	const handleGridReady = param => {
		setGridApi(param.api);
		setColumnApi(param.columnApi)
	}

	const defaultColDef = {
		sortable: true,
		filter: 'agTextColumnFilter',
		resizable: true,
		floatingFilter: true,
		width: 300,
		enableRowGroup: true,
		enablePivot: true,
		enableValue: true,
		editable: true
	}

	const handleAction = (event, data) => {
		event.preventDefault();
		console.log(data);
	}

	const columns = [
		{
			headerName: 'Country',
			field: 'country',
			filter: true,
			headerTooltip: 'this is the header tooltip'
		},
		{
			headerName: 'Year',
			field: 'year'
		},
		{
			headerName: 'Athelete',
			field: 'athlete'
		},
		{
			headerName: 'Total',
			field: 'total',
			aggFunc: 'sum'
		},
		{
			headerName: 'Actions',
			field: 'actions',
			rowGroup: false,
			cellRendererFramework: params => {
				return (
					params.data === undefined ? '' : <div>
						<Button primary size="tiny" onClick={(e) => handleAction(e, params)}>some action</Button>
						<a target="_blank" href="https://www.ag-grid.com/react-grid/getting-started/" rel="noreferrer">ag grid docs</a>
					</div>
				)
			}
		}
	]

	return (
		<div className="practice-page">
			<section className="ag-grid-table-section">
				<h2>AG Grid Table</h2>
				<div className="ag-theme-material" style={{height: '600px'}}>
				<AgGridReact
					rowData={tableData}
					columnDefs={columns}
					defaultColDef={defaultColDef}
					rowSelection="multiple"
					onGridReady={params => handleGridReady(params)}
					groupSelectsChildren={true}
					autoGroupColumnDef={{
						headerName: "custom group header",
						field: 'country',
						cellRendererParams: {
							checkbox: true
						}
					}}
					rowGroupPanelShow='always'
					pivotPanelShow='always'
					sideBar={{toolPanels: ['columns', 'filters']}}
					pagination={true}
				/>
				</div>
			</section>
		</div>
	)
}

export default Practice;