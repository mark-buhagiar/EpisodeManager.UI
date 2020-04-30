import React from 'react';

export interface ButtonProps {
    label: string;
    enabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, enabled = true, onClick }): JSX.Element => {
    function handleClick(): void {
        if (!enabled) return;
        onClick();
    }

    return (
        <div
            className={`button no-select ${enabled ? '' : 'disabled'}`}
            title={`${enabled ? '' : 'Disabled'}`}
            onClick={handleClick}
        >
            {enabled ? '' : <div className="disabled-overlay"></div>}
            {label}
        </div>
    );
};

export default Button;
