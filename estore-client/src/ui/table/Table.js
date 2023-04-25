import React from 'react';
import RBTable from "react-bootstrap/Table";
const Table = ({ columns, data }) => {
    return (
        <RBTable>
            <thead>
                <tr>
                    {
                        Array.isArray(columns) &&
                        columns.map((col) => <th key={col.name}>{col.label}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) &&
                    data.map((record) => <tr key={record._id}
                        style={{ backgroundColor: record.status == 1 ? "green" : "red" }}
                    >
                        {Array.isArray(columns) && columns.map((col) => {
                            return <td key={col.name}>{
                                typeof col?.custom === "function" ? col.custom(record) : record[col.name]
                            }
                            </td>
                        })}
                    </tr>)
                }
            </tbody>
        </RBTable>
    );
}

export default Table;