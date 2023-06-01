import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = 'classes/files/productos.json'

export default class ProductManager{

    getProducts = async (limit) => {
        if (fs.existsSync(path)){
            const leeFs = await fs.promises.readFile(path, "utf-8")
            const productos = JSON.parse(leeFs);
            
            console.log(limit)
            if (limit != undefined){
                let i
                let productosLimits = []

                for (i = 0; i < limit; i++){
                    productosLimits.push(productos[i])
                }

                return productosLimits
            }else{
                return productos
            }           
        }else{
            return []
        }
    }

    addProducts = async (producto) => {
        const productos = await this.getProducts()
                
        producto.id = uuidV4()
        
        productos.push(producto)
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
    }

    deletProduct = async (id) => {
        const productos = await this.getProducts()

        const productosFiltrados = productos.filter(prod => {
            return prod.id != id
        })

        await fs.promises.writeFile(path, JSON.stringify(productosFiltrados, null, '\t'))
    }

    getProductById = async (id) => {
        const productos = await this.getProducts()
        
        const productoFiltrado = productos.find(prod => prod.id === id)
        
        return productoFiltrado
    }

    updateProduct = async (id, infoNueva) => {
        const producto = await this.getProductById(id)
        const productoNuevo = {...producto, ...infoNueva}

        const productos = await this.getProducts()
        const indice = productos.findIndex(prod => prod.id === id)
        
        productos[indice] = productoNuevo

        console.log(producto)
        console.log('--------------')
        console.log(productoNuevo)
        console.log('--------------')
        console.log(indice)
        console.log('--------------')
        console.log(productos)
       // await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
    }
}