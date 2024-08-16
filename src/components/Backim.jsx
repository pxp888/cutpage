import { useState, useEffect } from 'react';

import '../styles/Backim.css';

function Backim({editmode, backim, setBackim}) {
	const [isDragging, setIsDragging] = useState(false);
	const [startup, setStartup] = useState(true);

	useEffect(() => { 
		if (startup) { 
			setStartup(false); 
			return; 
		}
		localStorage.setItem('backim', backim); }, [backim]);

	useEffect(() => { 
		const backdata = localStorage.getItem('backim'); 
		if (backdata !== null) { 
			setBackim(backdata); 
	} }, [setBackim]);


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
		if (!editmode) { return; }
        e.preventDefault();

        setIsDragging(false);
        const imageUrl = e.dataTransfer.getData("text/html");
		if (imageUrl !== "") {
			const parser = new DOMParser();
			const doc = parser.parseFromString(imageUrl, "text/html");
			const img = doc.querySelector("img");
			if (img == null) {
				return;
			}
			const imageAddress = img.src;
			setBackim(imageAddress);
			return;
		}
		return;
    };
	
  	return (
		<div className="backim" 
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{backim!=='' && <img src={backim} alt="backim" /> }
		</div>
	);
}

export default Backim;