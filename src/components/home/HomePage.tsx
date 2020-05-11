import React, { useReducer } from 'react';
import withAuthenticationRequired from '../../HoC/withAuthenticationRequired';
import { withEpisodeActionContext } from '../../HoC/withEpisodeActionContext';
import { withEpisodesSelectedContext } from '../../HoC/withEpisodesSelectedContext';
import monthReducer from '../../reducers/monthReducer';
import { MonthReducerActionTypes } from '../../reducers/monthReducerActions';
import Calendar from '../calendar';
import Message from './Message';
import { ButtonProps } from '../common/button/Button';
import ButtonGroup from '../common/button/ButtonGroup';
import DateSelector from '../dateSelector/DateSelector';
import QualitiesLegend from '../qualitiesLegend/QualitiesLegend';
import Actions from './Actions';
import './HomePage.scss';

const HomePage: React.FC = (): JSX.Element => {
    const [date, updateDateDispatch] = useReducer(monthReducer, new Date());
    const props = { date, updateDateDispatch };

    const buttons = [
        {
            label: 'Refresh',
            onClick: (): void => updateDateDispatch({ type: MonthReducerActionTypes.REFRESH }),
        },
    ] as ButtonProps[];

    return (
        <div className="homepage">
            <Message />
            <div className="calendar-navigation">
                <QualitiesLegend />
                <DateSelector {...props} />
                <ButtonGroup className="refresh-button" buttons={buttons} />
            </div>
            <Calendar date={date} />
            <Actions className="homepage-actions special-actions" />
        </div>
    );
};

export default withAuthenticationRequired(withEpisodesSelectedContext(withEpisodeActionContext(HomePage)));
