import React from 'react';
import './Rooms.css';

const array1To24 = Array.from(Array(28).keys());
const weekGridStyle = {
    display: 'grid',
    gridTemplateColumns: `25px  repeat(${array1To24.length}, minmax(50px, 1fr)) 25px`
};
const monthGrid = array1To24.map((col) => {
    return <div className="grid-item">{col}</div>;
});
export const Rooms = () => {
    return (
        <div>
            <div style={weekGridStyle}>{monthGrid}</div>
        </div>
    );
};
