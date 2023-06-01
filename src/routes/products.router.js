import { Router } from "express";
import ProductManager from "../classes/productManager.js";

const router = Router();

const productManager = new ProductManager

router.get('/', async (req, res) => {
    const productos = await productManager.getProducts(req.query.limit)
    res.send(productos);
});

router.get('/:id', async (req, res) => {
    const producto = await productManager.getProductById(req.params.id)
    res.send(producto)
})

router.post('/', async (req, res) => {
    productManager.addProducts(req.body);
    res.send({ status: "success" });
});

router.delete('/:id', async (req, res) => {
    productManager.deletProduct(req.params.id)
    res.send({ status: "success" });
})

router.put('/:id', async (req, res) => {
    console.log('***********')
    console.log(req.params.id)
    console.log(req.body)
    console.log('***********')
    productManager.updateProduct(req.params.id, req.body)
    res.send({ status: "success" });
})

export default router;