import React from 'react';
import { TableBody as MaterialTableBody, TableRow, TableCell } from '@material-ui/core';
import Columns from '../../../models/Column';
import IndexableObject from '../../../models/IndexableObject';

interface Props<T> {
    columns: Columns<T>[];
    data: T[];
}

const TableBody = <T extends IndexableObject>({ data, columns }: Props<T>): JSX.Element => {
    return (
        <MaterialTableBody>
            {data.map((datum) => (
                <TableRow key={datum.key}>
                    {columns.map((column) => (
                        <TableCell key={column.id}>{column.field(datum)}</TableCell>
                    ))}
                </TableRow>
            ))}
        </MaterialTableBody>
    );
};

export default TableBody;
