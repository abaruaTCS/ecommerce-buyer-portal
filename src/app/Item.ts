import { Product } from './productOrg';

export class Item {
  constructor(public product: Product, public quantity: number) {} //reference of product and reference of quantity. product in a complex property comprised of multiple properties.
}
