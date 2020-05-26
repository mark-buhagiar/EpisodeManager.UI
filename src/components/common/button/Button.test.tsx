import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { ButtonProps } from './Button';
import Button from './Button';

describe('When the component is rendered', () => {
    it('should render an button with a label', () => {
        const props = { label: 'My button', enabled: true } as ButtonProps;
        const { getByText } = render(<Button {...props} />);
        expect(getByText('My button')).toBeTruthy();
    });

    it('should render an enabled button, when the appropriate prop is passed', () => {
        const props = { label: 'My button', enabled: true } as ButtonProps;
        const { queryByRole } = render(<Button {...props} />);
        expect(queryByRole('button')).toBeTruthy();
        expect(queryByRole('disabled-button')).toBeNull();
    });

    it('should render a disabled button, when the appropriate prop is passed', () => {
        const props = { label: 'My button', enabled: false } as ButtonProps;
        const { queryByRole } = render(<Button {...props} />);
        expect(queryByRole('button')).toBeNull();
        expect(queryByRole('disabled-button')).toBeTruthy();
    });
});

describe('when the button is clicked', () => {
    it('should call the associated callback, when the button is enabled', () => {
        const mockFn = jest.fn();
        const props = { label: 'My button', enabled: true, onClick: mockFn } as ButtonProps;
        const { getByRole } = render(<Button {...props} />);
        fireEvent.click(getByRole('button'));
        expect(mockFn).toHaveBeenCalled();
    });

    it('should NOT call the associated callback, when the button is disabled', () => {
        const mockFn = jest.fn();
        const props = { label: 'My button', enabled: false, onClick: mockFn } as ButtonProps;
        const { getByRole } = render(<Button {...props} />);
        fireEvent.click(getByRole('disabled-button'));
        expect(mockFn).not.toHaveBeenCalled();
    });
});
