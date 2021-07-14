import { ReceiptRepo } from '../repo/receipt'
import Receipt, { IReceipt } from '../../models/Receipt'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ReceiptStorage implements ReceiptRepo {
    private scope = 'storage.receipt'

    async create(payload: IReceipt): Promise<IReceipt> {
        try {
            const receipt = await Receipt.create(payload)

            return receipt
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IReceipt): Promise<IReceipt> {
        try {
            const receipt = await Receipt.findOneAndUpdate(query, payload, { new: true })

            if (!receipt) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Receipt not found', 'receipt')
            }

            return receipt
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<string> {
        try {
            const receipt = await Receipt.findOneAndDelete(query)

            if (!receipt) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Receipt not found', 'receipt')
            }

            return 'Receipt successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IReceipt[]> {
        try {
            const receipts = await Receipt.find({ query })

            return receipts
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }
}
