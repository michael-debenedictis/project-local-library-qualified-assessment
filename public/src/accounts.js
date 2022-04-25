function findAccountById(accounts, id) {
  return accounts.find(item => item.id === id);
}

function sortAccountsByLastName(accounts) {
  const accountsSorted = [...accounts];
  return accountsSorted.sort((accA, accB) => accA.name.last.toLowerCase() < accB.name.last.toLowerCase() ? -1 : 1)
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, cur) => {
    let count = 0; //in the case the account has borrowed the same book more than once
    for (let i in cur.borrows) {
      if (cur.borrows[i].id === account.id) {
        count++;
      }
    }
    return total + count;
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((total, cur) => {
    for (let i in cur.borrows) {
      if (cur.borrows[i].id === account.id && cur.borrows[i].returned === false) {
        const obj = {...cur};
        obj.author = authors.find(item => item.id === cur.authorId);
        curObject = {...obj}
        return [...total, curObject];
      } else {
        return [...total];
      }
    }
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
