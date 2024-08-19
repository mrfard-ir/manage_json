function parseJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
	const jsonName = document.getElementById('jsonName').value;
    let jsonData;
    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        alert('The JSON format entered is not correct.');
        return;
    }
    const showForm = document.getElementById('jsonForm');
	showForm.innerHTML = '';
	
	// Import all data
    if (jsonData[jsonName] && jsonData[jsonName].length > 0) {
        const arr = jsonData[jsonName]; 
		// Import single data
		for (let i = 0; i < arr.length; i++) {
			arrElement = arr[i];
			const div0 = document.createElement('div');
			div0.className = 'el';
			// Add the top divider
			const topDivider = document.createElement('hr');
			topDivider.className = 'divider';
			div0.appendChild(topDivider);
			// Import all of the data fields
			for (const key in arrElement) {
				const value = arrElement[key];
				const label = document.createElement('label');
				let label_value;
				switch(key) {
					case 'model':
						label_value = 'مدل گوشی';
						break;
					case 'lcd_price':
						label_value = 'ال سی دی';
						break;
					case 'lcd_rep_99':
						label_value = 'تعمیر 99%';
						break;
					case 'lcd_rep_100':
						label_value = 'تعمیر 100%';
						break;
					case 'back_door':
						label_value = 'درب پشت';
						break;
					case 'battery':
						label_value = 'باتری';
						break;
					default:
						label_value = key;
				}
				label.textContent = label_value + ':';
				const input = document.createElement('input');
				input.type = 'text';
				input.id = key;
				input.value = value;
				const div1 = document.createElement('div');
				div1.className = 'fl';
				div1.appendChild(label);
				div1.appendChild(input);
				div0.appendChild(div1);
			}
			// Add the bottom divider
			const bottomDivider = document.createElement('hr');
			bottomDivider.className = 'divider';
			div0.appendChild(bottomDivider);
			// Append element to the showForm
			showForm.appendChild(div0);
			showForm.appendChild(document.createElement('br'));
		}
		// Add action buttons
		const actions = document.getElementById('actions');
		actions.innerHTML = '';
		const add = document.createElement('button');
		add.innerHTML = 'Add';
		add.onclick = addItem;
		const extract = document.createElement('button');
		extract.innerHTML = 'Extract';
		extract.onclick = extractJSON;
		actions.appendChild(add);
		actions.appendChild(extract);
    } else {
        alert('No data found!');
    }
}

function addItem() {
    const jsonInput = document.getElementById('jsonInput').value;
	const jsonName = document.getElementById('jsonName').value;
    let jsonData;
    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        alert('The JSON format entered is not correct.');
        return;
    }
    const showForm = document.getElementById('jsonForm');
	// Import keys
    if (jsonData[jsonName] && jsonData[jsonName].length > 0) {
		arrElement = jsonData[jsonName][0];
		const div0 = document.createElement('div');
		div0.className = 'el';
		// Add the top divider
		const topDivider = document.createElement('hr');
		topDivider.className = 'divider';
		div0.appendChild(topDivider);
		// Import required fields
		for (const key in arrElement) {
			const label = document.createElement('label');
			let label_value;
			switch(key) {
				case 'model':
					label_value = 'مدل گوشی';
					break;
				case 'lcd_price':
					label_value = 'ال سی دی';
					break;
				case 'lcd_rep_99':
					label_value = 'تعمیر 99%';
					break;
				case 'lcd_rep_100':
					label_value = 'تعمیر 100%';
					break;
				case 'back_door':
					label_value = 'درب پشت';
					break;
				case 'battery':
					label_value = 'باتری';
					break;
				default:
					lable_value = key;
			}
			label.textContent = label_value + ':';
			const input = document.createElement('input');
			input.type = 'text';
			input.id = key;
			input.placeholder = key;
			const div1 = document.createElement('div');
			div1.className = 'fl';
			div1.appendChild(label);
			div1.appendChild(input);
			div0.appendChild(div1);
        }
		// Add the bottom divider
		const bottomDivider = document.createElement('hr');
		bottomDivider.className = 'divider';
		div0.appendChild(bottomDivider);
		// Append element to the showForm
		showForm.appendChild(div0);
		showForm.appendChild(document.createElement('br'));
    } else {
        alert('No data found!');
    }
}



function extractJSON() {
    const jsonName = document.getElementById('jsonName').value;
    const showForm = document.getElementById('jsonForm');
    const extractedData = [];
    // Getting all items 
    const items = showForm.getElementsByClassName('el');
    // Loop through each item and extract data
    for (let i = 0; i < items.length; i++) {
        const inputs = items[i].getElementsByTagName('input');
        const obj = {};
        for (let j = 0; j < inputs.length; j++) {
            const input = inputs[j];
            const key = input.id;
            const value = input.value;
			// Adding the key and value
            obj[key] = value;  
        }
        // Adding the object to the array
        extractedData.push(obj);  
    }
    // Creating JSON object
    const result = {};
    result[jsonName] = extractedData;
    // Conveting to the JSON format
    const jsonOutput = JSON.stringify(result, null, 4);
    const blob = new Blob([jsonOutput], { type: 'text/plain;charset=utf-8' });
    const finalLink = document.createElement('a');
    finalLink.href = URL.createObjectURL(blob);
    finalLink.download = 'output.json';
    finalLink.click();
}
