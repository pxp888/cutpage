import { useState, useEffect } from 'react';

import '../styles/Settings.css';

function Settings({editmode, selected, shortcuts, setShortcuts, cutstyle, setCutstyle}) {
	useEffect(() => {
		let ok=true;
		if (selected === -1) { ok = false; }
		if (selected >= shortcuts.length) { ok=false; }
		if (!ok) {
			document.getElementById('nameline').value = '';
			document.getElementById('urlline').value = '';
			document.getElementById('iconline').value = '';
			return;
		}
		const name = document.getElementById('nameline');
		const url = document.getElementById('urlline');
		const icon = document.getElementById('iconline');
		
		name.value = shortcuts[selected][0];
		url.value = shortcuts[selected][1];
		icon.value = shortcuts[selected][2];
	}, [selected]);

	function updateShorts() {
		const name = document.getElementById('nameline').value;
		const url = document.getElementById('urlline').value;
		const icon = document.getElementById('iconline').value;
		const newcuts = [...shortcuts];
		newcuts[selected] = [name, url, icon];
		setShortcuts(newcuts);
	}

	function updateCut(e) {
		e.preventDefault();
		let temp = { ...cutstyle };
		temp.width = parseInt(document.getElementById('cutsizeslider').value);
		temp.height = parseInt(document.getElementById('cutsizeslider').value);
		temp.margin = parseInt(document.getElementById('iconmarginslider').value);
		temp.framewidth = parseInt(document.getElementById('framewidthslider').value);
		setCutstyle(temp);
	}

	useEffect(() => {
		document.getElementById('cutsizeslider').value = cutstyle.width;
		document.getElementById('iconmarginslider').value = cutstyle.margin;
		document.getElementById('framewidthslider').value = cutstyle.framewidth;
		
	}, []);

  	return (
	<>
	<div className={editmode ? 'settingarea' : 'settingarea down'}>
		<div className='twoform'>
			<label htmlFor="nameline">name: </label>
			<input type="text" id='nameline' onChange={updateShorts}/>
			<label htmlFor="urlline">url: </label>
			<input type="text" id='urlline' onChange={updateShorts}/>
			<label htmlFor="iconline">icon url: </label>
			<input type="text" id='iconline' onChange={updateShorts}/>
		</div>

		<div className="twoform">
			<label htmlFor="cutsizeslider">icon size: </label>
			<input type="range"
				id="cutsizeslider"
				min="100"
				max="300"
				onChange={updateCut}
			/>

			<label htmlFor="iconmarginslider">icon spacing: </label>
			<input type="range"
				id="iconmarginslider"
				min="0"
				max="100"
				onChange={updateCut}
			/>

			<label htmlFor="framewidthslider">frame width: </label>
			<input type="range"
				id="framewidthslider"
				min="300"
				max="3840"
				onChange={updateCut}
			/>


		</div>
	</div>

	<div className={editmode ? 'setspace' : 'setspace down'}></div>
	</>
  	);
}

export default Settings;

