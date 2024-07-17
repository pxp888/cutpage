import { useState, useEffect } from 'react';

import blankimage from '../assets/blankimage.png'
import ximage from '../assets/x.webp'


import '../styles/Shortcut.css';

function Shortcut({index, cuts, setCuts, editmode, selected, setSelected, cutstyle}) {
	const style = {
		width: cutstyle.width,
		height: cutstyle.height,
		margin: cutstyle.margin,
	}

	function deleteShortcut() {
		const newcuts = [...cuts];
		newcuts.splice(index, 1);
		setCuts(newcuts);
		setSelected(-1);
	}


	return (
		<>
			<div 
				className={editmode ? 
					(selected!=-1 ? 
						(selected===index ? 'shortcut selected':'shortcut unselected') 
						: 'shortcut')
					 : 'shortcut'}				
				onClick={() => { if (editmode) { setSelected(index); } }}
				style={style}
			>
				{editmode ? 
					<p>{cuts[index][0]}</p>
					:
					<a href={cuts[index][1]} target="_blank" rel="noreferrer">{cuts[index][0]}</a>
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
			</div>
		</>
	);
}

export default Shortcut;

