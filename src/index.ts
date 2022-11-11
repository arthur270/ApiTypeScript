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

//todos os usuarios
server.get('/api/v1/users', (req: Request, res: Response) => {
    return res.json(listaUsuarios)
})

//usuario especifico
server.get('/api/v1/users/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const usuarioExistente = listaUsuarios.find((user) => user.id == id)

    if (!usuarioExistente) {
        return res.status(404).json({mensagem: "usuário não encontrado"})
    }

    return res.json(usuarioExistente)
    
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

server.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const { id } = req.params
    
    const usuarioExistenteIndex = listaUsuarios.findIndex((user) => user.id == id)

    if (usuarioExistenteIndex == -1) {

        return res.status(404).json({mensagem: "Usuário não encontrado"})
        
    }

    delete listaUsuarios[usuarioExistenteIndex]
    return res.status(204).send()

})

server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000...')
})