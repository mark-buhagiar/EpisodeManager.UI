import React from 'react';
import CalendarBodyItem from './BodyItem';
import Episode from '../../models/Episode';
import moment from 'moment';

interface Props {
    dates: Date[];
    episodes: Episode[];
}

const CalendarBody: React.FC<Props> = ({ dates, episodes }): JSX.Element => {
    const filterEpisodesPublishedOnDate = (date: Date): Episode[] => {
        const dateMoment = moment(date);
        return episodes.filter((episode) => moment(episode.publishedDate).isSame(dateMoment, 'day'));
    };

    return (
        <div className="calendar-body">
            {dates.map((date) => (
                <CalendarBodyItem key={date.getTime()} date={date} episodes={filterEpisodesPublishedOnDate(date)} />
            ))}
        </div>
    );
};

export default CalendarBody;
