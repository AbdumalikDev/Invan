import { ProductRepo } from '../repo/product'
import Product, { IProduct } from '../../models/Product'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ProductStorage implements ProductRepo {
    private scope = 'storage.product'

    async create(payload: IProduct): Promise<IProduct> {
        try {
            let newProduct = await Product.create(payload)

            return newProduct
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IProduct): Promise<IProduct> {
        try {
            const product = await Product.findOneAndUpdate(query, payload, { new: true })

            if (!product) {
                logger.warn(`${this.scope}.get failed to findOneAndUpdate`)
                throw new AppError(404, 'Product not found', 'product')
            }

            return product
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async deleteMany(query: Object): Promise<string> {
        try {
            const product = await Product.deleteMany(query)

            if (!product) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Product not found', 'product')
            }

            return 'Product successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IProduct[]> {
        try {
            const products = await Product.find(query).populate('unit').populate('category')

            return products
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IProduct> {
        try {
            const product = await Product.findOne(query).populate('unit category')

            if (!product) {
                logger.warn(`${this.scope}.findOne failed to findOne`)
                throw new AppError(404, 'Product not found', 'product')
            }

            return product
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
