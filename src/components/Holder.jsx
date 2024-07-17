import { useState, useEffect } from 'react';
import Shortcut from './Shortcut';
import startcuts from './defaults';

import '../styles/Holder.css';

function Holder() {
	const [startup, setStartup] = useState(true);
	const [shortcuts, setShortcuts] = useState(startcuts);
	const [editmode, setEditmode] = useState(false);
	const [selected, setSelected] = useState(-1);


	useEffect(() => {
		if (startup) {
			setStartup(false);
			return;
		}
		localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
	}, [shortcuts]);

	useEffect(() => {
		const data = localStorage.getItem('shortcuts');
		if (data) {
			setShortcuts(JSON.parse(data));
			console.log('Data loaded');
		}
	}, []);

	return (
		<div>
			<h1>Holder</h1>
			<div onClick={()=>{setEditmode(!editmode)}}>editbutton</div>

			<div className="frame">
				{shortcuts.map((cut, index) => (
					<Shortcut 
						key={index} 
						index={index} 
						cuts={shortcuts}
						setCuts={setShortcuts}
						editmode={editmode}
						selected={selected}
						setSelected={setSelected}
					/>
				))}
			</div>
		</div>
	);
}

export default Holder;
