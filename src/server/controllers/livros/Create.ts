import { Request, Response } from "express";

interface ILivro {
    titulo: string
}

export const create = (req: Request<{}, {}, ILivro>, res: Response) => {

    const data = req.body.titulo;
    console.log(data);

    res.send('Criado!');
}