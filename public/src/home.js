function getTotalBooksCount(books) {
  let total = 0;
  books.forEach(book => total = total + 1);
  return total;
}

function getTotalAccountsCount(accounts) {
  return accounts.map(account => account.id).length;
}

function getBooksBorrowedCount(books) {
 return books.filter(book => !book.borrows[0].returned).length;
 }

function getMostCommonGenres(books) {
  return books.reduce((bookCollection, book) => {
    const obj = {name: book.genre, count: 1};
    const foundGenre = bookCollection.find(book2 => book2.name === obj.name) 
    if (!foundGenre) {
       bookCollection.push(obj);
     } else {
       foundGenre.count++;
     }
     return bookCollection;
    }, []).sort((genreA, genreB) => genreB.count - genreA.count).slice(0, 5);
   }


function getMostPopularBooks(books) {
  return books.reduce((acc, book) => {
    acc.push({name: book.title, count: book.borrows.length})
    return acc;
  }, []).sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);

}

//helper function for function getMostPopularAuthors
const mergeBooksAndAuthors = (books, authors) => {
//nests matching author into each book object
  return books.reduce((bookAndAuthor, book) => {
    authors.forEach(author => {
      if (book.authorId === author.id) {
        book = {...author, ...book};
        bookAndAuthor.push(book);
      }
    })
    return bookAndAuthor
  }, [])
};

function getMostPopularAuthors(books, authors) {
  return mergeBooksAndAuthors(books, authors).reduce ((booksBorrowedByAuthor, book) => {
    const obj = {name: `${book.name.first} ${book.name.last}`, count: book.borrows.length};
    const foundBookbyAuthor = booksBorrowedByAuthor.find( book2 => book2.name === obj.name);
    if (!foundBookbyAuthor) {
      booksBorrowedByAuthor.push(obj);
    } else {
      foundBookbyAuthor.count += book.borrows.length;
    }
    return booksBorrowedByAuthor;
  }, []).sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
