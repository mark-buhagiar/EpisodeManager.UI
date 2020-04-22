export enum MonthReducerActions {
    INCREMENT_MONTH = 1,
    DECREMENT_MONTH = 2,
}

export type MonthReducerAction =
    | { type: MonthReducerActions.DECREMENT_MONTH }
    | { type: MonthReducerActions.INCREMENT_MONTH };
