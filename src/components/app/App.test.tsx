import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import App from './App';
jest.mock('../../config/environmentConfig.ts');

// jest.mock('../../config/environmentConfig.ts', () => {
//     const actual = jest.requireActual('../../config/environmentConfig.ts');
//     return {
//         ...actual,
//         __esModule: true, // this property makes it work
//         default: { isMocking: true },
//     };
// });

describe('When accessing the site', () => {
    it('should render', () => {
        const application = TestRenderer.create(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );

        expect(application).toBeTruthy();
        expect(application).toMatchSnapshot();
    });
});
