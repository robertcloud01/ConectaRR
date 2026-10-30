# ConectaRR

Plataforma de oportunidades profissionais com foco inicial em Roraima. O projeto começa com uma experiência pública de descoberta de vagas; autenticação, publicação real e persistência entram depois de validarmos os fluxos e as regras de moderação.

## Estado atual

- Primeira interface responsiva para a página inicial e exploração de oportunidades.
- Dados de demonstração, identificados como fictícios na interface.
- Filtros locais por texto, município e modalidade.
- Página demonstrativa de detalhes por oportunidade.
- Ainda sem Supabase, contas, candidaturas reais ou publicação de vagas.
- Primeira migração PostgreSQL preparada localmente, ainda não aplicada a nenhum projeto Supabase.

## Tecnologias

- Next.js App Router e React
- TypeScript
- Tailwind CSS v4
- Supabase e PostgreSQL serão conectados após a validação inicial dos fluxos

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Para configurar o Supabase em uma etapa futura, copie `.env.example` para `.env.local` e preencha a URL e a chave publicável do projeto. Chaves secretas privilegiadas nunca devem começar com `NEXT_PUBLIC_`.

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
4. Revisar a migração e validar as políticas RLS em um ambiente de desenvolvimento.
5. Escolher um projeto Supabase próprio para o ConectaRR, integrar Auth e substituir os dados demonstrativos por oportunidades autorizadas.

O Documento Mestre v1.0 é a referência inicial de escopo e decisões do produto. As principais hipóteses permanecem abertas até validação com usuários e organizações.

## Banco de dados

`supabase/migrations/20261030120000_initial_schema.sql` é uma proposta local para perfis, empresas, oportunidades e vagas salvas. Ela inclui políticas de Row Level Security e estados de moderação, mas ainda não foi executada em nenhum projeto Supabase. Revise-a e valide-a em um ambiente de desenvolvimento antes de aplicar remotamente.

O piloto proposto usa candidatura por link externo. A plataforma não armazena currículos nem registros de candidatura até definirmos a necessidade, as permissões e a retenção desses dados.
