import fs from 'fs'
import {v4 as uuidV4} from 'uuid'
//import ProductManager from "../classes/productManager.js";
import ProductManager from './productManager.js'

const path = './src/classes/files/carritos.json'
const productManager = new ProductManager

export default class CartManager{
    getCart = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8");
            const carros = JSON.parse(data)
        
            return carros;
        } else {
            return [];
        }
    }
    
    addCart = async () => {
        try{
            const carros = await this.getCart();
            
            carros.push({ id: uuidV4(), products: [] });
            
            await fs.promises.writeFile(path, JSON.stringify(carros, null, "\t"));
        }
        catch(error){
            console.error(error)
        }
    }

    addProductCart = async (cartId, productId) => {
        try{
            const carroPorId = await this.getCartById(cartId);
            const productoElegido = await productManager.getProductById(productId)
            let indice

            if (carroPorId != null && productoElegido != null){
                indice = carroPorId.products.findIndex(prod => prod.id == productId)

                if (indice == -1) {
                    carroPorId.products.push({ id: productId, quantity: 1 });
                } else {
                    carroPorId.products[indice].quantity++;
                }

                const carros = await this.getCart()
        
                const carroIndice = carros.findIndex(carro => carro.id === cartId)
                carros[carroIndice] = carroPorId
        
                await fs.promises.writeFile(path, JSON.stringify(carros, null,"\t" ))
                
            }else{
                return null
            }
        }
        catch(error){
            console.error(error)
        }
    }

    getCartById = async (id) => {
        const carros = await this.getCart();
        const carroFiltrado = carros.find(cart => cart.id === id)

        if (carroFiltrado != undefined){
            return carroFiltrado
        }else{
            return null
        }  
    }
}