import { Component } from '@angular/core';
import { ProductSlider } from '../product-slider/product-slider';
import { Hero } from '../hero/hero/hero';

@Component({
  selector: 'app-home',
  imports: [Hero, ProductSlider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

