import React from 'react';
import Button, { ButtonProps } from './Button';
import './Button.scss';

interface Props {
    className?: string;
    buttons: ButtonProps[];
}

const ButtonGroup: React.FC<Props> = ({ className = '', buttons }): JSX.Element => {
    return (
        <div className={`button-group ${className}`}>
            {buttons.map((button) => (
                <Button
                    key={button.label}
                    onClick={button.onClick}
                    enabled={button.enabled}
                    label={button.label}
                ></Button>
            ))}
        </div>
    );
};

export default ButtonGroup;
