import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
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
      this.rowUnSelected(this.elementRef);
    }
  }

  constructor(private elementRef: ElementRef) {

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

  insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  onRowClick(event: any, row: any) {
   
    let newRow = document.createElement('tr');
    let col = document.createElement('td');
    col.innerHTML = "22344";
    newRow.append(col);
    let col1 = document.createElement('td');
    newRow.append(col1);
    this.insertAfter(newRow, event.target.closest('tr'));

    this.rowSelected(event);
    this.onClick1.emit(row);
  }

  onRowDbclick(event, row: any) {
    this.rowSelected(event);
    this.onDbclick.emit(row);
  }

  private rowSelected(event: any) {

    Array.from(event.target.closest('tbody').rows)
      .forEach((element: any) => element.classList.remove('row-selected'));
    event.target.closest('tr').classList.add('row-selected');

  }

  private rowUnSelected(event: any) {

    Array.from(event.nativeElement.getElementsByTagName("tr"))
      .forEach((element: any) => element.classList.remove('row-selected'));

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
