import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GridLayoutModule } from './grid-layout/grid-layout.module';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    GridLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
