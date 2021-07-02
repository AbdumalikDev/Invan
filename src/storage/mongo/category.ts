import { CategoryRepo } from '../repo/category'
import Category, { ICategory } from '../../models/Category'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class CategoryStorage implements CategoryRepo {
    private scope = 'storage.category'

    async create(payload: ICategory): Promise<ICategory> {
        try {
            const category = await Category.create(payload)

            return category
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: ICategory): Promise<ICategory> {
        try {
            const category = await Category.findByIdAndUpdate(id, payload)

            if (!category) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Category not found', 'category')
            }

            return category
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<ICategory[]> {
        try {
            const categories = await Category.find(query)

            return categories
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findById(id: String): Promise<ICategory> {
        try {
            const category = await Category.findById(id).populate('sub_categories')

            if (!category) {
                logger.warn(`${this.scope}.findById failed to findById`)
                throw new AppError(404, 'Category not found', 'categ')
            }

            return category
        } catch (error) {
            logger.error(`${this.scope}.findById: finished with error: ${error}`)
            throw error
        }
    }
}
