import { Request, Response, Router } from "express";
import { SubjectController } from "../controllers/subjectController";

const router = Router();
const controller = new SubjectController();

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