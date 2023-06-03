import { error } from 'console'
import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = './src/classes/files/productos.json'

export default class ProductManager{

    getProducts = async (limit) => {
        if (fs.existsSync(path)){
            const leeFs = await fs.promises.readFile(path, "utf-8")
            const productos = JSON.parse(leeFs);
            
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
        //Preguntar si puedo pedir que ingresen cieta cantidad de datos
        try{
            const productos = await this.getProducts()
                    
            producto.id = uuidV4()
            productos.push(producto)

            await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        }
        catch (error){
            console.error(error)
        }
    }

    deletProduct = async (id) => {
        try{   
            const productos = await this.getProducts()
            const productosFiltrados = productos.filter(prod => prod.id != id)

            if (productos.length != productosFiltrados.length){
                await fs.promises.writeFile(path, JSON.stringify(productosFiltrados, null, '\t'))
            }else{
                return null              
            }   
        }
        catch(error){
            console.log(error)
        }
    }

    getProductById = async (id) => {
        const productos = await this.getProducts()
        
        const productoFiltrado = productos.find(prod => prod.id === id)
        
        if (productoFiltrado != undefined){
            return productoFiltrado
        }else{
            return null
        }      
    }

    updateProduct = async (id, infoNueva) => {
        try{
            const producto = await this.getProductById(id)
            const productos = await this.getProducts()
            let productoNuevo
            let indice

            if (producto != null){
                productoNuevo = {...producto, ...infoNueva}
                indice = productos.findIndex(prod => prod.id === id)
                productos[indice] = productoNuevo
            }else{
                return null
            }
            console.log(producto)
            console.log('--------------')
            console.log(productoNuevo)
            console.log('--------------')
            console.log(indice)
            console.log('--------------')
            console.log(productos)
            // await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        }
        catch(error){
            console.log(error)
        }
    }
}