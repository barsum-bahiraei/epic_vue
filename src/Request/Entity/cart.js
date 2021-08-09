import EntityBase from "../EntityBase";

export default class User extends EntityBase {
  add(id = 0, item_id = 0) {
    return this.request
      .post("cart/addItem/" + id)
      .addData("item_id", item_id)
      .run();
  }
}
