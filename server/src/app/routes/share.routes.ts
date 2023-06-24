import express from 'express'
import shareController from '../controllers/share.controller'
import { uploadMiddleware } from '../middlewares'

const ShareRoutes = express.Router()


ShareRoutes.get('/', shareController.index);
ShareRoutes.post('/upload', uploadMiddleware, shareController.upload)
ShareRoutes.get('/download/:id', shareController.download)


export default ShareRoutes 