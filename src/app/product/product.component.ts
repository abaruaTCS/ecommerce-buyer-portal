import { Component, OnInit } from '@angular/core';

import { Product } from '../productOrg';
import { ProductServiceOrg } from '../ProductService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductServiceOrg) {}

  ngOnInit() {
    console.log(this.productService.findAll());
    this.products = this.productService.findAll();
  }
}
