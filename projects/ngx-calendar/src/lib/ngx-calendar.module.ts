import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxCalendarComponent } from "./ngx-calendar.component";

@NgModule({
  declarations: [NgxCalendarComponent],
  imports: [CommonModule],
  exports: [NgxCalendarComponent]
})
export class NgxCalendarModule { }