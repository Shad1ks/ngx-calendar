import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { NgxCalendarModule } from "ngx-calendar";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,

        NgxCalendarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }