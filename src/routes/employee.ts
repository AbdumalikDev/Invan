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

router.route('/admin').get(AuthMiddleware, orgController.admin)

router.route('/logout').get(AuthMiddleware, orgController.logout)

router
    .route('/create')
    .post(AuthMiddleware, fileUpload(), validator.employeCreate, empController.create)

router
    .route('/edit/:id')
    .get(AuthMiddleware, empController.getEmployee)
    .put(AuthMiddleware, fileUpload(), validator.employeCreate, empController.editEmployee)

router.route('/delete').delete(AuthMiddleware, empController.deleteEmployees)

router.route('/all').get(AuthMiddleware, empController.getAllEmployee)

export default router
