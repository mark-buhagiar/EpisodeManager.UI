import { TableCell, TableHead as MaterialTableHead, TableRow } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Column from '../../../models/Column';
import SortingInfo from '../../../models/SortingInfo';
import SortDirection from '../../../models/enums/SortDirection';

interface Props<T> {
    columns: Column<T>[];
    sort: SortingInfo<T>;
    onSortChanged: (comparator: (a: T, b: T) => number) => void;
}

const TableHead = <T extends object>({ columns, sort, onSortChanged }: Props<T>): JSX.Element => {
    const [sortingInfo, setSortingInfo] = useState(sort);

    useEffect(() => {
        setSortingInfo(sort);
    }, [sort]);

    useEffect(() => {
        onSortChanged((a: T, b: T): number => {
            const sort = sortingInfo.sortComparer(a, b);
            return sortingInfo.direction === SortDirection.DESCENDING ? sort * -1 : sort;
        });
        // eslint-disable-next-line
    }, [sortingInfo]);

    function onTableHeaderClicked(column: Column<T>): void {
        // If you can't sort on this column just jump out
        if (column.sortComparator === undefined) return;
        // If we currently don't have a sort, jump out (dependency array)
        if (sortingInfo === undefined) return;

        // If we are sorting on the same field again, flip the sort, otherwise by default go descending
        const sortDirection =
            sortingInfo.field === column.rawField()
                ? sortingInfo.direction === SortDirection.ASCENDING
                    ? SortDirection.DESCENDING
                    : SortDirection.ASCENDING
                : SortDirection.DESCENDING;

        setSortingInfo({
            direction: sortDirection,
            sortComparer: column.sortComparator,
            field: column.rawField(),
        } as SortingInfo<T>);
    }

    function getSortIcon<T>(column: Column<T>): React.ReactNode {
        // If no sorting info, or not sorting on this column, show nothing
        if (sortingInfo === undefined || String(sortingInfo.field) !== String(column.rawField())) return <></>;
        return sortingInfo.direction === SortDirection.ASCENDING ? (
            <span className="material-icons">arrow_upward</span>
        ) : (
            <span className="material-icons">arrow_downward</span>
        );
    }

    return (
        <MaterialTableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell data-testid={`table-head-${column.id}`} key={column.id}>
                        <div
                            className={`table-cell ${column.sortComparator !== undefined ? 'clickable' : ''}`}
                            onClick={(): void => onTableHeaderClicked(column)}
                        >
                            <div>{column.header}</div>
                            {getSortIcon(column)}
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </MaterialTableHead>
    );
};

export default TableHead;
