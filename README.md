# ngx-calendar

### Description

Calendar component for Angular.

### Demo

- [StackBlitz](https://stackblitz.com/edit/ngx-calendar-demo)

### Requirements

- [Moment.js](https://momentjs.com/)
- [Angular](https://angular.io/)

### Install

- **NPM**

```
npm install ss-ngx-calendar
```

### Setup

```javascript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxCalendarModule } from "ss-ngx-calendar";

@NgModule({
  imports: [
        CommonModule,

        NgxCalendarModule
    ]
})
export class AppModule { }
```

### Usage

```javascript
calendarOptions = {};

calendarValue = null;

onChooseDate(date: any) {
    this.calendarValue = date;
}
```

```html
<ngx-calendar [options]="calendarOptions" (onChooseDate)="onChooseDate($event)"></ngx-calendar>
```

### Options

- **Week view (No time.)**<br>Use to switch to week view mode.

```javascript
calendarOptions = { isWeek: true };
```

- **Week view (With time.)**<br>Use to add time to week view mode.

```javascript
calendarOptions = { isWeek: true, isWithTime: true };
```

> **WARNING**: Options described from now will be working just for the week view mode with time.

- **Available date range**<br>Use to hide times, not within this range.
  - Also, disables arrow to change a week, if there are no available times.

```javascript
calendarOptions = { isWeek: true, isWithTime: true, fromDate: moment(), toDate: moment().add(1, "M") };

//If you need to set fromDate: moment(), just use isFromNow: true.
```

- **Available time range**<br>Use to hide hours, not within this range.
  - Default is from 0 to 23.

```javascript
calendarOptions = { isWeek: true, isWithTime: true, fromHour: 7, toHour: 19 };
```

- **Interval**<br>Use to generate hours with some interval.
  - Default is 1 hour.

```javascript
calendarOptions = { isWeek: true, isWithTime: true, hourInterval: 2, minuteInterval: 30 };
```

### Additional

- **Events**<br>Use to highlight the date.
  - **WARNING**: Just for month view mode.

```javascript
calendarOptions = {};

calendarEvents = [moment(), "2022-07-12"];
```

```html
<ngx-calendar [options]="calendarOptions" [events]="calendarEvents"></ngx-calendar>
```

- **Get date range**<br>Use to get date range and watch changes after clicking on arrows.

```javascript
calendarOptions = {};

onChangeDate(dateRange: any) {
    //dateRange is an object with fromDate and toDate properties as moment objects.
}
```

```html
<ngx-calendar [options]="calendarOptions" (onChangeDate)="onChangeDate($event)"></ngx-calendar>
```

- **Get chosen date**<br>Use to get chosen date after clicking on one.
  - Clicking on one date two times will clear it.

```javascript
calendarOptions = {};

onChooseDate(date: any) {
    //date is a chosen date as moment object or null.
}
```

```html
<ngx-calendar [options]="calendarOptions" (onChooseDate)="onChooseDate($event)"></ngx-calendar>
```

- **Change view**<br>Use to change view after load.

```javascript
import { NgxCalendarComponent } from "ss-ngx-calendar";

@ViewChild("ngxCalendar") ngxCalendar: NgxCalendarComponent;

calendarOptions = {};

//After the calendar is initialized.
ngAfterViewInit() {
    var isMonth = false; //To change to week view mode.

    this.ngxCalendar.setView(isMonth);
}

```

```html
<ngx-calendar #ngxCalendar [options]="calendarOptions"></ngx-calendar>
```

- **Refresh**<br>Use to reload options in case of change.

```javascript
import { NgxCalendarComponent } from "ss-ngx-calendar";

@ViewChild("ngxCalendar") ngxCalendar: NgxCalendarComponent;

calendarOptions = {};

//After the calendar is initialized.
ngAfterViewInit() {
    this.calendarOptions = { isWeek: true, isWithTime: true, fromHour: 8, toHour: 17 };

    this.ngxCalendar.refresh();
}
```

```html
<ngx-calendar #ngxCalendar [options]="calendarOptions"></ngx-calendar>
```