import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookaddPage } from './bookadd.page';

describe('BookaddPage', () => {
  let component: BookaddPage;
  let fixture: ComponentFixture<BookaddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
