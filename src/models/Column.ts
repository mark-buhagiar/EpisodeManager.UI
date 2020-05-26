import { SortComparer } from './SortComparer';

export default class Column<T> {
    private _id: number | string;
    private _header: string;
    private _field: keyof T | ((item: T) => React.ReactNode);
    private _sortComparator?: SortComparer<T>;

    get id(): number | string {
        return this._id;
    }

    get header(): string {
        return this._header;
    }

    get sortComparator(): SortComparer<T> | undefined {
        return this._sortComparator;
    }

    field(item: T): string | React.ReactNode {
        return typeof this._field === 'function' ? this._field(item) : item[this._field];
    }

    rawField(): keyof T | undefined {
        if (typeof this._field === 'function') return undefined;
        return this._field;
    }

    constructor(
        id: number | string,
        header: string,
        field: keyof T | ((item: T) => React.ReactNode),
        sortComparator?: SortComparer<T>,
    ) {
        this._id = id;
        this._header = header;
        this._field = field;

        // We cannot be allowed to sort on a column which has a render
        if (typeof field !== 'function') this._sortComparator = sortComparator;
        else if (typeof field !== 'function' && sortComparator !== undefined)
            throw new Error('Unable to sort on rendered column');
    }
}
