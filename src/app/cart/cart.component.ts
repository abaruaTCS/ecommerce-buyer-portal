import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../Item';
import { ProductService } from '../ProductService';

@Component({
  templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute, //DI for Activated Route
    private productService: ProductService //DI for Service
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      var id = params['id'];
      if (id) {
        // create item object from database
        var item: Item = {
          product: this.productService.find(id),
          quantity: 1,
        };

        if (localStorage.getItem('cart') == null) {
          //if empty cart add the item above
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          //get the objects in the cart
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            //check if another object with same id exists in the cart
            let item: Item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            //add the nonexistant object in the cart
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            //increment the qty of the existing object in the cart
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
        this.loadCart(); //calculate the total
      } else {
        this.loadCart();
      }
    });
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity,
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1); //remove object by using splice
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }
  cartInfo: any;
  checkOut() {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    this.cartInfo = cart;
    console.log(cart); //you have to call post method to store card details in DB
  }
}
