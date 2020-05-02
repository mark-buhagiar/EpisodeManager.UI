import { SortComparer } from './SortComparer';
import SortDirection from './enums/SortDirection';

export default interface SortingInfo<T> {
    field: keyof T;
    direction: SortDirection;
    sortComparer: SortComparer<T>;
}
