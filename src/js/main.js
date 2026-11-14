import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
const dataSource = new ProductData("tents");
const productList = new ProductList(
  dataSource,
  "tents",
  document.getElementById("product-list"),
);
productList.init();
loadHeaderFooter();
