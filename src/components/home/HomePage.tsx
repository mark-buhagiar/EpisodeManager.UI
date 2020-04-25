import React, { useReducer } from 'react';
import DateSelector from '../dateSelector/DateSelector';
import monthReducer from '../../reducers/monthReducer';
import Calendar from '../calendar';

const HomePage: React.FC = (): JSX.Element => {
    const [date, updateDateDispatch] = useReducer(monthReducer, new Date());
    const props = { date, updateDateDispatch };

    return (
        <div>
            <DateSelector {...props} />
            <Calendar date={date} />
        </div>
    );
};

export default HomePage;
