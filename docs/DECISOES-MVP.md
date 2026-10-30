# Decisões iniciais do MVP

## Por que começar pelo catálogo público

Uma pessoa deve conseguir entender o serviço e encontrar oportunidades sem criar uma conta antes. Isso reduz barreiras e permite avaliar a descoberta antes de pedir dados pessoais.

## Por que os dados são demonstrativos

Não temos ainda autorização de empresas para divulgar vagas reais. A interface mostra exemplos fictícios e mantém um aviso visível. Não deve ser publicada como fonte real de vagas até que conteúdo, autorização e operação de moderação estejam definidos.

## Por que a primeira busca é local

Busca por título, empresa demonstrativa, município e modalidade ajuda a prototipar a experiência. Supabase e PostgreSQL serão introduzidos quando filtros, estados de vaga e permissões tiverem sido revisados. Assim evitamos desenhar políticas de acesso em cima de um modelo de dados ainda incerto.

## Decisão pendente: candidatura

O Documento Mestre propõe candidatura interna simplificada e link externo como caminhos possíveis. Antes de persistir currículos ou candidaturas, vamos conversar com organizações e escolher o menor fluxo que atende ao piloto. Dados de currículo não serão coletados nesta versão.

## Decisão pendente: estados e moderação

Os estados previstos são rascunho, pendente, publicada, pausada, encerrada, expirada e rejeitada. A transição permitida e a responsabilidade por cada ação precisam ser especificadas antes da integração com banco.
