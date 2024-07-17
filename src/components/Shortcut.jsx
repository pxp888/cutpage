import { useState, useEffect } from 'react';

import '../styles/Shortcut.css';

function Shortcut({index, cuts, setCuts, editmode, selected, setSelected}) {
	

	return (
		<>
			<div 
				className={selected===index ? 'shortcut selected' : 'shortcut'}
				onClick={() => { if (editmode) { setSelected(index); } }}	
			>
				{editmode && <p>{cuts[index][0]}</p>}
				{!editmode && <a href={cuts[index][1]} target="_blank" rel="noreferrer">{cuts[index][0]}</a> }
				<img src={cuts[index][2]} alt='icon'/>

				
			</div>
		</>
	);
}

export default Shortcut;

