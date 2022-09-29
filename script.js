let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };

    getInfo() {
        let information = `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
        return information;
    }
};

function refreshLibrary() {
    libraryList = document.querySelector('.libraryList');
    libraryList.innerHTML = '';

    for (let book of myLibrary) {

        console.log(book);
        let bookElement = document.createElement('div');
        let bookHeader = document.createElement('h2');
        bookHeader.innerText = `Book N°${myLibrary.indexOf(book) + 1}`;

        let removeBookButton = document.createElement('button');
        removeBookButton.innerText = 'Remove';

        let readStatus = document.createElement('button');
        readStatus.innerText = 'Read ?'

        for (let info in book) {
            if (info != 'getInfo') {
                let infoElement = document.createElement('div');
                infoElement.innerText = `${info}: ${book[info]}`;
                bookElement.appendChild(infoElement);
            }
        }

        libraryList.appendChild(bookHeader);
        libraryList.appendChild(bookElement);
        libraryList.appendChild(removeBookButton);
        libraryList.appendChild(readStatus);

        removeBookButton.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            refreshLibrary();
        });

        readStatus.addEventListener('click', () => {
            book['read'] = !book['read'];
            refreshLibrary();
        });

    };
};

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

let addBookButton = document.querySelector("#addBookButton");

let form = document.querySelector('.form');

addBookButton.addEventListener("click", (e) => {
    if (form.checkValidity()) {

        e.preventDefault();

        let titleInput = document.querySelector('#bookTitle').value;
        let authorInput = document.querySelector('#author').value;
        let pagesInput = document.querySelector('#pagesNumber').value;
        let readInput = true;
        if (!document.querySelector('#yesAnswer').checked) {
            readInput = document.querySelector('#noAnswer').value;
        };

        newBook = new Book(titleInput, authorInput, pagesInput, readInput);
        addBookToLibrary(newBook);
        form.reset();
        console.log(myLibrary);
        refreshLibrary();
    };
});