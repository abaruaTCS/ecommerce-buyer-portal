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
  notify: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private companyService: CompanyService,
    public auth: AuthService
  ) {}

  brandRef = new FormGroup({
    cname: new FormControl(),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });
    this.companyService.getCompanies().subscribe((result) => {
      this.companies = result;
      console.log(result);
    });
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      console.log(result);
    });
  }
}
