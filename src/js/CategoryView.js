const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryDOM = document.querySelector("#product-category");
const categoryListWrapper = document.querySelector("#category-list-wrapper");
const categoryWrapper = document.querySelector("#category-wrapper");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-category");

import Storage from "./Storage.js";

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
    categoryDOM.addEventListener("click", (e) => {
      categoryListWrapper.classList.toggle("hidden");
    });

    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategoryBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategories({ title, description });
    this.createCategoryList();
    categoryTitle.value = "";
    categoryDescription.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  createCategoryList() {
    this.setApp();
    let result = "";
    this.categories.forEach((c) => {
      result += `<div class="flex justify-between items-center px-3 mb-1 hover:bg-primarydark category-list-item cursor-pointer">
        ${c.title}
        <i class="fa-solid fa-xmark cursor-pointer text-red" data-id=${c.id}></i>
      </div>`;
    });
    categoryListWrapper.innerHTML = result;
    categoryListWrapper.addEventListener("click", (e) => {
      this.removeCategoryListItem(e);
      document.querySelector("#product-category span").innerText= e.target.innerText;
      if(e.target.classList.contains("category-list-item")) categoryListWrapper.classList.add("hidden");
    });
  }

  removeCategoryListItem(e) {
    const item = e.target;
    const id = item.dataset.id;
    if (item.classList.contains("fa-xmark")) {
      Storage.deleteCategory(id);
      categoryListWrapper.removeChild(item.parentElement);
    }
  }

  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
