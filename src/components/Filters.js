import {appendDiv, renderfiltereFiles, appendSelect, 
        switchFilter, getStorage} from './helpFunctions';

export let creatingFilters = (files) => {
    // render filter panel
    let filters = ['По имени', 'По размеру', 'По дате создания'];
    let append = [
        appendDiv('filter-panel-text', '', '', 'Сортировка файлов: '),
        appendSelect(filters, files)
    ];
    document.querySelector('body').prepend(appendDiv('filter-panel', append, ''));

    //render files
    renderfiltereFiles(files);
    switchFilter(getStorage() ? getStorage() : 'По имени', files);
}
