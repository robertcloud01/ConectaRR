# Decisões do MVP

## Catálogo público sem cadastro

Qualquer pessoa pode descobrir oportunidades sem criar conta. Isso reduz barreiras e mantém os dados de candidato fora do piloto.

## Anúncios demonstrativos identificados

Enquanto não houver autorização de organizações para divulgar vagas reais, a interface mantém exemplos fictícios com aviso explícito. Não publicar dados fabricados como oportunidades reais.

## Cadastro e publicação moderados

Organizações criam conta autenticada, submetem cadastro para aprovação e, depois de aprovadas, enviam vagas em estado pendente. A moderação revisa antes da publicação. O estado é imposto por RLS; cliente autenticado não pode publicar por conta própria.

## Candidatura por link externo

No piloto, cada organização informa um endereço HTTPS para seu processo seletivo. O ConectaRR não recebe currículo nem registra uma candidatura como concluída.

## Papéis

- Pessoa visitante: lê oportunidades publicadas.
- Organização autenticada: administra a própria organização e vagas dentro das transições permitidas.
- Moderador: membro cadastrado na tabela privada `private.moderators`; pode rever organizações e vagas.

## Limites conhecidos

- Um usuário registra uma organização no painel inicial.
- O primeiro moderador deve ser provisionado manualmente no banco pelo proprietário do projeto.
- Não há recuperação de senha no primeiro incremento; o fluxo pode ser adicionado com a configuração de e-mail do Supabase.
- Não há suporte a upload de CV, candidatura dentro da plataforma ou notificações.
- A conformidade operacional depende de revisar política de privacidade, termos, canais de denúncia e rotina de remoção antes de divulgar o serviço amplamente.
