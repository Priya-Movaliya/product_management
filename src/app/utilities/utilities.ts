import { ColDef, GridOptions } from "ag-grid-community"

/** ag-grid template */
export enum AgGridTemplate {
    NOROWSTEMPLATE = "<span>No Data available at this moment.</span>"
}

/** default configuration options for ag-grid columns */
export const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true
}

/** configure grid options for ag-grid  */
export const gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 20,
    cacheBlockSize: 20,
    rowHeight: 30,
    headerHeight: 35,
}