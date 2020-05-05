import DateFnsUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import './DateRange.scss';

interface Props {
    initialStartDate: Date;
    initialEndDate: Date;
    onDateRangeChanged: (startDate: Date, endDate: Date) => void;
}

const DateRange: React.FC<Props> = ({ onDateRangeChanged, ...props }: Props): JSX.Element => {
    const [startDate, setStartDate] = useState<Moment | null>(moment(props.initialStartDate));
    const [endDate, setEndDate] = useState<Moment | null>(moment(props.initialEndDate));

    useEffect(() => {
        if (startDate !== null && endDate !== null)
            onDateRangeChanged(startDate.startOf('day').toDate(), endDate.endOf('day').toDate());
        // eslint-disable-next-line
    }, [startDate, endDate]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
            <div className="date-range">
                <DatePicker
                    disableToolbar
                    variant="inline"
                    format="DD MMM YYYY"
                    label="Start Date"
                    value={startDate}
                    maxDate={endDate}
                    disableFuture={true}
                    autoOk={true}
                    onChange={setStartDate}
                />
                <DatePicker
                    disableToolbar
                    variant="inline"
                    format="DD MMM YYYY"
                    label="End Date"
                    value={endDate}
                    minDate={startDate}
                    disableFuture={true}
                    autoOk={true}
                    onChange={setEndDate}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
};

export default DateRange;
