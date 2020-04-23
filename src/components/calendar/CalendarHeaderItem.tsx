import React from 'react';

interface Props {
    label: string;
}

const CalendarHeaderItem: React.FC<Props> = (props: Props): JSX.Element => {
    return <div className="calendar-header-item">{props.label}</div>;
};

export default CalendarHeaderItem;
