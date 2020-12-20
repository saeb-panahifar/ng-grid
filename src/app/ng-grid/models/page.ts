export interface ConfigModel {
    align?: boolean;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    itemsPerPage: number;
    lastText: string;
    maxSize: number;
    nextText: string;
    pageBtnClass: string;
    previousText: string;
    rotate: boolean;
  }

  export interface PagesModel {
    text: string;
    number: number;
    active: boolean;
  }
  
  export interface PagerModel {
    itemsPerPage: number;
    previousText: string;
    nextText: string;
    pageBtnClass: string;
    align: boolean;
  }
  
  export interface PaginationLinkContext {
    currentPage: number;
    disabled: boolean;
  }
  

  export interface PaginationNumberLinkContext extends PaginationLinkContext {
    $implicit: PagesModel;
  }