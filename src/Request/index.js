import Request from "./Request";
import cart from "./Entity/cart";

const baseURL = "/";

const request_object = new Request(baseURL);
export const Cart = new cart(request_object);
