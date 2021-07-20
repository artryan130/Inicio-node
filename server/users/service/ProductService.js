const Product = require('../model/Product');
const PermissionError = require('../../error/PermissionError');
const QueryError = require('../../error/QueryError');

class ProductService{
    async getAllProduct(){
        const result = await Product.findAll();
        return result;
    }

    async createProduct(product){
        await Product.create(product);
    }

    async getProductById(id){
        const product = await Product.findByPk(id);

        if(!product){
            throw new QueryError('O produto nao foi encontrado');
        }
        
        return product;
    }

    async updateProductInfo(id, reqUserId, reqUserRole, body){
        const product = await Product.findByPk(id);

        if(!product){
            throw new QueryError('O produto nao foi encontrado');
        }

        const isAdmin = reqUserRole === 'admin';
        const isProductOwner = reqUserId == product.UserId;
    
        if(!isAdmin && !isProductOwner){
            throw new PermissionError('Voce nao tem permissao');
        }

        await Product.update(body);
    }

    async deleteProduct(id, reqUserId, reqUserRole){
        const product = await Product.findByPk(id);

        if(!product){
            throw new QueryError('O produto nao foi encontrado');
        }

        const isAdmin = reqUserRole === 'admin';
        const isProductOwner = reqUserId == product.UserId;
    
        if(!isAdmin && !isProductOwner){
            throw new PermissionError('Voce nao tem permissao');
        }

        await Product.delete();
    }
}

module.exports = new ProductService;