import React from 'react';
import useIsToday from '../../hooks/useIsToday';
import Episode from '../../models/Episode';
import CalendarDateLabel from './DateLabel';
import CalendarEpisode from './Episode';
import Moment from 'moment';

interface Props {
    date: Date;
    episodes: Episode[];
}

const CalendarBodyItem: React.FC<Props> = ({ date, episodes }): JSX.Element => {
    const isToday = useIsToday(date);
    return (
        <div
            data-testid={`calendar-body-item-${Moment(date).format('YYYYMMDD')}`}
            className={['calendar-body-item', isToday ? 'date-today' : ''].join(' ')}
        >
            <CalendarDateLabel isToday={isToday} date={date} />
            {episodes.map((episode) => (
                <CalendarEpisode key={episode.id} {...episode} />
            ))}
        </div>
    );
};

export default CalendarBodyItem;
