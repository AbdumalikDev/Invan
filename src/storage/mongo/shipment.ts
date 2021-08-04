import { ShipmentRepo, IShipmentAllResponse } from "../repo/shipment"
import Shipment, { IShipment } from "../../models/Shipment"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class ShipmentStorage implements ShipmentRepo {
    private scope = "storage.shipment"

    async find(query: Object): Promise<IShipment[]> {
        try {
            let shipments = await Shipment.find(query).populate('products')
            if (!shipments) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Shipment not found', 'shipment')
            }

            return shipments
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IShipment> {
        try {
            let dbObj = await Shipment.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "shipment")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async findById(id: string): Promise<IShipment> {
        try {
            let dbObj = await Shipment.findById(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "shipment")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IShipment): Promise<IShipment> {
        try {
            let dbObj = await Shipment.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IShipment): Promise<IShipment> {
        try {
            let dbObj = await Shipment.findByIdAndUpdate(query, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found", "shipment")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            let dbObj = await Shipment.findOneAndDelete(query)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found", "shipment")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
