import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderTotal: number = 0;
  estimatedDeliveryDate: string = '';
  cart: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.calculateOrderTotal();
    this.calculateEstimatedDeliveryDate();
  }

  addToCart(product: any): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.calculateOrderTotal();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.calculateOrderTotal();
  }

  private calculateOrderTotal(): void {
    this.orderTotal = this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private calculateEstimatedDeliveryDate(): void {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    this.estimatedDeliveryDate = deliveryDate.toDateString();
  }
  confirmOrder(): void {
    let orderSummary = 'Order Summary:\n';
    let totalPrice = 0;
  
    this.cart.forEach((item) => {
      orderSummary += `- ${item.name} (${item.quantity} units) - $${item.price * item.quantity}\n`;
      totalPrice += item.price * item.quantity;
    });
  
    orderSummary += `Total Price: $${totalPrice}`;
  
    alert(orderSummary);
  }
}