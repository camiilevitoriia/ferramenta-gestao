import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const banco = new PrismaClient();

export async function GET() {
  const dataDeHoje = new Date();

  const quantidadeAtrasadas = await banco.tarefa.count({
    where: {
      situacao: { not: 'CONCLUIDO' },
      dataVencimento: { lt: dataDeHoje },
    },
  });

  const pesoDeTrabalho = await banco.usuario.findMany({
    select: {
      nome: true,
      _count: {
        select: { tarefas: { where: { situacao: 'EM_ANDAMENTO' } } }
      }
    }
  });

  return NextResponse.json({ 
    tarefasAtrasadas: quantidadeAtrasadas, 
    distribuicaoDeTrabalho: pesoDeTrabalho 
  });
}