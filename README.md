# ConectaRR

Plataforma de oportunidades profissionais com foco inicial em Roraima. O projeto começa com uma experiência pública de descoberta de vagas; autenticação, publicação real e persistência entram depois de validarmos os fluxos e as regras de moderação.

## Estado atual

- Primeira interface responsiva para a página inicial e exploração de oportunidades.
- Dados de demonstração, identificados como fictícios na interface.
- Filtros locais por texto, município e modalidade.
- Leitura de oportunidades publicadas no Supabase com chave publicável e políticas RLS.
- Página demonstrativa de detalhes por oportunidade.
- Esquema PostgreSQL inicial aplicado ao projeto Supabase dedicado.
- Ainda sem autenticação no frontend ou candidatura real.

## Tecnologias

- Next.js App Router e React
- TypeScript
- Tailwind CSS v4
- Supabase Auth e PostgreSQL para persistência e controle de acesso

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Para conectar o catálogo ao Supabase, copie `.env.example` para `.env.local` e preencha a URL e a chave publicável do projeto. Chaves secretas privilegiadas nunca devem começar com `NEXT_PUBLIC_`.

## Estrutura

```text
src/
  app/                 rotas, layout e estilos globais
  components/          interface interativa reutilizável
  data/                conteúdo demonstrativo tipado
docs/                  decisões, escopo e fluxos do projeto
supabase/migrations/    propostas de esquema PostgreSQL com RLS
```

## Próximas etapas

1. Revisar a proposta visual e os filtros com pessoas candidatas de Roraima.
2. Entrevistar organizações sobre publicação e recebimento de candidaturas.
3. Fechar o modelo de candidatura e a política de moderação.
4. Integrar Supabase Auth para as contas de empresas e moderação.
5. Criar o fluxo de publicação e revisão de oportunidades.

O Documento Mestre v1.0 é a referência inicial de escopo e decisões do produto. As principais hipóteses permanecem abertas até validação com usuários e organizações.

## Banco de dados

`supabase/migrations/20261030154806_initial_schema.sql` define perfis, empresas, oportunidades e vagas salvas, com políticas de Row Level Security e estados de moderação. Ela já foi aplicada ao projeto Supabase dedicado do ConectaRR.

O catálogo público consulta apenas oportunidades publicadas e aprovadas. Enquanto não houver anúncios reais, a interface mantém exemplos fictícios identificados como demonstração. O piloto usa candidatura por link externo; a plataforma não armazena currículos nem registros de candidatura.
