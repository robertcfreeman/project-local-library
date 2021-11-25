function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksByBorrowedStatus = [];
  
  //filter by books that are currently checked out
  const booksCheckedOut = books.filter(book => {
    if (!book.borrows[0].returned) {
      return book
    }
  });
  booksByBorrowedStatus.push(booksCheckedOut)
  
  //filter by books that are currently NOT checked out
  const booksNotCheckedOut = books.filter(book => {
    if (book.borrows[0].returned) {
      return book
    }
  });
  booksByBorrowedStatus.push(booksNotCheckedOut);
  
  return booksByBorrowedStatus;
}


function getBorrowersForBook(book, accounts) {
  return accounts.reduce((borrowersForBook, account) => {
    const filteredBorrows = book.borrows.find(borrow => borrow.id === account.id);
    if (filteredBorrows) {
      const {returned} = filteredBorrows
      borrowersForBook.push({...account, returned});
    }
    return borrowersForBook;
  }, []).slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
