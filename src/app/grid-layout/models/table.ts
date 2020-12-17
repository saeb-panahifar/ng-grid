
export type align = 'right' | 'left' | 'center';

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
    pageSize?: number;
    paging: boolean;
    data: Array<any>;
}
