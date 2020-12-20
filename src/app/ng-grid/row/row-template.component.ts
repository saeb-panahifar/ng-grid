import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[row-template]'
})
export class RowTemplateComponent  implements OnInit{

    @Output() onRowClick: EventEmitter<any>;

    @HostListener('click', ['$event'])
    onClicked($event) {

        Array.from($event.target.closest('tbody').rows)
            .forEach((element: any) => element.classList.remove('row-selected'));
        this.elementRef.nativeElement.classList = "row-selected";
        
        this.onRowClick.emit($event);

    }

    constructor(
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private render: Renderer2
    ) {
        this.onRowClick = new EventEmitter();
    }
    
    ngOnInit(): void {
      
    }

}