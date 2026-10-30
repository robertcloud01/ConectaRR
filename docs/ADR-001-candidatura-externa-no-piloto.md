# ADR 001: candidatura externa no piloto

- **Status:** proposta para o primeiro piloto
- **Data:** 30 de outubro de 2026

## Contexto

O Documento Mestre admite candidatura interna ou redirecionamento para o processo da organização. Ainda não validamos quais fluxos as organizações de Roraima preferem, nem temos uma política de retenção para currículos e dados de candidatura.

## Decisão proposta

No primeiro piloto, o ConectaRR publica oportunidades e encaminha a pessoa candidata para um endereço informado pela organização. A plataforma não recebe currículos nem registra candidaturas.

## Motivos

- Permite validar descoberta, filtros e qualidade das informações antes de construir um sistema de recrutamento.
- Reduz a quantidade de dados pessoais que a plataforma precisa guardar no início.
- Permite que uma organização mantenha seu processo atual de candidatura.
- Evita apresentar um painel de candidatura antes de entendermos o que as empresas precisam acompanhar.

## Consequências

- O catálogo pode ser testado sem cadastro de candidatos.
- A pessoa será avisada de que o link abre um processo externo.
- Não haverá contagem confiável de candidaturas concluídas nesta versão.
- A candidatura interna poderá ser adicionada após validação do fluxo e definição de privacidade, acesso e retenção.

Esta decisão é uma proposta de produto para revisão. A migração SQL implementa somente a estrutura inicial de perfis, empresas, oportunidades e vagas salvas; ela ainda não cria tabelas de candidatura.
