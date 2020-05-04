import moment, { Moment } from 'moment';

const DATE_FORMAT = 'D MMMM YYYY';
const DATE_AND_TIME_FORMAT = 'D MMMM YYYY HH:mm';

export function toDateFormat(date: Moment): string {
    return date.format(DATE_FORMAT);
}

export function toDateAndTimeFormat(date: Moment): string {
    return date.format(DATE_AND_TIME_FORMAT);
}

export function formStringToDateFormat(date: string | undefined): string {
    if (date === undefined || date === null) return 'N/A';
    return toDateFormat(moment(date));
}

export function getDatesInRange(start: Moment, end: Moment): Date[] {
    const dateArray = [];
    let currentDate = moment(start);
    while (currentDate.isBefore(end)) {
        dateArray.push(currentDate.toDate());
        currentDate = currentDate.add(1, 'day');
    }
    return dateArray;
}
