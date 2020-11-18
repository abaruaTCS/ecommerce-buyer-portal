import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  companies: Company[];
  products: Product[];
  showProducts: Product[];
  notify: string;

  brandRef = new FormGroup({
    cname: new FormControl(),
  });

  companyLoaded: boolean = false;
  productLoaded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private companyService: CompanyService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });
    // works
    this.companyService.getCompanies().subscribe((result) => {
      this.companies = result;
      localStorage.setItem('companies', JSON.stringify(this.companies));
      this.companyLoaded = true;
      // console.log(JSON.parse(localStorage.getItem('companies')));
      // setTimeout(function () {}, 5000);
    });
    // console.log(JSON.parse(localStorage.getItem('companies')));
    // works
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      this.showProducts = result;
      localStorage.setItem('productsList', JSON.stringify(this.products));
      localStorage.setItem('showProducts', JSON.stringify(this.showProducts));
      this.productLoaded = true;
      // setTimeout(function () {}, 5000);
      // console.log(this.showProducts);
    });
    // console.log(JSON.parse(localStorage.getItem('productsList')));
    // console.log(JSON.parse(localStorage.getItem('showProducts')));
  }

  clearAll(): void {
    // let l = JSON.parse(localStorage.getItem('productsList'));
    this.showProducts = [];
    for (var i = 0; i < this.products.length; i++) {
      // let c = JSON.parse(l[i]);
      // console.log(l[i]);
      // if (l[i].company == name) {
      this.showProducts.push(this.products[i]);
      // }
    }
  }

  selectCompany(): void {
    var name = this.brandRef.value['cname'];
    console.log(name);
    this.showProducts = [];
    let l = JSON.parse(localStorage.getItem('productsList'));
    console.log(l);
    for (var i = 0; i < l.length; i++) {
      // let c = JSON.parse(l[i]);
      console.log(l[i]);
      if (l[i].company == name) {
        this.showProducts.push(this.products[i]);
      }
    }
    console.log(this.showProducts);
  }
}
