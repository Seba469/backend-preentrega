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
    
    if (producto != null){
        res.send(producto)
    }else{
        res.send({status: "Ese producto no exite"})
    }
})

router.post('/', async (req, res) => {
    productManager.addProducts(req.body);
    res.send({ status: "success" });
});

router.delete('/:id', async (req, res) => {
    const resultado = await productManager.deletProduct(req.params.id)

    if (resultado === null){
        res.send({status: "Ese producto no exite"})
    }else{
        res.send({ status: "success" });
    }  
})

router.put('/:id', async (req, res) => {
    const resultado = await productManager.updateProduct(req.params.id, req.body)

    if (resultado === null){
        res.send({status: "Ese producto no exite"})
    }else{
        res.send({ status: "success" });
    }  
})

export default router;