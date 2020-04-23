export enum MonthReducerActionTypes {
    INCREMENT_MONTH = 1,
    DECREMENT_MONTH = 2,
}

export type MonthReducerAction =
    | { type: MonthReducerActionTypes.INCREMENT_MONTH }
    | { type: MonthReducerActionTypes.DECREMENT_MONTH };
