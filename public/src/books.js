function findAuthorById(authors, id) {
  return authors.find(item => item.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = books.reduce((array, cur) => {
    const available = cur.borrows[0].returned;
    if (available) {
      return [...array];
    } else {
      return [...array, cur];
    }
  }, [])
  let returned = books.reduce((array, cur) => {
    const available = cur.borrows[0].returned;
    if (available) {
      return [...array, cur];
    } else {
      return [...array];
    }
  }, [])
  return [[...borrowed], [...returned]];
}

function getBorrowersForBook(book, accounts) {
  const borrowed = book.borrows;
  const filteredAccounts = accounts.filter(item => {
    let found = false;
    for (let i in borrowed)
      if (item.id === borrowed[i].id) {
        found = true;
      }
    return found;
  })
  const res = filteredAccounts.map(item => {
    for (let i in borrowed) {
      if (borrowed[i].id === item.id) {
        if (borrowed[i].returned) {
          item.returned = true;
          return item;
        } else {
          item.returned = false;
          return item;
        }
      }
    }
  })
  return res;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
