import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgGridModule } from './ng-grid/ng-grid.module';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    NgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
