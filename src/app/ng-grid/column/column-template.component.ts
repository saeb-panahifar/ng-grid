import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { CellTemplateComponent } from './cell-template.component';

@Directive({
  selector: '[column-template]'
})
export class ColumnTemplateComponent implements OnInit {

  @Input('row') row: any;
  @Input('column') column: any;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private render: Renderer2
  ) { }


  ngOnInit(): void {
    
    if (!this.column.component && this.row[this.column.field]) {

      this.elementRef.nativeElement.innerHTML = this.row[this.column.field];

    } else {

      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory<CellTemplateComponent>(this.column.component);

      const refComponent = this.viewContainerRef.createComponent<CellTemplateComponent>(componentFactory);
      refComponent.instance.row = this.row;

      this.render.appendChild(this.elementRef.nativeElement, refComponent.location.nativeElement);
    }

  }


}
