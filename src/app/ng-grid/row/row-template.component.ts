import {
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewContainerRef
} from "@angular/core";
import { ITable, ITableColumn } from "../models/table";

@Directive({
    selector: '[row-template]'
})
export class RowTemplateComponent implements OnInit {

    @Input() config: ITable;
    @Input() rowData: any;

    @Output() onRowClick: EventEmitter<any>;

    expanded: boolean = false;

    @HostListener('click', ['$event'])
    onClicked($event) {

        if (this.config.selectable && this.config.selectable == true) {

            Array.from($event.target.closest('tbody').rows)
                .forEach((element: any) => this.renderer.removeClass(element, "row-selected"));
            this.renderer.addClass(this.elementRef.nativeElement, "row-selected");

        }

        if (this.config.expandable && this.config.expandable == true) {
            this.addDynamicRow();
        }

        this.onRowClick.emit($event);
    }

    constructor(
        public viewContainerRef: ViewContainerRef,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.onRowClick = new EventEmitter();
    }

    ngOnInit(): void { }


    addDynamicRow() {

        if (this.expanded) {

            const parent = this.elementRef.nativeElement.parentNode;
            const refChild = this.elementRef.nativeElement.nextSibling;
            this.renderer.removeChild(parent, refChild);
            this.expanded = false;

        } else {

            this.expanded = true;

            this.config.detail.onRowClick(this.rowData).then(data => {

                const table: HTMLTableElement = this.renderer.createElement('table');
                table.style.width = "90%";
                table.style.margin = "auto";
                table.style.direction = "rtl";
                table.style.textAlign = "right";

                const td: HTMLTableRowElement = this.renderer.createElement('td');
                td.setAttribute('colspan', this.config.columns.length.toString());
                td.appendChild(table);

                const tr: HTMLTableRowElement = this.renderer.createElement('tr');
                tr.className = "no-hover";
                tr.appendChild(td);

                var tHead = table.createTHead();
                var headerRow = tHead.insertRow();
                
                this.config.detail.columns.forEach((col: ITableColumn) => {
                    var th = this.renderer.createElement('th');
                    th.textContent = col.title;
                    headerRow.appendChild(th);
                });

                var tBody = table.createTBody();
                data.forEach((row: any) => {
                    var bodyRow = tBody.insertRow();
                    this.config.detail.columns.forEach((col: ITableColumn) => {
                        bodyRow.insertCell().textContent = row[col.field];
                    });
                });

                const parent = this.elementRef.nativeElement.parentNode;
                const refChild = this.elementRef.nativeElement.nextSibling;
                this.renderer.insertBefore(parent, tr, refChild);

            });
        }
    }
}