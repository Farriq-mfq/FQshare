import express from 'express';
import shareController from '../controllers/share.controller';
import { uploadMiddleware } from '../middlewares';

const ShareRoutes = express.Router()


ShareRoutes.get('/:id', shareController.index);
ShareRoutes.post('/upload', uploadMiddleware, shareController.upload)


export default ShareRoutes 