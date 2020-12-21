
export type align = 'right' | 'left' | 'center';

export interface ITableDetail {
    columns: Array<ITableColumn>;
    onRowClick: (row: any) => Promise<any>;
}
export interface ITableColumn {
    field?: string;
    title: string;
    component?: any;
    align?: align;
    searchable?: boolean;
    searchPlaceHolder?: string;
    width?: string;
    searchKeywords?: Array<{ keyword: any }>;
}
export interface ITable {
    columns: Array<ITableColumn>;
    detail?: ITableDetail;
    expandable?: boolean;
    pageSize?: number;
    paging: boolean;
    selectable?: boolean;
    data: Array<any>;
}
