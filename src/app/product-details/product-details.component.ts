import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  name: string;
  price: string;
  details: string;
  image: string;
  company: string;

  constructor(
    public auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.name = params['name'];
      this.price = params['price'];
      this.company = params['company'];
      this.image = params['image'];
      this.details = params['details'];
    });
  }
}
