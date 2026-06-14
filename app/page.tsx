export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { PrismaClient } from '@prisma/client';
import { adicionarNovaTarefa, atualizarSituacao } from './acoes';

const banco = new PrismaClient();

export default async function PainelDeControle() {
  const equipe = await banco.usuario.findMany();
  const tarefas = await banco.tarefa.findMany({
    include: { responsavel: true },
  });

  const dataDeHoje = new Date();
  dataDeHoje.setHours(0, 0, 0, 0);

  const quantidadeAtrasadas = tarefas.filter((t) => {
    const dataVencimentoDaTarefa = new Date(t.dataVencimento);
    dataVencimentoDaTarefa.setHours(0, 0, 0, 0);
    return t.situacao !== 'CONCLUIDO' && dataVencimentoDaTarefa < dataDeHoje;
  }).length;

  const aFazer = tarefas.filter((t) => t.situacao === 'A_FAZER');
  const emAndamento = tarefas.filter((t) => t.situacao === 'EM_ANDAMENTO');
  const concluidas = tarefas.filter((t) => t.situacao === 'CONCLUIDO');

  const totalAFazer = aFazer.length;
  const totalEmAndamento = emAndamento.length;

  return (
    <div>
      <header className="cabecalho">
        <h1>Gestão de Equipe - Quatro5</h1>
      </header>

      <main className="container">
        
        <section className="kpis">
          {/* Card 1: Atrasadas */}
          <div className="kpi-card alerta">
            <h2>🚨 Tarefas Atrasadas</h2>
            <p className="kpi-valor">{quantidadeAtrasadas}</p>
            <p><strong>Ação do Gestor:</strong> Renegociar prazos com clientes.</p>
          </div>

          {/* Card 2: A Fazer */}
          <div className="kpi-card">
            <h2>📋 A Fazer</h2>
            <p className="kpi-valor" style={{ color: '#3498db' }}>{totalAFazer}</p>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '15px' }}>Total de tarefas aguardando início</p>
            
            <ul style={{ listStyle: 'none' }}>
              {equipe.map((membro) => {
                const qtdAFazer = aFazer.filter((t) => t.usuarioId === membro.id).length;
                return (
                  <li key={`afazer-${membro.id}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                    <span>{membro.nome} ({membro.cargo})</span>
                    <strong>{qtdAFazer} tarefas</strong>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Card 3: Em Andamento */}
          <div className="kpi-card">
            <h2>📊 Carga (Em Andamento)</h2>
            <p className="kpi-valor" style={{ color: '#f39c12' }}>{totalEmAndamento}</p>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '15px' }}>Total de tarefas em execução agora</p>

            <ul style={{ listStyle: 'none' }}>
              {equipe.map((membro) => {
                const qtdEmAndamento = emAndamento.filter((t) => t.usuarioId === membro.id).length;
                return (
                  <li key={`emandamento-${membro.id}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                    <span>{membro.nome} ({membro.cargo})</span>
                    <strong>{qtdEmAndamento} tarefas</strong>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="formulario-box">
          <h2>➕ Registrar Nova Tarefa</h2>
          <form action={adicionarNovaTarefa} style={{ marginTop: '15px' }}>
            
            <div className="form-linha">
              <div className="form-campo">
                <label>Título da Tarefa</label>
                <input name="titulo" required />
              </div>
              <div className="form-campo">
                <label>Responsável</label>
                <select name="usuarioId" required>
                  <option value="">Selecione...</option>
                  {equipe.map((u) => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>
              </div>
              <div className="form-campo" style={{ flex: '0.3' }}>
                <label>Prazo (Dias)</label>
                <input type="number" name="diasParaVencer" required defaultValue={3} min={-30} />
              </div>
            </div>

            <div className="form-linha">
              <div className="form-campo">
                <label>Descrição</label>
                <input name="descricao" required />
              </div>
              <button type="submit" className="btn-adicionar">Adicionar</button>
            </div>

          </form>
        </section>

        <section className="kanban">
          <Coluna titulo="📌 A Fazer" tarefas={aFazer} />
          <Coluna titulo="⏳ Em Andamento" tarefas={emAndamento} />
          <Coluna titulo="✅ Concluído" tarefas={concluidas} />
        </section>

      </main>
    </div>
  );
}

function Coluna({ titulo, tarefas }: { titulo: string, tarefas: any[] }) {
  return (
    <div className="coluna">
      <h3>{titulo}</h3>
      <div>
        {tarefas.length === 0 && <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Nenhuma tarefa.</p>}
        {tarefas.map((t) => {
          
          const dataVencimento = new Date(t.dataVencimento);
          dataVencimento.setHours(0, 0, 0, 0);
          
          const dataDeHoje = new Date();
          dataDeHoje.setHours(0, 0, 0, 0);

          const estaAtrasada = dataVencimento < dataDeHoje && t.situacao !== 'CONCLUIDO';
          
          return (
            <div key={t.id} className="tarefa">
              {estaAtrasada && <span className="etiqueta-atrasada">⚠️ ATRASADA</span>}
              
              <p className="tarefa-titulo">{t.titulo}</p>
              <p className="tarefa-desc">{t.descricao}</p>
              
              <div className="tarefa-rodape">
                <span>👤 {t.responsavel?.nome}</span>
                <span className={estaAtrasada ? 'texto-atrasado' : ''}>
                  📅 {new Date(t.dataVencimento).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {t.situacao === 'A_FAZER' && (
                <form action={atualizarSituacao}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="novaSituacao" value="EM_ANDAMENTO" />
                  <button type="submit" className="btn-mover btn-andamento">
                    ▶ Iniciar (Em Andamento)
                  </button>
                </form>
              )}

              {t.situacao === 'EM_ANDAMENTO' && (
                <form action={atualizarSituacao}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="novaSituacao" value="CONCLUIDO" />
                  <button type="submit" className="btn-mover btn-concluir">
                    ✔ Finalizar (Concluído)
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}