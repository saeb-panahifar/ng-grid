import { Component, HostListener } from "@angular/core";

@Component({ template: '' })
export class CellTemplateComponent {

  public row: any;

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  constructor() { }

}  
