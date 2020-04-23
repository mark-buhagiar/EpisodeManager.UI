import React from 'react';

interface Props {
    id: string;
    className?: string[];
    onClick: () => void;
}

const DateChanger: React.FC<Props> = (props: Props): JSX.Element => {
    return (
        <div
            id={props.id}
            className={['date-changer no-select', !props.className ? '' : [...props.className]].join(' ')}
            onClick={(): void => props.onClick()}
        >
            <span className="material-icons">{props.id}</span>
        </div>
    );
};

export default DateChanger;
