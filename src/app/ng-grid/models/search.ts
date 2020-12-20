export type SearchStatus = 'Added' | 'Deleted';

export interface Search {
    keyword: any;
    column: string;
}