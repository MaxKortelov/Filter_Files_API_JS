// creating new div
export let appendDiv = (classes, append, place, text, eventClick) => {
    let div = document.createElement('div');
    if(classes) div.className = classes;
    if(append) append.forEach(el => div.appendChild(el));
    if(text) div.innerHTML = text;
    if(eventClick) div.addEventListener('click', eventClick);
    return place ? place.appendChild(div) : div;
};

// creating new img
export let appendImg = (size, src, append) => {
    let img = new Image(size);
    img.src = src;
    return append ? append.appendChild(img) : img;
};

// render File
export let renderfiltereFiles = (files) => {
    let main = document.querySelector('#main');
    main.innerHTML = '';
    files.forEach(file => {
        let append = [
            appendImg(50, './images/file.svg'), 
            appendDiv('textStyle medium-font', '', '', `${file.fname}`),
            appendDiv('textStyle small-font', '', '', `${file.size_now}`),
        ];
        appendDiv('main__start', append, main, '', onClickFile);
    });
};

// set && get local Storage
export let getStorage = () => localStorage.getItem('filters');
export let setStorage = (value) => localStorage.setItem('filters', value);

// creating date
let createDate = (date) => {
    let arr = date.split('.');
    let arr2 = date.split(' ');
    let myDate = new Date();
    myDate.setDate(arr[0]);
    myDate.setMonth(arr[1]);
    myDate.setYear(arr[2].slice(0, 4));
    myDate.setHours(arr2[1].slice(0, 2));
    myDate.setMinutes(arr2[1].slice(3));
    return myDate
};

// filter files
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
                files.sort((a, b) => createDate(a.ctime) - createDate(b.ctime));
                break;
            default:
                break;
        }
        renderfiltereFiles(files);
        setStorage(value);
};

// creating select-option field
export let appendSelect = (options, files) => {
    let select = document.createElement('select');
    options.forEach(el => {
        let option = document.createElement('option');
        option.innerHTML = el;
        if(el === getStorage()) option.selected = true;
        select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
        switchFilter(e.target.value, files);
    });
    return select;
};

// detailed info file
let onClickFile = (e) => {
    let files = document.querySelectorAll('.main__start');
    console.log(files);
    files.forEach(file => file.classList.remove('active'));
    e.target.closest('.main__start').classList.add('active');
}
