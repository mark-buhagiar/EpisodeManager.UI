import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import App from './App';
import * as environmentConfig from '../../config/environmentConfig';

describe('When accessing the site', () => {
    beforeAll(() => {
        environmentConfig.default.isMocking = true;
    });

    it.each`
        test              | isAuthenticated | isLoading
        ${'loading page'} | ${false}        | ${true}
        ${'landing page'} | ${false}        | ${false}
        ${'home page'}    | ${true}         | ${false}
    `(
        'should render the $test if authentication is $isAuthenticated and loading is $isLoading',
        ({ test, isAuthenticated, isLoading }): void => {
            environmentConfig.default.isAuthenticated = isAuthenticated;
            environmentConfig.default.loading = isLoading;

            const application = TestRenderer.create(
                <MemoryRouter>
                    <App />
                </MemoryRouter>,
            );
            expect(application).toBeTruthy();
            expect(application).toMatchSnapshot();
        },
    );
});
