import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as showsApi from '../../api/showsApi';
import { getDatesInRange } from '../../helpers/dateHelpers';
import Episode from '../../models/Episode';
import './Calendar.scss';
import CalendarBody from './Body';
import CalendarHeader from './Header';
import { useAuth0 } from '../../helpers/reactAuth0Spa';

interface Props {
    date: Date;
}

const Calendar: React.FC<Props> = (props: Props): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    const [dates, setDates] = useState<Date[]>([]);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [calendarStart, setCalendarStart] = useState<Date | null>(null);
    const [calendarEnd, setCalendarEnd] = useState<Date | null>(null);

    useEffect(() => {
        const anchorDate = moment(props.date);
        const calendarStart = moment(anchorDate).startOf('month');
        calendarStart.subtract(calendarStart.day() === 0 ? 6 : calendarStart.day() - 1, 'day');

        const calendarEnd = moment(anchorDate).endOf('month');
        calendarEnd.add(7 - calendarEnd.day(), 'day');

        setDates(getDatesInRange(calendarStart, calendarEnd));
        setCalendarStart(calendarStart.toDate());
        setCalendarEnd(calendarEnd.toDate());
    }, [props.date]);

    useEffect(() => {
        if (!(calendarStart && calendarEnd && isAuthenticated)) return;
        async function getEpisodes(): Promise<void> {
            try {
                // These can be cast safely because we are check to make sure they were populated above.
                const episodes = await showsApi.getForCurrentUserBetweenDates(
                    calendarStart as Date,
                    calendarEnd as Date,
                );
                setEpisodes(episodes);
            } catch (error) {
                setEpisodes([]);
            }
        }

        getEpisodes();
    }, [calendarStart, calendarEnd, isAuthenticated]);

    return (
        <div className="calendar">
            <CalendarHeader />
            <CalendarBody dates={dates} episodes={episodes} />
        </div>
    );
};

export default Calendar;
