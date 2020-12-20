import {
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    Renderer2,
    ViewContainerRef
} from "@angular/core";

@Directive({
    selector: '[row-template]'
})
export class RowTemplateComponent implements OnInit {

    @Output() onRowClick: EventEmitter<any>;

    expanded: boolean = false;

    @HostListener('click', ['$event'])
    onClicked($event) {

        Array.from($event.target.closest('tbody').rows)
            .forEach((element: any) => this.renderer.removeClass(element, "row-selected"));

        this.renderer.addClass(this.elementRef.nativeElement, "row-selected");


        // remark: add dynamic row here. 
        this.addDynamicRow();

        this.onRowClick.emit($event);

    }

    constructor(
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.onRowClick = new EventEmitter();
    }

    ngOnInit(): void { }

    /**
     * this code shoud be refactor. It's just a idea.
     */
    addDynamicRow() {

        if (this.expanded) {
            const parent = this.elementRef.nativeElement.parentNode;
            const refChild = this.elementRef.nativeElement.nextSibling;
            this.renderer.removeChild(parent, refChild);
            this.expanded = false;
        } else {
            this.expanded = true;

            const tr: HTMLTableRowElement = this.renderer.createElement('tr');
            tr.className = "no-hover";
            const td: HTMLTableRowElement = this.renderer.createElement('td');
            td.setAttribute('colspan', '6');
            td.innerHTML = `
                        <table class="table table-bordered" style="width:90%;margin:auto;direction: rtl;text-align: right;">
                        <tr>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>سن</th>
                        </tr>
                        <tr>
                            <td>هومن</td>
                            <td>خدایی</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>امید</td>
                            <td>رضایی</td>
                            <td>94</td>
                        </tr>
                        </table> `;
            tr.appendChild(td);

            const parent = this.elementRef.nativeElement.parentNode;
            const refChild = this.elementRef.nativeElement.nextSibling;
            this.renderer.insertBefore(parent, tr, refChild);

        }
    }


}