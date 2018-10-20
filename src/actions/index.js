import $axios from "../util";

export function getProductListType(params) {
  return $axios.post("/select/product", params);
}

export function getProductList(params) {
  return $axios.post("/product/list", params);
}

export function getProductDetail(id) {
  return $axios.post(`product/find/${id}`);
}

export function login(params) {
  return $axios.post("/root/login", params);
}

export function addToCart(params) {
  return $axios.post("/product/car/add", params);
}

export function getCartList(params) {
  return $axios.post("/product/car/find", params);
}

export function getOrderInList(params) {
  return $axios.post("/order/list", params);
}

export function addNormalOrder(params) {
  return $axios.post("/order/add/normal", params);
}

export function addNoNormalOrder(params) {
  return $axios.post("/order/add/no/normal", params);
}

export function deleteCartById(id) {
  return $axios.post(`/product/car/delete/${id}`);
}

export function getOrderDetail(id) {
  return $axios.post(`/order/find/${id}`);
}

export function takeProduct(id) {
  return $axios.post(`/product/take/${id}`);
}
export function editProNum(params) {
  return $axios.post("product/car/edit", params);
}
//供货商目录
export function companyList(params) {
  return $axios.post("company/list", params);
}
