import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { PagerComponent } from './paging/pager/pager.component';
import { PaginationComponent } from './paging/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SortableHeader } from './sorting/sortable.directive';
import { ColumnTemplateComponent } from './column/column-template.component';
import { SearchingComponent } from './searching/searching.component';
import { RowTemplateComponent } from './row/row-template.component';

@NgModule({
    declarations: [
        TableComponent,
        PagerComponent,
        PaginationComponent,
        SortableHeader,
        ColumnTemplateComponent,
        SearchingComponent,
        RowTemplateComponent
    ],
    exports: [
        TableComponent,
        PagerComponent,
        PaginationComponent,
        SortableHeader,
        ColumnTemplateComponent,
        SearchingComponent,
        RowTemplateComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: []
})
export class NgGridModule { }
