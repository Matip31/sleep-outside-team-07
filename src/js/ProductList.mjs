import { renderListWithTemplate } from "./utils.mjs";
export default class ProductList {
    constructor(dataSource, category, listElement) {
        this.dataSource = dataSource;
        this.category = category;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        const title = document.querySelector("#product-list-title");
        title.textContent = this.category;
        this.renderList(list);
    }
    productCardTemplate(product) {
        return `
        <li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}" />
                <h3>${product.Brand.Name}</h3>
                <h2>${product.NameWithoutBrand}</h2>
                <p>${product.FinalPrice}</p>
                <p>${product.Colors[0].ColorName}</p>
                <p>${product.DescriptionHtmlSimple}</p>
            </a>
        </li>
        `;
    }
    renderList(products) {
        renderListWithTemplate(products, this.productCardTemplate, this.listElement);
    }
}