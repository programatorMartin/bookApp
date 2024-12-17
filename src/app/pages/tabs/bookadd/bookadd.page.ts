import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-bookadd',
  templateUrl: './bookadd.page.html',
  styleUrls: ['./bookadd.page.scss'],
})
export class BookaddPage implements OnInit {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient, private bookService: BookService) {}

  ngOnInit() {}

  // Method to search books
  searchBooks() {
    if (!this.searchQuery.trim()) {
      this.searchResults = []; // Clear results if query is empty
      return;
    }

    const queryUrl = `${this.apiUrl}?q=${encodeURIComponent(this.searchQuery)}&maxResults=8`; // Limit to 8 results
    this.http.get(queryUrl).subscribe(
      (response: any) => {
        const allResults = response.items || [];
        this.searchResults = allResults.map((book: any) => {
          return {
            title: book.volumeInfo.title || 'Unknown Title',
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown Year',
            categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown Genre',
            volumeInfo: book.volumeInfo,
          };
        });
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // Add a book to the list
  addBook(book: any) {
    const newBook = {
      id: Date.now(),  // Unique ID for the book
      name: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
      year: parseInt(book.volumeInfo.publishedDate.split('-')[0], 10) || new Date().getFullYear(),
      genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown Genre',
      className: 'animate-entry',
    };

    this.bookService.addBook(newBook);

    setTimeout(() => {
      newBook.className = '';
    }, 1000);
  }
  removeBook(book: any) {
    this.bookService.removeBook(book); // Use the service method to handle the removal
  }

  
}