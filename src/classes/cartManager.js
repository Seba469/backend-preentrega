import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = 'classes/files/carritos.json'

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
        const carros = await this.getCart();
        
        carros.push({ id: uuidV4(), products: [] });
        
        await fs.promises.writeFile(path, JSON.stringify(carros, null, "\t"));
    }

    addProductCart = async (cartId, productId) => {
        const carroPorId = await this.getCartById(cartId);

        //AGREGO O AUMENTO EL PRODUCTO
        const indice = carroPorId.products.findIndex(prod => prod.id == productId)

        if (indice == -1) {
            carroPorId.products.push({ id: productId, quantity: 1 });
        } else {
            carroPorId.products[indice].quantity++;
        }

        //LO GUARDO EN CARRITOS
        const carros = await this.getCart()
        
        const carroIndice = carros.findIndex(carro => carro.id === cartId)
        carros[carroIndice] = carroPorId

        await fs.promises.writeFile(path, JSON.stringify(carros, null,"\t" ))

    }

    getCartById = async (id) => {
        const carros = await this.getCart();

        const carroFiltrado = carros.find(cart => cart.id === id)
        
        return carroFiltrado
    }
}