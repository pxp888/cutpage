import { useState, useEffect } from 'react';

import Imgdrop from './Imgdrop';

import blankimage from '../assets/blankimage.png'
import ximage from '../assets/x.webp'


import '../styles/Shortcut.css';

function Shortcut({index, cuts, setCuts, editmode, selected, setSelected, cutstyle, }) {
	const style = {
		width: cutstyle.width,
		height: cutstyle.height,
		margin: cutstyle.margin,
	}

	const fstyle = {
		fontSize: cutstyle.fontsize + 'rem',
	}

	function deleteShortcut() {
		const newcuts = [...cuts];
		newcuts.splice(index, 1);
		setCuts(newcuts);
		setSelected(-1);
	}

	function imageDropped(im) {
		const newcuts = [...cuts];
		newcuts[index][2] = im;
		setCuts(newcuts);
	}

	function moveIcons(src){
		const newcuts = [...cuts];
		const [movedItem] = newcuts.splice(src, 1);
		newcuts.splice(index, 0, movedItem);
		setCuts(newcuts);
	}

	

	return (
		<>
			<div 
				className={editmode ? 
					(selected!==-1 ? 
						(selected===index ? 'shortcut selected':'shortcut unselected') 
						: 'shortcut')
					 : 'shortcut'}
				onClick={(e) => { if (editmode) { 
					e.stopPropagation();
					setSelected(index); } }}
				style={style}
			>
				{editmode ? 
					<p style={fstyle} >{cuts[index][0]}</p>
					:
					<a href={cuts[index][1]} target="_blank" rel="noreferrer" style={fstyle} >{cuts[index][0]}</a>
				}

				{cuts[index][2] === "" ? 
					<img src={blankimage} alt="blank" /> 
					: 
					<img src={cuts[index][2]} alt={cuts[index][0]} />
				}

				{editmode && 
					<div className="xbutton" onClick={deleteShortcut}>
						<img 
							src={ximage} 
							alt="delete" 
						></img>
					</div>
				}

				{editmode && <Imgdrop 
					index={index}
					imageDropped={imageDropped} 
					moveIcons={moveIcons} /> }
			</div>
		</>
	);
}

export default Shortcut;

