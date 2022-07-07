import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js"

document.addEventListener("DOMContentLoaded",()=>{
    CategoryView.setApp();
    ProductView.setApp();
    CategoryView.createCategoryList();
    ProductView.createProductsList(ProductView.products);
});