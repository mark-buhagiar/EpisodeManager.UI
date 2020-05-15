import React from 'react';

const actual = jest.requireActual('@material-ui/pickers');
const moment = jest.requireActual('moment');

export default {
    __esModule: true,
    ...actual,
    DatePicker: () => (props) => {
        return (
            <input
                data-testid="mockedDateField"
                onChange={(e) => {
                    props.onChange(moment(e.target.value));
                }}
            />
        );
    },
};
