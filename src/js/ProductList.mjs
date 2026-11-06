import { renderListWithTemplate } from "./utils.mjs";
export default class ProductList {
    constructor(dataSource, category, listElement) {
        this.dataSource = dataSource;
        this.category = category;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        console.log("Productos obtenidos:", list);
        this.renderList(list);
    }
    productCardTemplate(product) {
        return `
        <li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
                <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
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