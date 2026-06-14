import { PrismaClient } from '@prisma/client'
const banco = new PrismaClient()

async function principal() {

    const ana = await banco.usuario.create({ data: { nome: 'Ana', cargo: 'Vendas' } })
    const carlos = await banco.usuario.create({ data: { nome: 'Carlos', cargo: 'Atendimento' } })
    const marcos = await banco.usuario.create({ data: { nome: 'Marcos', cargo: 'Operações' } })

    await banco.tarefa.create({
        data: {
            titulo: 'Enviar proposta para Cliente X',
            descricao: 'Proposta comercial atrasada',
            situacao: 'EM_ANDAMENTO',
            dataVencimento: new Date(Date.now() - 86400000), 
            usuarioId: ana.id,
        }
    })

    await banco.tarefa.create({
        data: {
            titulo: 'Responder e-mails de suporte',
            descricao: 'Zerar a caixa de entrada',
            situacao: 'A_FAZER',
            dataVencimento: new Date(Date.now() + 86400000), 
            usuarioId: carlos.id,
        }
    })
}

principal()
    .catch((erro) => console.error(erro))
    .finally(async () => await banco.$disconnect())