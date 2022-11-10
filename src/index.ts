import express, { Request, Response } from 'express'
import {uuid} from 'uuidv4'

interface User {
    id: string;
    nome: string;
    tel: string;
    idade: number;
}

const listaUsuarios: User[] = []

const server = express()
server.use(express.json())

server.get('/api/v1/users', (req: Request, res: Response) => {
    return res.json(listaUsuarios)
})

server.post('/api/v1/users', (req: Request, res: Response) => {
    const {nome, tel, idade} = req.body
    const id = uuid()

    const newUser: User = { 
        id: id,
        nome: nome,
        tel: tel,
        idade: idade
    }
    
    listaUsuarios.push(newUser)

    return res.json(newUser)
})

server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000...')
})