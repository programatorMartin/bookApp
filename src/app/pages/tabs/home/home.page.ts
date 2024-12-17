import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { NavController } from '@ionic/angular';
import { BookService } from 'src/app/services/book.service';


Swiper.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {
  
  books: { id: number; name: string; author: string; year: number; genre: string }[] = [];
  topBooks: { id: number; name: string; author: string; year: number; genre: string }[] = [];
  bannerConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  constructor(private navCtrl: NavController, private bookService: BookService) {}

  ngOnInit() {
    // Subscribe to the books observable to get the updated list of books
    this.bookService.books$.subscribe((books) => {
      this.books = books;
      this.updateTopBooks();
    });

    // Initialize Swiper
    new Swiper('.swiper-container', this.bannerConfig);
  }

  ngAfterContentChecked(): void {}

  removeBook(book: any) {
    this.bookService.removeBook(book); 
  }

  updateTopBooks() {
    this.topBooks = this.books.slice(0, 3);
  }
}
