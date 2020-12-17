import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { CellTemplateComponent } from './cell-template.component';

@Component({
  selector: 'column-template',
  template: ''
})
export class ColumnTemplateComponent implements OnInit {

  @Input('row') row: any;
  @Input('column') column: any;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    if (this.column.component) {

      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory<CellTemplateComponent>(this.column.component);

      const ref = this.viewContainerRef.createComponent<CellTemplateComponent>(componentFactory);

      ref.instance.row = this.row;
    }

  }

  ngAfterViewInit() {
    if (!this.column.component && this.row[this.column.field]) {
      this.elementRef.nativeElement.insertAdjacentHTML('beforeend', this.row[this.column.field]);
    }
  }

}
