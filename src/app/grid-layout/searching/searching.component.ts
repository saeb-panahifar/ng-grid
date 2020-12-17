import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Search, SearchStatus } from '../models/search';
import { ITableColumn } from '../models/table';

@Component({
  selector: 'ng-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  @Input('col') col: ITableColumn;
  @Output('onChangeKeyword') onChangeKeyword: EventEmitter<{ search: Search, status: SearchStatus }>;

  constructor() {
    this.onChangeKeyword = new EventEmitter<{ search: Search, status: SearchStatus }>();
  }

  ngOnInit(): void {
    if (!this.col.searchKeywords) {
      this.col.searchKeywords = new Array<Search>();
    }
  }

  onEnter(event) {

    if (event.target.value && event.target.value.trim() != '') {

      this.col.searchKeywords.push({ keyword: event.target.value });
      this.onChangeKeyword.emit({ status: 'Added', search: { keyword: event.target.value, column: this.col.field }});
      event.target.value = null;

    }
  }

  onRemoveFilter(item: Search) {
    let index = this.col.searchKeywords.indexOf(item);
    this.col.searchKeywords.splice(index, 1);
    this.onChangeKeyword.emit({ status: 'Deleted', search: { keyword: item.keyword, column: item.column } });
  }


}
