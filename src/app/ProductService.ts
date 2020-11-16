import { Injectable } from '@angular/core';

import { Product } from './product';

@Injectable()
export class ProductService {
  private products: Product[];

  constructor() {
    //DI for HttpClient
    this.products = [
      { id: '100', name: 'TV', price: 110000, photo: 'sony.jpg' },
      { id: '101', name: 'Mobile', price: 55000, photo: 'mobile.jpg' },
      { id: '103', name: 'Laptop', price: 85000, photo: 'lenova.jpg' },
    ];
  }

  findAll(): Product[] {
    //using HttpClient call get API
    return this.products;
  }

  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }
}
