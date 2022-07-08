import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const sortProductsList = document.querySelector("#sort-products");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector("#close-modal");
const modalDatalist = document.querySelector("#modal-datalist");
const modalAcceptBtn = document.querySelector("#modal-accept-btn");


class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortProductsList.addEventListener("change", (e) => this.sortProducts(e));
    closeModalBtn.addEventListener("click", () => this.closeModal());
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
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
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
        <i class="fa-solid fa-pen-to-square mr-2 text-secondarydark cursor-pointer edit-product-btn" data-id=${
          p.id
        }></i>
        <i class="fa-solid fa-trash-can text-red cursor-pointer delete-product-btn" data-id=${
          p.id
        }></i>
      </td>
    </tr>`;
    });
    const productDom = document.querySelector("#products-list");
    productDom.innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".delete-product-btn")];
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const editBtns = document.querySelectorAll(".edit-product-btn");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.editProduct(e);
        this.showModal();
      });
    });
  }

  deleteProduct(e) {
    const productId = e.target.dataset.id;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }

  editProduct(e) {
    const productId = e.target.dataset.id;
    const product = Storage.editProduct(productId);
    document.querySelector("#modal-title").value = product.title;

    const categories = Storage.getAllCategories();

    let result = `<option value="" selected disabled>Select a category</option>`;
    categories.forEach((c) => {
      result += `<option value${c.title}>${c.title}</option>`;
    });
    modalDatalist.innerHTML = result;
    
    modalDatalist.addEventListener("change",()=>{
        modalAcceptBtn.disabled=false
        modalAcceptBtn.style.opacity="1";
      });

    modalAcceptBtn.addEventListener("click", () => {
      product.title = document.querySelector("#modal-title").value;
      product.quantity = document.querySelector("#modal-quantity").value;
      product.category = modalDatalist.options[modalDatalist.selectedIndex].text;
      Storage.saveProducts(product);
      this.products= Storage.getAllProducts();
      this.createProductsList(this.products);
      this.closeModal();
    });

  }

  searchProducts(e) {
    const value = e.target.value;
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  showModal() {
    modal.style.opacity = "1";
    modal.style.transform = "translateY(120vh)";
    backDrop.style.display = "block";
  }

  closeModal() {
    modal.style.opacity = "0";
    modal.style.transform = "translateY(-100vh)";
    backDrop.style.display = "none";
  }
}

export default new ProductView();
