import express from 'express'
import shareController from '../controllers/share.controller'

const ShareRoutes = express.Router()


ShareRoutes.get('/upload', shareController.upload)
ShareRoutes.get('/download/:id', shareController.download)


export default ShareRoutes 