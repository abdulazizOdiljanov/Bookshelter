('use strict');

// theme
const theme = {
	day: {
		icon: 'fas fa-sun',
		background: '#FFF',
		color: '#CC5D03',
	},
	night: {
		icon: 'fas fa-moon',
		background: '#2C3545',
		color: '#FFF',
	},
};
const change = () => {
	const body = document.body;
	const tgl = document.getElementById('tgl');
	let currentTheme = tgl.className == 'fas fa-moon' ? 'day' : 'night';
	body.style.backgroundColor = theme[currentTheme].background;
	tgl.className = theme[currentTheme].icon;
	tgl.style.color = theme[currentTheme].color;
};

let logout = document.querySelector('.header__logout--linc'),
	searchInput = document.querySelector('.header__search--input'),
	result = document.querySelector('.infobar__count'),
	controlSort = document.querySelector('.infobar__data--btn'),
	bookmarks = document.querySelector('.bookmarks__part'),
	books = document.querySelector('.books'),
	container = document.querySelector('.body'),
	prBtn = document.querySelector('.pr_btn'),
	nxBtn = document.querySelector('.nx_btn'),
	pagenation = document.querySelector('.pagenation');

const token = window.localStorage.getItem('token');
!token && window.location.replace('login.html');

logout.addEventListener('click', (e) => {
	window.localStorage.removeItem('token');
	window.location.replace('login.html');
});

function render(booksArray, list) {
	list.innerHTML = null;

	booksArray.forEach((book) => {
		///////// CREATING ELEMENTS
		let newBook = document.createElement('div');
		let newImgPart = document.createElement('div');
		let newImg = document.createElement('img');
		let newBookInfo = document.createElement('div');
		let newBookName = document.createElement('h3');
		let newBookAuthor = document.createElement('p');
		let newDate = document.createElement('p');
		let newButtons = document.createElement('div');
		let newFirst = document.createElement('div');
		let newBookmarkBtn = document.createElement('button');
		let newMoreBtn = document.createElement('button');
		let newReadBtn = document.createElement('button');
		let newA = document.createElement('a');

		//////// APPEND
		list.appendChild(newBook);
		newBook.appendChild(newImgPart);
		newBook.appendChild(newBookInfo);
		newBook.appendChild(newButtons);
		newImgPart.appendChild(newImg);
		newBookInfo.appendChild(newBookName);
		newBookInfo.appendChild(newBookAuthor);
		newBookInfo.appendChild(newDate);
		newButtons.appendChild(newFirst);
		newButtons.appendChild(newReadBtn);
		newFirst.appendChild(newBookmarkBtn);
		newFirst.appendChild(newMoreBtn);
		newReadBtn.appendChild(newA);

		/////// TEXTCONTENTS
		newBookName.textContent = book.volumeInfo.title;
		newBookAuthor.textContent = book.volumeInfo.authors;
		newDate.textContent = book.volumeInfo.publishedDate;
		newBookmarkBtn.textContent = 'Bookmark';
		newMoreBtn.textContent = 'More Info';
		newA.textContent = 'Read';
		result.textContent = booksArray.length;

		///////// SET ATTRIBUTE
		newImg.setAttribute('src', book.volumeInfo.imageLinks.thumbnail);
		newA.setAttribute('href', book.volumeInfo.previewLink);

		/////// DATASET
		newMoreBtn.dataset.moreBtnId = book.id;
		newBookmarkBtn.dataset.bookmarkBtnId = book.id;

		/////// CLASSLISTS
		newBook.classList.add('book');
		newImgPart.classList.add('img_part');
		newBookInfo.classList.add('book_info');
		newBookName.classList.add('book_name');
		newBookAuthor.classList.add('book_author');
		newDate.classList.add('date');
		newButtons.classList.add('buttons');
		newFirst.classList.add('first');
		newBookmarkBtn.classList.add('bookmark');
		newMoreBtn.classList.add('more');
		newReadBtn.classList.add('read');
	});
}

let array = [];

let currentPage = 1;

checkPage();

function all(searchValue) {
	function mainFetch(searchValue) {
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=1`,
		)
			.then((res) => res.json())
			.then((data) => {
				render(data.items, books);
				window.localStorage.setItem('array', JSON.stringify(data.items));
				controlSort.style.backgroundColor = 'grey';
				array = JSON.parse(window.localStorage.getItem('array'));
			});
	}
	mainFetch(searchValue);

	function mainFetchP(searchValue) {
		pagenation.addEventListener('click', (e) => {
			let target = e.target;
			if (target.className === 'pr_btn fa-sharp fa-solid fa-arrow-left-long') {
				if (currentPage > 1) {
					fetch(
						`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${
							currentPage - 1
						}`,
					)
						.then((res) => res.json())
						.then((data) => {
							render(data.items, books);
							window.localStorage.setItem('array', JSON.stringify(data.items));
							currentPage--;
							checkPage();
							activePage(currentPage.toString());
							array = JSON.parse(window.localStorage.getItem('array'));
						});
				}
			} else if (target.className === 'nx_btn fa-solid fa-arrow-right-long') {
				if (currentPage < 10) {
					fetch(
						`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${
							currentPage + 1
						}`,
					)
						.then((res) => res.json())
						.then((data) => {
							render(data.items, books);
							window.localStorage.setItem('array', JSON.stringify(data.items));
							currentPage++;
							checkPage();
							activePage(currentPage.toString());
							array = JSON.parse(window.localStorage.getItem('array'));
						});
				}
			} else if (target.className === 'p') {
				fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${target.id}`,
				)
					.then((res) => res.json())
					.then((data) => {
						render(data.items, books);
						window.localStorage.setItem('array', JSON.stringify(data.items));
						currentPage = target.id;
						checkPage();
						activePage(currentPage.toString());
						array = JSON.parse(window.localStorage.getItem('array'));
					});
			}
		});
	}
	mainFetchP(searchValue);
}
all('python');

function all2(searchValue) {
	function mainFetch(searchValue) {
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderBy=newest&startIndex=1`,
		)
			.then((res) => res.json())
			.then((data) => {
				render(data.items, books);
				window.localStorage.setItem('array', JSON.stringify(data.items));
				controlSort.style.backgroundColor = 'yellowgreen';
				array = JSON.parse(window.localStorage.getItem('array'));
			});
	}
	mainFetch(searchValue);

	function mainFetchP(searchValue) {
		pagenation.addEventListener('click', (e) => {
			let target = e.target;
			if (target.className === 'pr_btn fa-sharp fa-solid fa-arrow-left-long') {
				if (currentPage > 1) {
					fetch(
						`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderBy=newest&startIndex=${
							currentPage - 1
						}`,
					)
						.then((res) => res.json())
						.then((data) => {
							render(data.items, books);
							window.localStorage.setItem('array', JSON.stringify(data.items));
							currentPage--;
							checkPage();
							activePage(currentPage.toString());
							array = JSON.parse(window.localStorage.getItem('array'));
						});
				}
			} else if (target.className === 'nx_btn fa-solid fa-arrow-right-long') {
				if (currentPage < 10) {
					fetch(
						`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderBy=newest&startIndex=${
							currentPage + 1
						}`,
					)
						.then((res) => res.json())
						.then((data) => {
							render(data.items, books);
							window.localStorage.setItem('array', JSON.stringify(data.items));
							currentPage++;
							checkPage();
							activePage(currentPage.toString());
							array = JSON.parse(window.localStorage.getItem('array'));
						});
				}
			} else if (target.className === 'p') {
				fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderBy=newest&startIndex=${target.id}`,
				)
					.then((res) => res.json())
					.then((data) => {
						render(data.items, books);
						window.localStorage.setItem('array', JSON.stringify(data.items));
						currentPage = target.id;
						checkPage();
						activePage(currentPage.toString());
						array = JSON.parse(window.localStorage.getItem('array'));
					});
			}
		});
	}
	mainFetchP(searchValue);
}

let isNew = false;
controlSort.addEventListener('click', (e) => {
	if (!isNew) {
		all2('python');
		isNew = true;
	} else {
		all('python');
		isNew = false;
	}
});

let bookmarksArrayLocal = JSON.parse(
	window.localStorage.getItem('bookmarksBook'),
);
let bookmarksArray = bookmarksArrayLocal || [];
renderBookmark();

books.addEventListener('click', (e) => {
	let target = e.target;
	if (target.className === 'more') {
		let id = target.dataset.moreBtnId;
		let [filteredBook] = array.filter((book) => book.id === id);
		renderMore(filteredBook);
	} else if (target.className === 'bookmark') {
		let id = target.dataset.bookmarkBtnId;
		let [filteredBook] = array.filter((book) => book.id === id);
		!bookmarksArray.includes(filteredBook) && bookmarksArray.push(filteredBook);
		window.localStorage.setItem(
			'bookmarksBook',
			JSON.stringify(bookmarksArray),
		);
		renderBookmark();
	}
});

Object.removeArrItem = function (arr, item) {
	let index = arr.indexOf(item);
	arr.splice(index, 1);
};
bookmarks.addEventListener('click', (e) => {
	let target = e.target;
	if (target.className === 'deleteBookmark') {
		let id = target.id;
		let [filteredBook] = bookmarksArray.filter((book) => book.id === id);
		Object.removeArrItem(bookmarksArray, filteredBook);
		renderBookmark();
	}
});

function renderBookmark() {
	bookmarks.innerHTML = null;
	bookmarksArray.forEach((book) => {
		let html = `
		<div class="box">
		<div class="info">
			 <h1 class="title">${book.volumeInfo.title}</h1>
			 <p class="author">${book.volumeInfo.authors}</p>
		</div>
		<div class="icons">
			 <a href = "${book.volumeInfo.previewLink}" target="_blank">
			 <img src="images/bookmark/read.png">
			 </a>
			 <img id = "${book.id}" class = "deleteBookmark" src="./images/bookmark/delete.png">
		</div>
		</div>`;

		bookmarks.insertAdjacentHTML('beforeend', html);
	});
}

function renderMore(book) {
	let html = `
		<div class="blur"></div>
			 <div class="more_info">
				  <div class="name_book">Python <img class="close" src="img/x.png" alt=""></div>
				  <div class="img_part">
						<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
				  </div>
				  <p class="description">
						${book.volumeInfo.description}
				  </p>
				  <ul class="infos">
						<li class="author">Author: <span class="inLi">${book.volumeInfo.authors}</span></li>
						<li class="published">Published: <span class="inLi">${book.volumeInfo.publishedDate}</span></li>
						<li class="publishers">Publishers: <span class="inLi">${book.volumeInfo.publisher}</span></li>
						<li class="categories">Categories:  <span class="inLi">${book.volumeInfo.categories}</span></li>
						<li class="pages_count">Pages Count: <span class="inLi">${book.volumeInfo.pageCount}</span></li>
				  </ul>
				  <button class = "read"><a href = "${book.volumeInfo.previewLink}">Read</a></button>
			 </div>
		`;

	container.insertAdjacentHTML('beforeend', html);
}

container.addEventListener('click', (e) => {
	if (e.target.className === 'blur') {
		e.target.nextElementSibling.remove();
		e.target.remove();
	} else if (e.target.className === 'close') {
		e.target.parentElement.parentElement.previousElementSibling.remove();
		e.target.parentElement.parentElement.remove();
	}
});

function checkPage() {
	if (currentPage > 1) {
		prBtn.style.display = 'flex';
	} else prBtn.style.display = 'none';
	if (currentPage < 10) {
		nxBtn.style.display = 'flex';
	} else {
		nxBtn.style.display = 'none';
	}
}

function activePage(p) {
	let pages = document.querySelectorAll('.p');
	let pagesArray = Array.from(pages);

	let [restPage] = pagesArray.filter((page) =>
		page.classList.contains('active'),
	);
	restPage.classList.remove('active');

	let [filteredPage] = pagesArray.filter((page) => p === page.id);
	filteredPage.classList.add('active');
}

searchInput.addEventListener('keyup', search);
function search() {
	let value = searchInput.value.toLowerCase();
	if (!isNew) {
		if (value) {
			all(value);
		} else {
			all('python');
		}
	} else {
		if (value) {
			all2(value);
		} else {
			all2('python');
		}
	}
}
