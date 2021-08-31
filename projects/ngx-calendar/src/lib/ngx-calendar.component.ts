import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import * as moment_ from "moment";

const moment = moment_;

@Component({
	selector: "ngx-calendar",
	templateUrl: "./ngx-calendar.component.html",
	styleUrls: ["./ngx-calendar.component.scss"]
})
export class NgxCalendarComponent implements OnInit {
	@Input() options: any;
	@Input() events: any;

	@Output() onChooseDate: EventEmitter<any> = new EventEmitter();
	@Output() onChangeDate: EventEmitter<any> = new EventEmitter();

	private viewEnum = {
		month: 1,
		week: 2
	};

	calendar: any = {
		options: {},

		/*delete default hourInterval for generate error when interval only seconds*/
		defaults: {
			hourInterval: 0,
			minuteInterval: 0,

			fromHour: 0,
			toHour: 23
		}
	};

	ngOnInit() {
		this.onInitOptions();

		this.setView(!this.calendar.options.isWeek);
	}

	onInitOptions() {
		Object.assign(this.calendar.options, this.calendar.defaults);

		if (this.options) {
			Object.assign(this.calendar.options, this.options);
		}

		if (this.calendar.options.isFromNow) {
			this.calendar.options.fromDate = moment();
		}

		/*Comment this block because this cause error when set hourInterva '0'*/
		/*
		if (!this.calendar.options.hourInterval || !this.calendar.options.minuteInterval ||
			(this.calendar.options.hourInterval <= 0 && this.calendar.options.minuteInterval <= 0)) {
			this.calendar.options.hourInterval = this.calendar.defaults.hourInterval;
			this.calendar.options.minuteInterval = this.calendar.defaults.minuteInterval;
		}*/
	}

	refresh() {
		this.onInitOptions();

		this.chooseDate();

		this.setView(this.isMonthView());
	}

	isMonthView() {
		return this.calendar.view == this.viewEnum.month;
	}

	isWeekView() {
		return this.calendar.view == this.viewEnum.week;
	}

	isPrevDisabled() {
		if (!this.calendar.data.date || !this.calendar.options.fromDate) {
			return false;
		}

		if (this.isMonthView()) {
			//TODO: Add disable condition for month view.

			return false;
		}

		if (this.isWeekView()) {
			var prevWeekDate = this.calendar.data.date.clone();

			return prevWeekDate < this.calendar.options.fromDate;
		}

		return false;
	}

	isNextDisabled() {
		if (!this.calendar.data.date || !this.calendar.options.toDate) {
			return false;
		}

		if (this.isMonthView()) {
			//TODO: Add disable condition for month view.

			return false;
		}

		if (this.isWeekView()) {
			var nextWeekDate = this.calendar.data.date.clone().add(1, "w");

			return nextWeekDate > this.calendar.options.toDate;
		}

		return false;
	}

	setView(isMonth: boolean) {
		if (isMonth) {
			this.setMonth(this.calendar.chosenDate);
		} else {
			this.setWeek(this.calendar.chosenDate);
		}
	}

	setWeek(date: any) {
		this.calendar.data = {
			columns: []
		};

		this.calendar.view = this.viewEnum.week;

		date = moment(date).startOf("week");

		this.calendar.data.date = date.clone();

		for (var i = 0; i < 7; i++) {
			var column = {
				date: date.clone(),

				dayName: date.format("ddd"),
				formattedDate: date.format("DD/MM"),

				rows: []
			};

			if (this.calendar.options.isWithTime) {
				var time = column.date.clone().hour(this.calendar.options.fromHour);

				for (; ;) {
					if (time.date() != column.date.date() || time.hour() > this.calendar.options.toHour ||
						(time.hour() == this.calendar.options.toHour && time.minute() > 0)) {
						break;
					}

					var isValid = true;

					if (this.calendar.options.fromDate && time < this.calendar.options.fromDate) {
						isValid = false;
					}

					if (this.calendar.options.toDate && time > this.calendar.options.toDate) {
						isValid = false;
					}

					if (isValid) {
						var row = {
							date: time,

							formattedDate: time.format("HH:mm")
						}

						column.rows.push(row);
					}

					time = time.clone().add(this.calendar.options.hourInterval, "h").add(this.calendar.options.minuteInterval, "m");
				}
			}

			this.calendar.data.columns.push(column);

			date.add(1, "d");
		}

		this.setChangeDate();
	}

	prevWeek() {
		this.setWeek(this.calendar.data.date.subtract(1, "w"));
	}

	nextWeek() {
		this.setWeek(this.calendar.data.date.add(1, "w"));
	}

	isSameDate(date1: any, date2: any) {
		if (!date1 || !date2) {
			return false;
		}

		return date1.isSame(date2, "day");
	}

	isSameDateTime(date1: any, date2: any) {
		if (!this.isSameDate(date1, date2)) {
			return false;
		}

		return date1.isSame(date2, "hour") && date1.isSame(date2, "minute");
	}

	chooseDate(date: any = null) {
		if (!date || (this.calendar.chosenDate &&
			((!this.calendar.options.isWithTime && this.isSameDate(this.calendar.chosenDate, date)) || (this.calendar.options.isWithTime && this.isSameDateTime(this.calendar.chosenDate, date))))) {
			this.calendar.chosenDate = undefined;
		} else {
			this.calendar.chosenDate = date.clone();
		}
		
		if (this.onChooseDate) {
			if (this.calendar.chosenDate) {
				this.onChooseDate.emit(this.calendar.chosenDate.clone());
			} else {
				this.onChooseDate.emit(null);
			}
		}
	}

	setMonth(date: any) {
		this.calendar.data = {
			columns: moment.weekdaysShort(true),

			rows: []
		};

		this.calendar.view = this.viewEnum.month;

		date = moment(date).startOf("month");

		this.calendar.data.date = date.clone();

		this.calendar.data.formattedDate = this.calendar.data.date.format("MMMM YYYY");

		date = date.startOf("week");

		for (var i = 0; i < 5; i++) {
			var row = {
				columns: []
			};

			for (var j = 0; j < 7; j++) {
				var column = {
					date: date.clone(),

					formattedDate: date.format("DD")
				};

				row.columns.push(column);

				date.add(1, "d");
			}

			this.calendar.data.rows.push(row);
		}

		this.setChangeDate();
	}

	prevMonth() {
		this.setMonth(this.calendar.data.date.subtract(1, "M"));
	}

	nextMonth() {
		this.setMonth(this.calendar.data.date.add(1, "M"));
	}

	hasEvent(date: any) {
		if (!date) {
			return false;
		}

		if (!this.events || !this.events.length) {
			return false;
		}

		return this.events.some((val: any) => this.isSameDate(date, val));
	}

	setChangeDate() {
		var model: any = {};

		if (this.isMonthView()) {
			var fromDate = this.calendar.data.rows[0].columns[0];

			if (fromDate) {
				model.fromDate = fromDate.date.clone();
			}

			if (model.fromDate) {
				var toDate = this.calendar.data.rows[this.calendar.data.rows.length - 1].columns[this.calendar.data.rows[this.calendar.data.rows.length - 1].columns.length - 1];

				if (toDate) {
					model.toDate = toDate.date.clone();
				}
			}
		}

		if (this.isWeekView()) {
			var fromDate = this.calendar.data.columns[0];

			if (fromDate) {
				model.fromDate = fromDate.date.clone();
			}

			if (model.fromDate) {
				var toDate = this.calendar.data.columns[this.calendar.data.columns.length - 1];

				if (toDate) {
					model.toDate = toDate.date.clone();
				}
			}
		}

		if (this.onChangeDate) {
			this.onChangeDate.emit(model);
		}
	}
}
