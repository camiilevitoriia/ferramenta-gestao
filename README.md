# Quatro5 - Gestão de Atividades de um Time

Uma ferramenta de gestão construída para resolver os gargalos de visibilidade, distribuição de tarefas e controle de prazos da equipe do Ricardo.

---

# Como Rodar o Projeto (Passo a Passo)

Para garantir que o projeto cumpra o requisito de **"rodar de primeira"**, optei por utilizar um banco de dados local embutido (**SQLite**). Não é necessário instalar contêineres Docker ou configurar variáveis de ambiente complexas.

## 1. Clone o repositório

## 2. Instale as dependências

```bash
npm install
```

## 3. Crie o banco de dados e popule com a equipe fictícia do Ricardo

```bash
npx prisma db push
npx ts-node prisma/seed.ts
```

## 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## 5. Acesse no navegador

Abra:

```text
http://localhost:3000
```
```text
http://192.168.0.209:3000/
```

---

# Metodologia Escolhida e Por Quê

Escolhi uma abordagem baseada em **Kanban com Prazos (Adaptação SMART)**.

## Por que Kanban?

O Ricardo relatou que o trabalho vive espalhado entre papel, WhatsApp e comunicação verbal, dificultando a visualização do andamento das atividades.

O Kanban centraliza o fluxo de trabalho visualmente nas colunas:

* A Fazer
* Em Andamento
* Concluído

Criando uma única fonte de verdade para toda a equipe.

## Por que Prazos SMART?

O Ricardo relatou que frequentemente os prazos combinados com clientes estouram sem que ele perceba a tempo.

Por isso, cada tarefa exige:

* Responsável definido;
* Prazo obrigatório;
* Controle de situação.

Essa abordagem aplica o conceito **Time-bound** da metodologia SMART, evitando tarefas sem dono ou sem data de entrega.

---

# Justificativa dos Indicadores 

Criei três indicadores principais para substituir decisões baseadas apenas em percepção.

Cada indicador atende diretamente a uma dor relatada pelo Ricardo e gera uma ação prática.

---

## Tarefas Atrasadas 

Quantidade de tarefas cujo prazo venceu antes da data atual e que ainda não foram concluídas.

### Decisão do Ricardo

Ao visualizar esse indicador, Ricardo consegue:

* Identificar entregas em risco;
* Ligar para clientes antes que reclamem;
* Renegociar prazos de forma preventiva;
* Redistribuir tarefas para evitar atrasos maiores.

---

## A Fazer por Pessoa

Quantidade de tarefas ainda não iniciadas distribuídas por colaborador.

### Decisão do Ricardo

Permite identificar:

* Pessoas ociosas;
* Distribuição desigual de atividades;
* Quem está disponível para receber novas demandas.

---

## Em Andamento por Pessoa

Número de tarefas que cada colaborador está executando neste momento.

### Decisão do Ricardo

Ajuda a visualizar:

* Sobrecarga de trabalho;
* Possíveis gargalos;
* Necessidade de redistribuição de tarefas.

Também auxilia na prevenção de burnout da equipe.

---

# Escopo: Decisões e Cortes pelo Prazo

Considerando o prazo restrito de desenvolvimento (48 horas), realizei alguns cortes estratégicos para priorizar o valor entregue.

## Autenticação (Login)

O sistema de usuários e senhas não foi implementado.

O objetivo principal do desafio era resolver o problema de organização e acompanhamento das tarefas, concentrando o esforço no núcleo da solução.

---

## Drag and Drop (Arrastar e Soltar)

Em vez de utilizar bibliotecas complexas de movimentação de cartões, optei por ações explícitas de mudança de status.

Essa decisão reduz:

* Complexidade;
* Tempo de desenvolvimento;
* Risco de bugs, especialmente em dispositivos móveis.

---

## ☁️ Banco em Nuvem (PostgreSQL)

Foi utilizado:

* Prisma ORM
* SQLite

Essa escolha permite que qualquer avaliador execute o projeto em poucos minutos sem necessidade de configurar servidores externos.

---

# O que Eu Faria Com Mais Tempo

## Integração com WhatsApp

A equipe já utiliza o WhatsApp como principal ferramenta de comunicação.

Uma evolução natural seria integrar a aplicação com a API do WhatsApp para envio automático de alertas como:

> Atenção: A tarefa "X" do cliente "Y" vence em 24 horas.

---

##  Métricas de Tempo (Cycle Time)

Implementaria um monitoramento automático do tempo gasto em cada tarefa para calcular:

* Tempo médio de execução;
* Tempo médio por colaborador;
* Tempo médio por tipo de demanda;
* Eficiência operacional da equipe.

Essas métricas ajudariam Ricardo a:

* Precificar melhor seus serviços;
* Definir prazos mais realistas;
* Planejar a capacidade futura da equipe.

---

## Dashboard Analítico

Implementaria gráficos para acompanhamento de:

* Evolução das tarefas;
* Taxa de conclusão;
* Produtividade da equipe;
* Distribuição de carga de trabalho;
* Tendência de atrasos ao longo do tempo.

---

## Controle de Prioridades

Adicionar classificação de prioridade:

* Baixa
* Média
* Alta
* Crítica

Permitindo organizar melhor as entregas e dar foco às demandas mais importantes.
