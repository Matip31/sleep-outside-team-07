
import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor() {
        this.cart = getLocalStorage("so-cart") || [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;

        this.externalServices = new ExternalServices();
    }

    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: Number(item.FinalPrice),
            quantity: 1,
        }));
    }

    calculateItemSubtotal() {
        this.subtotal = this.cart.reduce((total, item) => {
            return total + Number(item.FinalPrice);
        }, 0);

        document.querySelector("#subtotal").textContent =
            `$${this.subtotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.tax = this.subtotal * 0.06;

        this.shipping = this.cart.length > 0
            ? 10 + (this.cart.length - 1) * 2
            : 0;

        this.orderTotal = this.subtotal + this.tax + this.shipping;

        document.querySelector("#tax").textContent =
            `$${this.tax.toFixed(2)}`;

        document.querySelector("#shipping").textContent =
            `$${this.shipping.toFixed(2)}`;

        document.querySelector("#order-total").textContent =
            `$${this.orderTotal.toFixed(2)}`;
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

    async checkout(form) {
        try {
            const order = formDataToJSON(form);
            const [year, month] = order.expiration.split("-");
            order.expiration = `${Number(month)}/${year.slice(-2)}`;
            order.orderDate = new Date().toISOString();
            order.orderTotal = this.orderTotal.toFixed(2);
            order.tax = this.tax.toFixed(2);
            order.shipping = this.shipping;
            order.items = this.packageItems(this.cart);
            const result = await this.externalServices.checkout(order);
            localStorage.removeItem("so-cart");
            window.location.href = "./success.html";
            return result;
        } catch (err) {
            console.error("Checkout error:", err);
            throw err;
        }
    }
}
