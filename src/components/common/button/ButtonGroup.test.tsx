import { render } from '@testing-library/react';
import React from 'react';
import { ButtonProps } from './Button';
import ButtonGroup from './ButtonGroup';

describe('When the component is rendered', () => {
    it('should render a button for each array item received', () => {
        const { getAllByTestId } = render(
            <ButtonGroup buttons={[{ label: 'button 1' }, { label: 'button 2' }] as ButtonProps[]} />,
        );
        expect(getAllByTestId('button', { exact: false }).length).toEqual(2);
    });
});
