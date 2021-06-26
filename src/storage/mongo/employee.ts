import { EmployeeRepo, IEmployeeAllResponse } from '../repo/employee'
import Employee, { IEmployee } from '../../models/Employee'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class EmployeeStorage implements EmployeeRepo {
    private scope = 'storage.employee'

    async findOne(query: Object): Promise<IEmployee> {
        try {
            let employee = await Employee.findOne({ ...query })

            if (!employee) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Employee not found', 'emp')
            }

            return employee
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IEmployee): Promise<IEmployee> {
        try {
            let newEmployee = await Employee.create(payload)

            return newEmployee
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async userExist(query: Object): Promise<boolean> {
        try {
            const employee = await Employee.findOne({ ...query })

            if (!employee) {
                return false
            }

            return true
        } catch (error) {
            logger.error(`${this.scope}.userExist: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: Object): Promise<IEmployee> {
        try {
            const newEmployee = await Employee.findOneAndUpdate({ ...query }, payload, {
                new: true
            })

            if (!newEmployee) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Employee not found', 'emp')
            }

            return newEmployee
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
}
