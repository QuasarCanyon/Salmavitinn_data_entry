const ENTER_KEYCODE = 13;
const POST_URL = 'https://salmavitinn-backend.herokuapp.com/submit';
const ARTICLES_URL = 'https://salmavitinn-backend.herokuapp.com/titles';
const LITURGY_URL = 'https://salmavitinn-backend.herokuapp.com/liturgytitles';
const BOOKS_URL = 'https://salmavitinn-backend.herokuapp.com/booktitles';

const program = (() => {

    // Helper function for creating a common form of DOM element
    function el(name, ...children) {
        const element = document.createElement(name);
        for (let i = 0; i < children.length; i++) {
            if (typeof children[i] === 'string') {
                element.appendChild(document.createTextNode(children[i]));
            } else {
                element.appendChild(children[i]);
            }
        }
        return element;
    };

    function runClearAll() {

    };

    function listTables(operation) {
        const form = document.querySelector('.after');
        form.appendChild(document.createTextNode('Veldu efnisflokk til að vinna með:'));
        const articlesItem = el('li', 'Sálmagreinar');
        const liturgyItem = el('li', 'Um helgisiði');
        const bookItem = el('li', 'Bækur');
        articlesItem.classList.add('list__item');
        liturgyItem.classList.add('list__item');
        bookItem.classList.add('list__item');
        const list = el('ul', articlesItem, liturgyItem, bookItem);
        form.appendChild(list);
        articlesItem.addEventListener('click', () => {
            listItemsInTable(operation, 'articles');
        });
        liturgyItem.addEventListener('click', () => {
            listItemsInTable(operation, 'liturgy');
        });
        bookItem.addEventListener('click', () => {
            listItemsInTable(operation, 'books');
        });
    };

    function listItemsInTable(operation, table) {
        console.log(table);
        const form = document.querySelector('.after');
        const box = el('select');
        form.appendChild(box);
        fetchTitles(operation, table, box);
    }

    async function fetchTitles(operation, table, box) {
        let result;
        let data;
        if (table === 'articles') {
            result = await fetch(`${ARTICLES_URL}`);
            if (result.status < 200 || result.status > 400) {
                // Nothing
            } else {
                data = await result.json();
            }
        } else if (table === 'liturgy') {
            result = await fetch(`${LITURGY_URL}`);
            if (result.status < 200 || result.status > 400) {
                // Nothing
            } else {
                data = await result.json();
            }
        } else if (table === 'books') {
            result = await fetch(`${BOOKS_URL}`);
            if (result.status < 200 || result.status > 400) {
                // Nothing
            } else {
                data = await result.json();
            }
        }
        showTitles(operation, table, box, data);
    }

    function showTitles(operation, table, box, data) {
        
    }

    function init() {
        var operation;
        const addLink = document.querySelector('.start__list--add');
        const changeLink = document.querySelector('.start__list--change');
        addLink.addEventListener('click', () => {
            operation = 'insert';
            runClearAll();
            listTables(operation);
        });
        changeLink.addEventListener('click', () => {
            operation = 'update';
            runClearAll();
            listTables(operation);
        });
    };

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    program.init();
});