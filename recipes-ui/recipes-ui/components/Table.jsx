import React from 'react';
import './Table.css';
import TableRow from './TableRow';

const Table = ({recipes, onEdit, onDelete }) => {
    return (
        <table border="1" style={{ width:"100%",textAlign:"left" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Review</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe) => (
                    <TableRow 
                        key={recipe._id} 
                        recipe={recipe} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                ))}
            </tbody>
        </table>
    );
};

export default Table;
