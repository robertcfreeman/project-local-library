function findAccountById(accounts, id) {
return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
return accounts.sort((accountA, accountB) => accountA.name.last < accountB.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((timesBorrowed, book) => timesBorrowed.concat(book.borrows), [])
        .filter(borrows => borrows.id  === account.id).length;
}

//helper function for function getBooksPossessedByAccount
const mergeBooksCheckedOutAndAuthors = (books, authors) => {
  const booksCheckedOut = books.filter(book => {
    if (!book.borrows[0].returned) return book;
  });
//nests matching author into each book object
  return booksCheckedOut.reduce((bookAndAuthor, book) => {
    authors.forEach(author => {
      if (book.authorId === author.id) {
        book = {author, ...book};
        bookAndAuthor.push(book);
      }
    })
    return bookAndAuthor
  }, [])
}

function getBooksPossessedByAccount({id}, books, authors) {
  return mergeBooksCheckedOutAndAuthors(books, authors).filter(book => book.borrows[0].id === id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};



