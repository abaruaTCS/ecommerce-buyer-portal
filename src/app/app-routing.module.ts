// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { CartComponent } from './cart/cart.component';
// import { ProductComponent } from './product/product.component';

// const routes: Routes = [
// 	{ path: '', component: ProductComponent },
// 	{ path: 'products', component: ProductComponent },
// 	{ path: 'cart', component: CartComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
// import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  // { path: 'product', component: ProductComponent },
  //   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
