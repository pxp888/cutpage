import { useState, useEffect } from 'react';

import '../styles/Settings.css';

function Settings({
	editmode, 
	selected, 
	shortcuts, 
	setShortcuts, 
	cutstyle, 
	setCutstyle,
	
	}) {
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
		temp.framepad = parseInt(document.getElementById('framepadslider').value);
		temp.framecolor = document.getElementById('framecolorpicker').value;
		temp.backcolor = document.getElementById('backcolorpicker').value;
		setCutstyle(temp);
	}

	function exportCuts() {
		const data = JSON.stringify(shortcuts);
		const blob = new Blob([data], {type: 'application/json'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'shortcuts.json';
		a.click();
	}

	function importCuts(e) {
		if (!e.target.files || e.target.files.length === 0) {
			console.log('no files selected');
			return;
		}
		const file = e.target.files[0];
		if (!(file instanceof Blob)) {
			console.error('Selected file is not a Blob');
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = JSON.parse(e.target.result);
			setShortcuts(data);
		};
		reader.readAsText(file);

	}


	useEffect(() => {
		document.getElementById('cutsizeslider').value = cutstyle.width;
		document.getElementById('iconmarginslider').value = cutstyle.margin;
		document.getElementById('framewidthslider').value = cutstyle.framewidth;
		document.getElementById('framepadslider').value = cutstyle.framepad;
		document.getElementById('framecolorpicker').value = cutstyle.framecolor;
		document.getElementById('backcolorpicker').value = cutstyle.backcolor;
	}, []);

  	return (
	<>
	<div className={editmode ? 'settingarea' : 'settingarea down'}
		onClick={(e) => e.stopPropagation()}>
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

			<label htmlFor="framepadslider">frame padding: </label>
			<input type="range"
				id="framepadslider"
				min="0"
				max="600"
				onChange={updateCut}
			/>
		</div>

		<div className='fourform'>
			<label htmlFor="framecolorpicker">frame color: </label>
			<input type="color"
				id="framecolorpicker"
				onChange={updateCut}
			/>

			<label htmlFor="backcolorpicker">background: </label>
			<input type="color"
				id="backcolorpicker"
				onChange={updateCut}
			/>


			<button className="nbut" id="exportbutton" onClick={exportCuts} >Export</button>
			
			<input type="file" id="filepicker" onClick={importCuts} />
			
			<button className="nbut" id="clearcutbutton">Reset Shortcuts</button>
			<button className="nbut" id="clearstylebutton">Reset styles</button>

		</div>

	</div>

	<div className={editmode ? 'setspace' : 'setspace down'}></div>
	</>
  	);
}

export default Settings;

