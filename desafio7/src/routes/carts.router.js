const express = require("express");
const router = express.Router();
const cartModel = require("../dao/models/cart.model.js");
const CartManager = require("../dao/classes/cart.dao.js");
const cartController = require("../controllers/cartController.js");

const cartManager = new CartManager();

router.get("/carts", cartController.getcarts);


router.post("/createcart", cartController.addCart);


router.get("/carts/:cid", cartController.getCartById);

router.post("/carts/:cid/products/:pid", cartController.addToCart);


router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    let { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ Respusta: "Carrito no encontrado" });
    }

    let existProduct = cart.products.find((p) => p.product.toString() === pid);

    if (!existProduct) {
      return res
        .status(404)
        .send({ Respuesta: "Producto no encontrado en el carrito" });
    } else {
      existProduct.quantity++;
      let result = await cartModel.updateOne(
        { _id: cid },
        { products: cart.products }
      );

      res.redirect(`/carts/${cid}`);
    }
  } catch (error) {
    res.status(504).send(error);
  }
});


router.delete("/carts/:cid/products/:pid", cartController.deleteProduct);

module.exports = router;
