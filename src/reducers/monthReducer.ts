import { MonthReducerAction, MonthReducerActionTypes } from './monthReducerActions';

const monthReducer = (state: Date, action: MonthReducerAction): Date => {
    switch (action.type) {
        case MonthReducerActionTypes.INCREMENT_MONTH: {
            const newState = new Date(state);
            newState.setMonth(newState.getMonth() + 1);
            return newState;
        }
        case MonthReducerActionTypes.DECREMENT_MONTH: {
            const newState = new Date(state);
            newState.setMonth(newState.getMonth() - 1);
            return newState;
        }
        default:
            return state;
    }
};

export default monthReducer;
