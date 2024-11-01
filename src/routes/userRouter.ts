import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController();

router.get('/', async (req:Request, res:Response) => {
    const response = await controller.get(req);
    res.status(response.status).json(response.response);
});

router.post('/', async (req:Request, res:Response) => {
    const response = await controller.post(req);
    res.status(response.status).json(response.response);
});

router.put('/', async (req:Request, res:Response) => {
    const response = await controller.put(req);
    res.status(response.status).json(response.response);
});

export default router;