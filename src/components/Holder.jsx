import { useState, useEffect } from 'react';
import Shortcut from './Shortcut';
import startcuts from './defaults';
import Settings from './Settings';
import Backim from './Backim';

import '../styles/Holder.css';

import plus from '../assets/plus.png';
import setpic from '../assets/settings.png';


function Holder() {
	const [startup, setStartup] = useState(true);
	const [shortcuts, setShortcuts] = useState(startcuts);
	const [editmode, setEditmode] = useState(false);
	const [selected, setSelected] = useState(-1);
	const [backim, setBackim] = useState('');

	const [cutstyle, setCutstyle] = useState({
		width: 200, 
		height: 200, 
		margin: 0,
		framewidth: 800,
		framepad: 100,
		framecolor: '#000000',
		backcolor: '#323232',
	});
	
	const framestyle = {
		maxWidth: `${cutstyle.framewidth}px`,
        padding: `${cutstyle.framepad}px`,
		backgroundColor: cutstyle.framecolor,
	};

	const backstyle = {
		backgroundColor: cutstyle.backcolor,
	};
	
	function toggleEdit() {
		if (editmode) { setSelected(-1); }
		setEditmode(!editmode);
	}

	function addShortcut(e) {
		e.stopPropagation();
		const newcut = ['New Shortcut', '', ''];
		setShortcuts([...shortcuts, newcut]);
		setSelected(shortcuts.length);
	}

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
		}
	}, []);

	return (
		<div className='mainarea' style={backstyle} 
			onClick={() => { if (editmode) { setSelected(-1); } }}>
			
			<Backim editmode={editmode} backim={backim} setBackim={setBackim} /> 
			
			<div className="frame" style={framestyle} >
				{shortcuts.map((cut, index) => (
					<Shortcut 
						key={index} 
						index={index} 
						cuts={shortcuts}
						setCuts={setShortcuts}
						editmode={editmode}
						selected={selected}
						setSelected={setSelected}
						cutstyle={cutstyle}
					/>
				))}

				{editmode &&
					<div className="plusbutton" onClick={addShortcut} style={cutstyle}>
						<img src={plus} alt="add shortcut" />
					</div>
				}

				<div className="setbutton" style={cutstyle}>
					<p>settings</p>
					<img src={setpic} alt="settings" onClick={toggleEdit} />
				</div>

			</div>

			<Settings 
				editmode={editmode}
				selected={selected}
				shortcuts={shortcuts}
				setShortcuts={setShortcuts}
				cutstyle={cutstyle}
				setCutstyle={setCutstyle}
				backim={backim}
				setBackim={setBackim}
			/>
		</div>
	);
}

export default Holder;
