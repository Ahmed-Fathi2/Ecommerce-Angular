import { Component } from '@angular/core';
import { ProductSlider } from '../product-slider/product-slider';
import { Hero } from '../hero/hero/hero';
import { Categoryslider } from '../category-slider/categoryslider';

@Component({
  selector: 'app-home',
  imports: [Hero, ProductSlider, Categoryslider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
