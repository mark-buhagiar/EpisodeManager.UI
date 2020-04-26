import React from 'react';

interface Props {
    label: string;
    enabled: boolean;
    dispatch: React.Dispatch<React.SetStateAction<any>>;
}

const ActionButton: React.FC<Props> = ({ label, enabled, dispatch }): JSX.Element => {
    const handleOnClick = (): void => {
        if (!enabled) return;
        dispatch(null);
    };

    return (
        <div className="button" onClick={handleOnClick}>
            {label}
        </div>
    );
};

export default ActionButton;
