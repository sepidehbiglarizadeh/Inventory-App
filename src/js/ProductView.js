import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").innerText;
    if (!title || !quantity) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    document.querySelector("#product-title").value = " ";
    document.querySelector("#product-quantity").value = " ";
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList(products) {
    let result = "";
    let num = 0;
    products.forEach((p) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.title.toLowerCase() == p.category.toLowerCase()
      );
      result += `
      <tr class="border-b border-secondarylight">
      <td class="py-2 w-[10%]">${(num += 1)}</td>
      <td class="py-2 capitalize font-bold w-[25%]">${p.title}</td>
      <td class="py-2 w-[20%]">${new Date(p.createdAt).toDateString(
        "en-us"
      )}</td>
      <td class="py-2 w-[25%]">${selectedCategory.title}</td>
      <td class="py-2 w-[10%]">${p.quantity}</td>
      <td class="py-2 w-[10%]">
        <i class="fa-solid fa-pen-to-square mr-2 text-secondarydark cursor-pointer" data-id=${
          p.id
        }></i>
        <i class="fa-solid fa-trash-can text-red cursor-pointer delete-product" data-id=${
          p.id
        }></i>
      </td>
    </tr>`;
    });
    const productDom = document.querySelector("#products-list");
    productDom.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  deleteProduct(e) {
    const productId = e.target.dataset.id;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
