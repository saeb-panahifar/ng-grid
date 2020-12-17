import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Search } from './grid-layout/models/search';
import { compare, SortEvent } from './grid-layout/models/sort';
import { ITable } from './grid-layout/models/table';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'grid';

  config: ITable;
  totalItems: number;
  data: Array<any>;

  addItem() {

  }

  rowClick(row) {
    alert('hi')
  }

  constructor(
    private http: HttpClient
  ) {

    this.data = new Array<any>();

    this.config = {

      columns: [
        { field: "ID", title: "دریف" },
        { field: "FirstName", title: "نام", searchable: true },
        { field: "LastName", title: "نام خانوادگی", searchable: true, searchPlaceHolder: 'بر اساس نام خانوادگی' },
        { field: "LastName", title: "نام خانوادگی", searchable: true, searchPlaceHolder: 'بر اساس نام خانوادگی' },
        { field: "LastName", title: "نام خانوادگی", searchable: true, searchPlaceHolder: 'بر اساس نام خانوادگی' },
        {
          title: 'عملیات', component: WidgetComponent, align: 'center', width: '200px'
        }
      ],
      pageSize: 10,
      paging: true,
      data: []
    }


    this.http.get('/assets/data.json').subscribe((x: any) => {

      this.data = x.data;
      this.applyPage(1, 10);
      this.totalItems = x.totalItems;
    });
  }

  pageChanged(event) {
    this.applyPage(event.page, event.itemsPerPage);
  }

  onSorting(event: SortEvent) {

    this.config.data = [...this.config.data].sort((a, b) => {
      const res = compare(a[event.column], b[event.column]);
      return event.direction === 'asc' ? res : -res;
    });

  }

  onSearchKeywordChange(event: Array<Search>) {
    debugger;
    // debugger;
  }


  refresh(event) {
    // alert('refresh');
  }
  onClick(row) {
    // alert(JSON.stringify(row));
  }

  applyPage(page, itemsPerPage) {

    this.config.data =
      this.data.filter((_, index) =>
        index < (page * itemsPerPage) && index >= ((page - 1) * itemsPerPage)
      );

  }
}
