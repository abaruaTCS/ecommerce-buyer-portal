import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

// !update the app.module.ts
// !need to modify product route and controller to search by name

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'http://localhost:5000/api/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductsByCompanyName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/${name}`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }
}
