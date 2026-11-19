
import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor() {
        this.cart = getLocalStorage("so-cart") || [];
        this.subtotal = 0;
    }

    calculateItemSubtotal() {
        this.subtotal = this.cart.reduce((total, item) => {
            return total + Number(item.FinalPrice);
        }, 0);

        document.querySelector("#subtotal").textContent =
            `$${this.subtotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        const tax = this.subtotal * 0.06;

        let shipping = 0;

        if (this.cart.length > 0) {
            shipping = 10 + (this.cart.length - 1) * 2;
        }

        const orderTotal = this.subtotal + tax + shipping;

        document.querySelector("#tax").textContent =
            `$${tax.toFixed(2)}`;

        document.querySelector("#shipping").textContent =
            `$${shipping.toFixed(2)}`;

        document.querySelector("#order-total").textContent =
            `$${orderTotal.toFixed(2)}`;
    }

    init() {
        this.calculateItemSubtotal();

        const zipInput = document.querySelector("#zip");

        zipInput.addEventListener("change", () => {
            if (zipInput.value.trim() !== "") {
                this.calculateOrderTotal();
            }
        });
    }
}
