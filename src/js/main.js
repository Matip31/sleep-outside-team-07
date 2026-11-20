import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
const dataSource = new ExternalServices("tents");
const productList = new ProductList(
  dataSource,
  "tents",
  document.getElementById("product-list"),
);
productList.init();
loadHeaderFooter();
