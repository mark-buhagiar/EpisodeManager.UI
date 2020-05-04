import { TableContainer, Table as MaterialTable } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Column from '../../../models/Column';
import SortingInfo from '../../../models/SortingInfo';
import TableHead from './TableHead';
import TableBody from './TableBody';
import IndexableObject from '../../../models/IndexableObject';
import './Table.scss';

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    sort: SortingInfo<T>;
}

const Table = <T extends IndexableObject>({ columns, data, sort }: TableProps<T>): JSX.Element => {
    const [sortedData, setSortedData] = useState(data);
    const [sortingInfo, setSortingInfo] = useState(sort);

    useEffect(() => {
        // When data changes force reset the sort direction
        setSortingInfo({ ...sort });
    }, [data, sort]);

    function handleSortChanged(comparator: (a: T, b: T) => number): void {
        if (data.length < 1) return;
        setSortedData([...data].sort(comparator));
    }

    return (
        <TableContainer>
            <MaterialTable>
                <TableHead columns={columns} onSortChanged={handleSortChanged} sort={sortingInfo}></TableHead>
                <TableBody columns={columns} data={sortedData}></TableBody>
            </MaterialTable>
        </TableContainer>
    );
};

export default Table;
