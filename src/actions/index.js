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

export function takeProduct(params) {
  return $axios.post("product/take", params);
}
export function editProNum(params) {
  return $axios.post("product/car/edit", params);
}
//供货商目录
export function companyList(params) {
  return $axios.post("company/list", params);
}

export function getPrintOrderData(id) {
  return $axios.post(`/order/print/${id}`);
}


/**
 * 获取单位列表
 * @param {*} params
 */
export function getUnitSelect(params) {
  return $axios.post(`/select/unit`, params);
}


/**
 * 获取部门列表
 * @param {*} params
 */
export function getDepartSelect(unitId) {
  return $axios.post(`/select/depart/${unitId}`);
}
//招投标
export function addBid(params) {
  return $axios.post("/bid/add",params);
}

export function getBidMyList(params) {
  return $axios.post("/bid/my/list",params);
}

export function getBidFirstList(params) {
  return $axios.post("/bid/first/list",params);
}

export function getBidSecondList(params) {
  return $axios.post("/bid/second/list",params);
}

export function getBidFinishList(params) {
  return $axios.post("/bid/finish/list",params);
}

export function verifyBid(params) {
  return $axios.post("/bid/verify",params);
}

