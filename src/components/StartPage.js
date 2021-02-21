import axios from 'axios';
import {appendDiv, appendImg, onClickFile} from './helpFunctions';
import { creatingFilters } from './Filters';

let main = document.querySelector('#main');
//Choose Folder
function clickEvent(e) {
    
    // fetch folders
    axios.post('http://fs.mh.net.ua/ajax/lsjson.php?dir=global/video&idu=1')
    .then(res => {
        main.style.height = '95vh';
        main.addEventListener('click', onClickFile);

        // Filter files and creating files
        creatingFilters(res.data);
    })
    .catch(err => console.log(err));
}

function createStartPage() {
    let append = [
        appendImg(50, './images/folder.svg') , 
        appendDiv('textStyle', '', '', 'Click Me')
    ];
    appendDiv('main__start medium-font', append, main, '', clickEvent);
}

export default createStartPage;
