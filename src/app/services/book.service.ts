import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'books';
  private booksSource = new BehaviorSubject<any[]>(this.loadBooksFromStorage());
  books$ = this.booksSource.asObservable();

  constructor(private alertController: AlertController) {}

  // Load books from local storage or return the default list if none exist
  private loadBooksFromStorage(): any[] {
    const savedBooks = localStorage.getItem(this.localStorageKey);
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    return [
      { id: 5, name: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
      { id: 1, name: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction' },
      { id: 2, name: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' },
      { id: 3, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Classic' },
      { id: 4, name: 'Moby-Dick', author: 'Herman Melville', year: 1851, genre: 'Adventure' },
      { id: 6, name: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Coming-of-age' },
      { id: 7, name: 'Brave New World', author: 'Aldous Huxley', year: 1932, genre: 'Science Fiction' },
      { id: 8, name: 'War and Peace', author: 'Leo Tolstoy', year: 1869, genre: 'Historical Fiction' },
      { id: 9, name: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy' },
      { id: 10, name: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, genre: 'Philosophical' },
      { id: 11, name: 'Wuthering Heights', author: 'Emily Brontë', year: 1847, genre: 'Gothic Fiction' },
      { id: 12, name: 'Anna Karenina', author: 'Leo Tolstoy', year: 1878, genre: 'Realist Novel' },
      { id: 13, name: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, genre: 'Epic Fantasy' },
      { id: 14, name: 'Les Misérables', author: 'Victor Hugo', year: 1862, genre: 'Historical Fiction' },
      { id: 15, name: 'The Picture of Dorian Gray', author: 'Oscar Wilde', year: 1890, genre: 'Philosophical Fiction' },
    ];
  }

  // Save books to local storage
  private saveBooksToStorage(books: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  // Add a book to the list if it doesn't already exist
  async addBook(newBook: any) {
    const currentBooks = this.booksSource.value;

    // Check if the book already exists by comparing both name and author
    const exists = currentBooks.some(
      (b) => b.name === newBook.name && b.author === newBook.author
    );

    if (exists) {
      // If book already exists, show the support info alert
      await this.showSupportInfo();
      return; // Do not add the duplicate book
    }

    // Add the new book at the top of the list (if not a duplicate)
    const updatedBooks = [newBook, ...currentBooks];
    this.booksSource.next(updatedBooks);
    this.saveBooksToStorage(updatedBooks); // Persist to local storage
  }

  // Show the alert for duplicate books
  private async showSupportInfo() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'This book is already in your list',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Remove a book from the list
  removeBook(book: any) {
    const updatedBooks = this.booksSource.value.filter(b => b.id !== book.id); // Remove book by id
    this.booksSource.next(updatedBooks); // Emit updated book list
    this.saveBooksToStorage(updatedBooks); // Persist to local storage
  }
}
