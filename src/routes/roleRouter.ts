import { Request, Response, Router } from "express";
import { RoleController } from "../controllers/roleController";

const router = Router();
const controller = new RoleController();

router.get('/', async (req:Request, res:Response) => {
    const response = await controller.get(req);
    res.status(response.status).json(response.response);
});

export default router;