import React from 'react';

export interface ButtonProps {
    label: string;
    enabled?: boolean;
    onClick: () => void;
    submit?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, enabled = true, onClick, submit = false }): JSX.Element => {
    function handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        if (!enabled) return;
        onClick();
    }

    const buttonType = submit ? 'submit' : 'button';

    return (
        <button
            type={buttonType}
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
