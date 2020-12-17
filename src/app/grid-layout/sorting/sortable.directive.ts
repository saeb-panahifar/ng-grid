import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { rotate, SortColumn, SortDirection, SortEvent } from "../models/sort";

@Directive({
    selector: '[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class SortableHeader {

    @Input() sortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        if (this.sortable) {
            this.direction = rotate[this.direction];
            this.sort.emit({ column: this.sortable, direction: this.direction });
        }
    }
}
