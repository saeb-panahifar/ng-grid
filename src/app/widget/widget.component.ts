import { Component, OnInit } from '@angular/core';
import { CellTemplateComponent } from '../ng-grid/column/cell-template.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent extends CellTemplateComponent implements OnInit {
  
  constructor() {
    super();
  }

  ngOnInit(): void {
  }


  insert() {
    alert('inser:' + JSON.stringify(this.row));
  }

  update() {
    debugger;
    alert('update:' + JSON.stringify(this.row));
  }

  delete() {
    alert('delete:' + JSON.stringify(this.row));
  }


}
