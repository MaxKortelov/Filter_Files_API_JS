//creating new div
export let appendDiv = (classes, append, place, text, eventClick, eventDBClick) => {
    let div = document.createElement('div');
    if(classes) div.className = classes;
    if(append) append.forEach(el => div.appendChild(el));
    if(text) div.innerHTML = text;
    if(eventClick) div.addEventListener('click', eventClick);
    if(eventDBClick) div.addEventListener('dblclick', eventDBClick);
    return place ? place.appendChild(div) : div;
};

// creating new img
export let appendImg = (size, src, append) => {
    let img = new Image(size);
    img.src = src;
    return append ? append.appendChild(img) : img;
};

export let renderfiltereFiles = (files) => {
    let main = document.querySelector('#main');
    main.innerHTML = '';
    files.forEach(file => {
        let append = [
            appendImg(50, './images/file.svg'), 
            appendDiv('textStyle medium-font', '', '', `${file.fname}`),
            appendDiv('textStyle small-font', '', '', `${file.size_now}`),
        ];
        appendDiv('main__start', append, main, '');
    });
};

export let switchFilter = (value, files) => {
        switch(value) {
            case 'По имени':
                files.sort((a, b) => {
                    if(a.fname < b.fname) { return -1; }
                    if(a.fname > b.fname) { return 1; }
                    return 0;
                });
                break;
            case 'По размеру':
                files.sort((a, b) => {
                    if(a.size < b.size) { return -1; }
                    if(a.size > b.size) { return 1; }
                    return 0;
                });
                break;
            case 'По дате создания':
                break;
            default:
                break;
        }
        renderfiltereFiles(files);
        setCokie(value);
};

export let getCokie = () => {
    console.log(document.cookie);
};

export let setCokie = (value) => {
    let date = new Date;
    date.setTime(date.getDate() + 30);
    document.cookie = `filter=${value}; expires=${date}`;
    console.log(document.cookie);
};

// creating select-option field
export let appendSelect = (options, files) => {
    let select = document.createElement('select');
    options.forEach(el => {
        let option = document.createElement('option');
        option.innerHTML = el;
        select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
        switchFilter(e.target.value, files);
    });
    return select;
};
