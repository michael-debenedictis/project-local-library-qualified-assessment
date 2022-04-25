function getCount(itemsArray) {
  let total = 0;
  for (let i in itemsArray) {
    total++;
  }
  return total;
}

function getTotalBooksCount(books) {
  return getCount(books);
}

function getTotalAccountsCount(accounts) {
  return getCount(accounts);
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let book in books) {
    if (books[book].borrows[0].returned === false) {
      total++;
    }
  }
  return total;
}

function getMostCommonGenres(books) {
  const genreObj = books.reduce((obj, cur) => {
    if (obj[cur.genre] === undefined) {
      obj[cur.genre] = 1;
      return obj;
    } else {
      obj[cur.genre]++;
      return obj;
    }
  }, {})
  let array = [];
  for (let i in genreObj) {
    const obj = {};
    obj.name = i;
    obj.count = genreObj[i];
    array.push(obj);
  }
  array = array.sort((objA, objB) => objB.count - objA.count).slice(0, 5);
  return array;
}

function getMostPopularBooks(books) {
  let booksArray = [...books];
  booksArray.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  booksArray = booksArray.slice(0, 5);
  const booksPopular = [];
  for (let i in booksArray) {
    const obj = {};
    obj.name = booksArray[i].title;
    obj.count = booksArray[i].borrows.length;
    booksPopular.push(obj);
  }
  return booksPopular;
}

function getMostPopularAuthors(books, authors) {
  let obj = {};
  for (let i in books) {
    if (obj[books[i].authorId] === undefined) {
      obj[books[i].authorId] = books[i].borrows.length;
    } else {
      obj[books[i].authorId] += books[i].borrows.length;
    }
  }
  let array = [];
  for (let i in obj) {
    const theAuthor = {};
    theAuthor.name = i;
    theAuthor.count = obj[i];
    array.push(theAuthor);
  }
  array.sort((authA, authB) => authB.count - authA.count);
  array = array.slice(0, 5);
  const popAuthors = array.map((item, index) => {
    for (let i in authors) {
      if (item.name == authors[i].id) {
        const obj = {};
        obj.name = `${authors[i].name.first} ${authors[i].name.last}`;
        obj.count = item.count;
        return obj;
      }
    }
  })
  return popAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
