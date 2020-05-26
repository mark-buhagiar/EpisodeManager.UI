import { render } from '@testing-library/react';
import React from 'react';
import Panel from './index';

describe('When the component is rendered', () => {
    it('should render the panel with all of its parts', () => {
        const panelActions = <div>Panel Actions</div>;
        const { asFragment } = render(
            <Panel title="Panel Title" panelActions={panelActions}>
                <div>Panel Content</div>
            </Panel>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
