'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const banco = new PrismaClient()

export async function adicionarNovaTarefa(dadosDoFormulario: FormData) {
    const titulo = dadosDoFormulario.get('titulo') as string;
    const descricao = (dadosDoFormulario.get('descricao') as string) || "Sem descrição";  const usuarioId = dadosDoFormulario.get('usuarioId') as string;
    const diasParaVencer = Number(dadosDoFormulario.get('diasParaVencer'));

    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + diasParaVencer);

    await banco.tarefa.create({
        data: {
        titulo,
        descricao,
        situacao: 'A_FAZER',
        dataVencimento: dataVencimento,
        usuarioId: usuarioId || null
        }
    });

    revalidatePath('/');
}

export async function atualizarSituacao(dadosDoFormulario: FormData) {
  const id = dadosDoFormulario.get('id') as string;
  const novaSituacao = dadosDoFormulario.get('novaSituacao') as string;

  await banco.tarefa.update({
    where: { id },
    data: { situacao: novaSituacao }
  });

  revalidatePath('/');
}