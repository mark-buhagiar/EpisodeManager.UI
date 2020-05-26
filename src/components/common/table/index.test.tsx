import { render } from '@testing-library/react';
import React from 'react';
import Column from '../../../models/Column';
import SortDirection from '../../../models/enums/SortDirection';
import SortingInfo from '../../../models/SortingInfo';
import Table from './index';
import IndexableObject from '../../../models/IndexableObject';

interface TestObj extends IndexableObject {
    propA: string;
    propB: string;
    propC: string;
    propD: string;
}

const sortComparator = (a, b): number => (a > b ? 1 : -1);

const columnA = new Column<TestObj>(1, 'Column A', 'propA');
const columnB = new Column<TestObj>(2, 'Column B', (obj: TestObj) => obj.propB);
const columnC = new Column<TestObj>(3, 'Column C', 'propC', sortComparator);

const dataA = {
    key: String(1),
    propA: 'data a prop a',
    propB: 'data a prop b',
    propC: '4',
    propD: 'should not show',
} as TestObj;
const dataB = {
    key: String(2),
    propA: 'data b prop a',
    propB: 'data b prop b',
    propC: '1',
    propD: 'should not show',
} as TestObj;
const dataC = {
    key: String(3),
    propA: 'data c prop a',
    propB: 'data c prop b',
    propC: '8',
    propD: 'should not show',
} as TestObj;

const defaultSort = { direction: SortDirection.ASCENDING, field: 'propC', sortComparer: sortComparator } as SortingInfo<
    TestObj
>;

describe('When the component is rendered', () => {
    it('should display display the passed data', () => {
        const props = { columns: [columnA, columnB, columnC], data: [dataA, dataB, dataC], sort: defaultSort };
        const { getAllByTestId } = render(<Table {...props}></Table>);

        const tableHeaders = getAllByTestId('table-head-', { exact: false }).map(
            (tableHeaderElement) => tableHeaderElement.textContent,
        );

        props.columns.forEach((expectedColumn, index) => {
            expect(tableHeaders[index]).toContain(expectedColumn.header);
        });

        expect(tableHeaders).toContain(
            `${props.columns.find((x) => x.rawField() === defaultSort.field)?.header}arrow_upward`,
        );

        props.data.forEach((datum) => {
            const datumColumns = getAllByTestId(`table-cell-${datum.key}-`, { exact: false }).map(
                (columnElement) => columnElement.textContent,
            );
            expect(datumColumns).toContain(datum.propA);
            expect(datumColumns).toContain(datum.propB);
            expect(datumColumns).toContain(datum.propC);
            expect(datumColumns).not.toContain(datum.propD);
        });
    });
});
