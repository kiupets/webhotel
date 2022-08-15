import React from 'react';

export const NumberTextField = ({ nights, priceMsg }) => {
	return (
		<div style={{ display: 'flex' }}>
			<div>
				<input
					value={nights}
					type="number"
					onChange={(e) => {
						priceMsg(e.target.value);
					}}
					style={{
						width: '100px',
						height: '30px',
						borderRadius: '5px',
						border: '1px solid #ccc',
						padding: '5px',
						marginRight: '10px'
					}}
				/>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
				<div>↑</div>
				<div>↓</div>
			</div>
		</div>
	);
};
