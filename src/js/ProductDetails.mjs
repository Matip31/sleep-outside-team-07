import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product);
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        cartItems.push(this.product);

        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}


function productDetailsTemplate(product) {
    document.querySelector("h3").textContent = product.Brand.Name;

    document.querySelector("h2").textContent =
        product.NameWithoutBrand;

    const productImage = document.querySelector("#productImage");
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    const euroPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(Number(product.FinalPrice) * 0.85);

    document.querySelector("#productPrice").textContent = euroPrice;

    document.querySelector("#productColor").textContent =
        product.Colors[0].ColorName;

    document.querySelector("#productDesc").innerHTML =
        product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;
}
