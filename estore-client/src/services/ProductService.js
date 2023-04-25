import API from "../api/API";
import endpoints from "../api/endpoints";

class ProductService {
    static createProduct(prod) {
        return API.post(endpoints.api.product.create, prod);
    }
    static updateProduct(id, prod) {
        return API.put(endpoints.api.product.update + id, prod);
    }
    static deleteProduct(id) {
        return API.delete(endpoints.api.product.delete + id);
    }
    static fetchOneProduct(id) {
        return API.get(endpoints.api.product.getOne + id);
    }
    static fetchAllProduct(query="") {
        return API.get(endpoints.api.product.getAll + query);
    }
    static fetchConfig() {
        return API.get(endpoints.api.product.getConfig)
    }
}

export default ProductService;