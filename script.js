function simpleEl(type, className) {
    const el = document.createElement(type);
    el.className = className;
    return el;
}

function simpleButton(inner, action) {
    const btn = document.createElement('button');
    btn.innerHTML = inner;
    btn.onclick = action;
    return btn;
}

function simpleField(key, value) {
    // Create label
    const label = document.createElement('label');
    label.textContent = key + ':';
    // Create input box
    const input = document.createElement('input');
    input.type = 'text';
    input.id = key;
    if (value) {
        input.value = value;
    } else {
        input.placeholder = key;
    }
    return { label, input };
}

function simpleItem(item, newItem, showForm) {
    const div0 = simpleEl('div', 'el');
    div0.appendChild(simpleEl('hr', 'divider'));
    // Import all of the data fields
    for (const key in item) {
        const div1 = simpleEl('div', 'fl');
        let value = null;
        if (!newItem) {
            value = item[key];
        }
        const field = simpleField(key, value);
        const label = field.label;
        div1.appendChild(label);
        const input = field.input;
        div1.appendChild(input);
        div0.appendChild(div1);
    }
    div0.appendChild(simpleButton('Remove', function () { div0.remove(); }));
    div0.appendChild(simpleEl('hr', 'divider'));
    // Append item to the showForm
    showForm.appendChild(div0);
}

function removeFadeOut(el, speed) {
    var seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";
    el.style.opacity = 0;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, speed);
}

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
            simpleItem(arr[i], false, showForm);
        }
        // Add action buttons
        const actions = document.getElementById('actions');
        actions.innerHTML = '';
        actions.appendChild(simpleButton('Add', addItem));
        actions.appendChild(simpleButton('Extract', extractJSON));
        const c = document.getElementById('c');
        if (c) {
            removeFadeOut(document.getElementById('c'), 2000);
        }
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
        simpleItem(jsonData[jsonName][0], true, showForm);
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

function template() {
    const jsonTemplate = 
    {
        "template":[
            {
                "field1":"value1",
                "field2":"value2",
                "field3":"value3",
                "field4":"value4"
            }
        ]
    };
    document.getElementById('jsonInput').value = JSON.stringify(jsonTemplate, null, 4);
    document.getElementById('jsonName').value = "template";
    parseJSON();
}
