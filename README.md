# ConectaRR

Plataforma de oportunidades profissionais com foco inicial em Roraima. O piloto oferece catálogo público, autenticação de organizações, envio de vagas para moderação e publicação com candidatura por link externo.

## O que funciona

- Catálogo responsivo com busca por texto, município, modalidade e área.
- Demonstração claramente identificada enquanto não houver vagas reais autorizadas.
- Consulta de vagas publicadas no Supabase, protegida por RLS.
- Página de detalhes para vagas demonstrativas e publicadas, com encaminhamento externo.
- Criação de conta e login de organizações por Supabase Auth.
- Cadastro de organização aguardando validação.
- Envio de vagas apenas por organizações aprovadas; vagas começam em estado pendente.
- Painel restrito de moderação para aprovar organizações e publicar ou rejeitar vagas.
- PostgreSQL com RLS, funções de autorização e esquema de perfis, organizações, vagas e salvas.

O piloto não armazena currículos nem confirma candidaturas. Não existem anúncios, empresas, métricas ou depoimentos reais sem autorização.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS v4, Supabase Auth e PostgreSQL.

## Executar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` com os dados do projeto Supabase. Nunca coloque uma chave `service_role` ou secret em variável `NEXT_PUBLIC_*`.

## Fluxo da organização

1. A pessoa responsável cria conta em `/conta` e confirma o e-mail, se a confirmação estiver ativa no Supabase Auth.
2. Em `/painel`, envia os dados da organização.
3. A moderação revisa a organização no painel `/moderacao`.
4. Após aprovação, a organização envia vagas que entram como pendentes.
5. A moderação confere dados e link de candidatura e publica ou rejeita a vaga.
6. Vagas publicadas aparecem no catálogo e levam a candidatura ao site informado pela organização.

## Primeiro moderador

Por segurança, uma conta pública nunca ganha permissão de moderação sozinha. Após criar sua conta e confirmar o e-mail, copie o UUID do usuário na seção Authentication do painel Supabase e execute, no SQL Editor do projeto, substituindo `UUID_DA_CONTA`:

```sql
insert into private.moderators (user_id)
values ('UUID_DA_CONTA')
on conflict (user_id) do nothing;
```

A tabela está no schema `private`, sem acesso via API. O painel verifica o papel por uma função que retorna apenas o status da própria conta.

## Banco e migrations

As migrations estão em `supabase/migrations/`. O esquema inicial e a migration `20261031170538_moderator_check_and_job_owner_index.sql` foram aplicados ao projeto Supabase ConectaRR. A primeira define perfis, empresas, vagas, vagas salvas e políticas RLS; a segunda adiciona a verificação de moderador e o índice de autor das vagas.

## Escopo do piloto

Este MVP oferece descoberta e publicação moderada. Não inclui candidatura interna, upload de currículo, busca de candidatos, pagamentos, assinatura, mensagens, notificações transacionais nem automação de verificação empresarial. O projeto requer política de privacidade e termos revisados antes de operar como serviço comercial e avaliação acadêmica da UNAMA depende do curso e da instituição.
