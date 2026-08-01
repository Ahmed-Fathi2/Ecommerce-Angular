import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer/footer';
import { Navbar } from './layout/navbar/navbar/navbar';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner'; // 1. استيراد الـ Component

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, NgxSpinnerComponent], // 2. إضافة NgxSpinnerComponent هنا
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // 3. إضافة الـ Schema هنا
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Ecom');

  
  ngOnInit() {
    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }
}
