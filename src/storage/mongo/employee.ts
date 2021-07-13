import { EmployeeRepo, IEmployeeAllResponse } from '../repo/employee'
import Employee, { IEmployee } from '../../models/Employee'
import  { IOrganization } from '../../models/Organization'
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

    async findAndPopulate(query: Object): Promise<IEmployee> {
        try {
            let employee = await Employee.findOne({ ...query }).populate('org_id')
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

    async findAllandPopulate(query: Object): Promise<IEmployee[]> {
        try {
            let employee = await Employee.find({ ...query }).populate('org_id')
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

    async deleteMany(query: Object):Promise<any>{
        try {
            let employee = await Employee.deleteMany({ ...query })

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

}
