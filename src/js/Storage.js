export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    return savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }

  static saveCategories(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toDateString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("product")) || [];
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }

  static deleteCategory(id){
    const categories= Storage.getAllCategories();
    const filteredCategories= categories.filter((c)=> c.id !== parseInt(id));
    localStorage.setItem("category",JSON.stringify(filteredCategories));
  }

  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((p) => p.title.trim().toLowerCase() === productToSave.title.trim().toLowerCase());
    console.log(existedItem);
    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
      existedItem.createdAt = new Date().toISOString();
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("product", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("product", JSON.stringify(filteredProducts));
  }

  static editProduct(id){
    const savedProducts= Storage.getAllProducts();
    return savedProducts.find((p)=> p.id === parseInt(id));
  }
}
