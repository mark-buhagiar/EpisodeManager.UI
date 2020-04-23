import moment, { Moment } from 'moment';
export function getDatesInRange(start: Moment, end: Moment): Date[] {
    const dateArray = [];
    let currentDate = moment(start);
    while (currentDate.isBefore(end)) {
        dateArray.push(currentDate.toDate());
        currentDate = currentDate.add('day', 1);
    }
    return dateArray;
}
