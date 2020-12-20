import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Search } from '../models/search';
import { SortEvent } from '../models/sort';
import { ITable, ITableColumn } from '../models/table';
import { SortableHeader } from '../sorting/sortable.directive';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('config') config: ITable;
  @Input('pageTotalItems') totalItems: number;
  @Output('onPageChanging') pageChanged: EventEmitter<any>;
  @Output('onColumnSorting') onSorting: EventEmitter<SortEvent>;
  @Output('onRowClick') onClick1: EventEmitter<any>;
  @Output('onRowDbclick') onDbclick: EventEmitter<any>;
  @Output('onRefresh') onRefresh: EventEmitter<any>;
  @Output('onSearchKeywordChange') onSearchKeywordChange: EventEmitter<Array<Search>>;

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;


  currentPage: number;
  pagination: any;
  itemsPerPage: number;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {

    if (!this.elementRef.nativeElement.contains(event.target)) {

      Array.from(this.elementRef.nativeElement.getElementsByTagName("tr"))
        .forEach((element: any) => this.renderer.removeClass(element, 'row-selected'));
    }

  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {

    this.pageChanged = new EventEmitter<any>();
    this.onSorting = new EventEmitter<any>();
    this.onClick1 = new EventEmitter<any>();
    this.onDbclick = new EventEmitter<any>();
    this.onRefresh = new EventEmitter<any>();
    this.onSearchKeywordChange = new EventEmitter<any>();
  }

  ngOnInit(): void {

    this.currentPage = 0;
    if (this.config.paging && this.config.paging == true) {
      this.itemsPerPage = this.config.pageSize;
    }

  }

  onRowClick(event: any, row: any) {

    this.onClick1.emit(row);
  }



  refresh() {
    this.onRefresh.emit();
  }

  entries(obj) {
    return Object.keys(obj);
  }


  pageData() {
    return this.config.data;
  }

  innerPageChanged(event: any): void {
    this.pageChanged.emit(event);
  }


  onSort({ column, direction }: SortEvent) {

    if (column) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.onSorting.emit({ column, direction });
    }

  }

  onChangeKeyword() {

    let searchEvent: Array<Search> = this.config.columns.filter(
      (column: ITableColumn) => column.searchKeywords && column.searchKeywords.length > 0
    ).map((column: ITableColumn) => {
      return {
        column: column.field,
        keyword: column.searchKeywords
      }
    });

    this.onSearchKeywordChange.emit(searchEvent);

  }

  public isSearchable(): boolean {
    return this.config.columns.some(x => x.searchable);
  }

}
