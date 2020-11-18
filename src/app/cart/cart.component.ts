import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Item } from '../Item';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  total: number = 0;
  product: Product;
  name: string;
  details: string;
  image: string;
  price: string;
  id: string;
  items: Item[] = [];
  flg: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('total', JSON.stringify(this.total));
    this.activatedRoute.params.subscribe((params) => {
      this.name = params['name'];
      this.details = params['details'];
      this.image = params['image'];
      this.price = params['price'];
      this.id = params['id'];
      // console.log(this.id);

      this.product = new Product();
      this.product._id = this.id;
      this.product.name = this.name;
      this.product.image = this.image;
      this.product.price = this.price;
      this.product.details = this.details;

      if (this.id) {
        if (localStorage.getItem('cart') == null) {
          var item: Item = {
            product: this.product,
            quantity: 1,
          };
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));

          // this.items.push(item);
          // this.total = eval(this.product.price);
          // test point 1
          // check to see if it triggers when starting with and empty array
          // should have only one item in the array
          // only occur once
          console.log('test point 1');
          console.log(JSON.parse(localStorage.getItem('cart')));
          // console.log(this.total);
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          var idx = -1;
          // var flag = true;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.product._id == this.id) {
              idx = i;
              // flag = false;
              break;
            }
          }
          if (idx < 0) {
            var item: Item = {
              product: this.product,
              quantity: 1,
            };
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
            // this.items.push(item);
            // this.total += eval(this.product.price);
            // test point 2
            // didn't find a matchin product in the items list
            // size of the array should increase
            // total should increase
            // happens multiple times
            console.log('test point 2');
            console.log(JSON.parse(localStorage.getItem('cart')));
            // console.log(this.total);
          } else {
            let item: Item = JSON.parse(cart[idx]);
            item.quantity += 1;
            cart[idx] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            // this.items[idx].quantity += 1;
            // this.total += eval(this.items[idx].product.price);
            // test point 3
            // size of the items list does not increase
            // quantity increases
            // total should increase
            // happens multiple times
            console.log('test point 3');
            console.log(JSON.parse(localStorage.getItem('cart')));
            // console.log(this.total);
          }
        }
        this.loadCart();
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
      this.total += eval(item.product.price) * eval(item.quantity);
    }
  }

  //work on remove after debugging
  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    var idx = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product._id == id) {
        cart.splice(i, 1);
        break;
        // idx = i;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // if (idx > -1) {
    //   this.total -= eval(this.items[i].product.price);
    //   this.items.splice(idx, 1);
    // }
    // test point 4
    // size of the item list should decrease
    // total should decrease
    // happens multiple times
    console.log('test point 4');
    console.log(JSON.parse(localStorage.getItem('cart')));
    // console.log(this.total);
    this.loadCart();
  }

  checkout(): void {
    this.flg = false;
    // let cart: any = JSON.parse(localStorage.getItem('cart'));
    let cart: any = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    this.items = [];
    this.total = 0;
    // test point 5
    // size of the items list should be zero
    // total should be 0
    console.log('test point 5');
    console.log(this.items);
    console.log(this.total);
  }
}
