let books = [];
const bookTitle = document.getElementById('inputBookTitle');
const bookAuthor = document.getElementById('inputBookAuthor');
const bookYear = document.getElementById('inputBookYear');
const isReadCheck = document.getElementById('inputBookIsComplete');
const selectListBook = document.getElementById('selectListBook');
const updateForm = document.querySelector('.edit_modal');
const updateBookTitle = document.getElementById('updateBookTitle');
const updateBookAuthor = document.getElementById('updateBookAuthor');
const updateBookYear = document.getElementById('updateBookYear');
const updateIsReadCheck = document.getElementById('updateBookIsComplete');
const closeButton = document.querySelector('.close-btn');
const bookFormInput = document.getElementById('inputBook');
const BookListComplete = document.getElementById('bookDashboardListComplete');
const BookListinComplete = document.getElementById('bookDashboardListinComplete');




const fragBookListComplete = (id, title, author, year) => {
    return `
    <tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>
            <button class="moveToincompleteBook" onclick="moveBook(${id}, 0)"> 👉 Pindah ke rak belum dibaca</button>
            <button class="removeBook" onclick=removeBook(${id})>Hapus buku</button>
        </td>
    </tr>
    `
};

const fragBookListinComplete = (id, title, author, year) => {
    return `
    <tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>
            <button class="moveTocompleteBook" onclick="moveBook(${id}, 1)"> 👉 Pindah ke rak sudah dibaca</button>
            <button class="removeBook" onclick=removeBook(${id})>Hapus buku</button>
        </td>
    </tr>
    `
};

const saveToLocStorage = (books) => {
    const bookself = JSON.stringify(books);
    localStorage.setItem('bookself', bookself);
    // console.log(books);
};

const removeBook = (idNum) => {
    const isFound = books.findIndex(({id}) => id == idNum);
    books.splice(isFound, 1);
    saveToLocStorage(books);
    renderBookList(books);
};

const moveBook = (idNum, condition) => {
    const isFound = books.findIndex(({id}) => id == idNum);
    let thisBook = books[isFound];
    condition == 1 ? thisBook.isComplete = true : thisBook.isComplete = false;
    saveToLocStorage(books);
    renderBookList(books);
};

const renderBookList = (books) => {
    BookListComplete.innerHTML = '';
    BookListinComplete.innerHTML = '';
    books.forEach(({
        id,
        title,
        author,
        year,
        isComplete,
    }) => {
        if (isComplete && selectListBook.value === "Sudah dibaca") {
            BookListComplete.innerHTML += fragBookListComplete(id, title, author, year);
        } else if (!isComplete && selectListBook.value === "Belum dibaca") {
            BookListinComplete.innerHTML += fragBookListinComplete(id, title, author, year);
        }
    });
};


selectListBook.addEventListener("change", () => { 
    renderBookList(books);
});

bookFormInput.addEventListener('submit', (e) => {
    e.preventDefault();

    let newBook = {
        id: +new Date(),
        title: bookTitle.value,
        author: bookAuthor.value,
        year: parseInt(bookYear.value, 10),
        isComplete: isReadCheck.checked,
    };
    books.push(newBook);
    saveToLocStorage(books);
    renderBookList(books);
});

const bookDashboard = localStorage.hasOwnProperty('bookself');
if (bookDashboard) {
    const loadBookself = localStorage.getItem('bookself');
    books = JSON.parse(loadBookself);
} else {
    localStorage.setItem('bookself', []);
}

renderBookList(books);


