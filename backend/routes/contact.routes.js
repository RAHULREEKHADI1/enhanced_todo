import express, { Router } from 'express';
import { feedback } from '../controller/contact.controller.js';

const contactRouter = Router();

contactRouter.post('/feedback',feedback);
export default contactRouter;