import { Component, ViewChild, AfterViewInit } from "@angular/core";

import { NgxCalendarComponent } from "ngx-calendar";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    @ViewChild("ngxCalendar1") ngxCalendar1: NgxCalendarComponent;

    ngAfterViewInit() {
        // Use this.ngxCalendar1 to access additional functionality.
    }

    //1:

    calendarOptions = {};

    calendarValue = null;

    onChooseDate(date: any) {
        this.calendarValue = date;
    }

    //2:

    calendarOptions2 = {
        isWeek: true
    };

    calendarRange = null;

    onChangeDate(date: any) {
        this.calendarRange = date;
    }

    //3:

    calendarOptions3 = {
        isWeek: true,
        isWithTime: true
    };
}