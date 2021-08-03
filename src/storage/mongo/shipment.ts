import { ShipmentRepo, IShipmentAllResponse } from '../repo/shipment'
import Shipment, { IShipment } from '../../models/Shipment'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ShipmentStorage implements ShipmentRepo {
    private scope = 'storage.shipment'

    async find(query: Object): Promise<IShipment[]> {
        try {
            let shipment = await Shipment.find({ ...query })

            return shipment
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IShipment> {
        try {
            let shipment = await Shipment.findOne({ ...query })

            if (!shipment) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Db object is not found', 'shipment')
            }

            return shipment
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IShipment): Promise<IShipment> {
        try {
            let shipment = await Shipment.create(payload)

            return shipment
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IShipment): Promise<IShipment> {
        try {
            let shipment = await Shipment.findByIdAndUpdate(query, payload, {
                new: true
            })

            if (!shipment) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Db object is not found', 'shipment')
            }

            return shipment
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async deleteMany(query: Object): Promise<any> {
        try {
            let shipment = await Shipment.deleteMany(query)

            if (!shipment) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'Db object is not found', 'shipment')
            }

            return shipment
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
