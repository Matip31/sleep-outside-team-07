
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.init();

const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await checkout.checkout(checkoutForm);

        console.log("Order submitted:", response);
        alert("Your order has been placed successfully!");
    } catch (error) {
        console.error("Checkout error:", error);
        alert("There was a problem placing your order. Please try again.");
    }
});
