import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = []; // Array of Product objects

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => (this.products = products));
  }

  addToCart(product: Product): void {
    // Remove the existing product from the cart using filter
    this.cart = this.cart.filter((p) => p.id !== product.id);

    // Add the product with the updated quantity
    this.cart.push({ ...product, quantity: (this.cart.find((p) => p.id === product.id)?.quantity ?? 0) + 1 });

    console.log(`${product.name} added to cart.`);
    console.log('Cart:', this.cart);
  }
}