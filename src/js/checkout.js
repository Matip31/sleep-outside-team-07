
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.init();

const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    alert("Your order has been placed successfully!");
});
