import React from 'react';

export interface ButtonProps {
    label: string;
    enabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, enabled = true, onClick }): JSX.Element => {
    function handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        if (!enabled) return;
        onClick();
    }

    return (
        <button
            role={enabled ? 'button' : 'disabled-button'}
            data-testid={`button-${label}`}
            type="button"
            className={`button no-select ${enabled ? '' : 'disabled'}`}
            title={`${enabled ? '' : 'Disabled'}`}
            onClick={handleClick}
        >
            {enabled ? '' : <div className="disabled-overlay"></div>}
            {label}
        </button>
    );
};

export default Button;
