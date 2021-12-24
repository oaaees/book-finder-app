import React, {useEffect, useState} from 'react';
import './App.css'

import Book from "./components/Book";


function App(){
  const [books, setBooks] = useState(undefined);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('*');

  useEffect(()=>{
    getBooks();
  },[query]);

  const getBooks = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    setBooks(data.items);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    if(search == '') return;
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <header className={books == undefined ? "full" : ""}>
        <h1>Book Finder!</h1>
        <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Insert your search here"/>
          <button className="search-button" type="submit">Search🔎</button>
        </form>
      </header>
      <main>
        {books == undefined ? <div>Sorry, no results found. Try making a new search!</div> :
        books.map(book => (
          <Book key=      {book.id} 
                title=    {book.volumeInfo.title ? book.volumeInfo.title : "N/A"} 
                authors=  {book.volumeInfo.authors ? book.volumeInfo.authors : ["N/A"]}
                publisher={book.volumeInfo.publisher ? book.volumeInfo.publisher : "N/A"}
                summary=  {book.searchInfo ? book.searchInfo.textSnippet : "N/A"} 
                image=    {book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"} 
                link =    {book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "#"} />
        ))}
      </main>
      <footer className={books == undefined ? "full" : ""}>
        <p>Made with love 💙 by <a href="https://github.com/oaaees" target="_blank">oaaees!!</a></p>
        <p>Source code is available on <a href="https://github.com/oaaees/book-finder-app" target="_blank">Github</a></p>
      </footer>
    </div>
  );
}

export default App;