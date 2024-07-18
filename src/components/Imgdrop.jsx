import React, { useState } from 'react';

function Imgdrop({index, imageDropped, moveIcons}) {
    const [isDragging, setIsDragging] = useState(false);


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
			imageDropped(imageAddress);
			return;
		}

		const text = e.dataTransfer.getData("text");
		if (text === "" || text == null) {
			return;
		}
		const source = parseInt(text);
		moveIcons(source);
		return;
    };


    return(
        <div className="dropzone"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", index.toString());
                console.log("dragging", index);
                }
            }
            draggable="true" 
        >
        </div>
    )
}

export default Imgdrop;