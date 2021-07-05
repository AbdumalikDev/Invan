import express, { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { OrgController } from '../controllers/organization'
import { EmployeeController } from '../controllers/employee'
import { UserValidator } from '../validators/emloyee'
import fileUpload from 'express-fileupload'
import path from 'path'

const router = Router({ mergeParams: true })
const orgController = new OrgController()
const empController = new EmployeeController()
const validator = new UserValidator()

router.route('/register').post(validator.register, orgController.create)

router.route('/login').post(validator.login, empController.login)

router.route('/activate/:token').get(empController.activate)

router.use('/image', express.static(path.join(__dirname, '../', 'assets', 'images')))

router.use(AuthMiddleware)

router.route('/logout').get(orgController.logout)

router.route('/create').post(fileUpload(), validator.employeCreate, empController.create)

router
    .route('/edit/:id')
    .get(empController.getEmployee)
    .put(fileUpload(), validator.employeCreate, empController.editEmployee)

router.route('/all').get(empController.getAllEmployee)

export default router
