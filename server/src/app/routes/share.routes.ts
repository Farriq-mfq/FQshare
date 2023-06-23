import express from 'express'
import multer from 'multer'
import shareController from '../controllers/share.controller'

const ShareRoutes = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

ShareRoutes.post('/upload', upload.single('file'), shareController.upload)
ShareRoutes.get('/download/:id', shareController.download)


export default ShareRoutes 