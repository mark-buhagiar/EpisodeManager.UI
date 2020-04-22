import { MonthReducerAction, MonthReducerActions } from './monthReducerActions';

const monthReducer = (state: Date, action: MonthReducerAction): Date => {
    switch (action.type) {
        case MonthReducerActions.INCREMENT_MONTH: {
            const newState = new Date(state);
            newState.setMonth(newState.getMonth() + 1);
            return newState;
        }
        case MonthReducerActions.DECREMENT_MONTH: {
            const newState = new Date(state);
            newState.setMonth(newState.getMonth() - 1);
            return newState;
        }
        default:
            return state;
    }
};

export default monthReducer;
