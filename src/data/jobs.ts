export type Job = {
  slug: string;
  title: string;
  company: string;
  city: string;
  modality: "Presencial" | "Híbrido" | "Remoto";
  contract: string;
  area: string;
  published: string;
  salary?: string;
  summary: string;
  description: string;
  requirements: string[];
};

// Conteúdo fictício para prototipação. Não representa vagas abertas reais.
export const jobs: Job[] = [
  {
    slug: "estagio-desenvolvimento-web",
    title: "Estágio em Desenvolvimento Web",
    company: "Organização demonstrativa",
    city: "Boa Vista, RR",
    modality: "Híbrido",
    contract: "Estágio",
    area: "Tecnologia",
    published: "Exemplo de anúncio",
    salary: "Bolsa a combinar",
    summary: "Exemplo de oportunidade para estudantes que querem aprender construindo interfaces e produtos digitais.",
    description: "Este anúncio fictício ilustra como uma oportunidade poderá ser apresentada no ConectaRR. A empresa, a vaga e as condições não são reais. O objetivo do protótipo é validar se as informações essenciais estão claras para quem procura estágio.",
    requirements: ["Estar cursando graduação ou curso técnico relacionado", "Noções de HTML, CSS e JavaScript", "Vontade de aprender e colaborar"],
  },
  {
    slug: "assistente-administrativo",
    title: "Assistente Administrativo",
    company: "Empresa de exemplo",
    city: "Boa Vista, RR",
    modality: "Presencial",
    contract: "CLT",
    area: "Administração",
    published: "Exemplo de anúncio",
    summary: "Exemplo de anúncio com responsabilidades, local de trabalho e requisitos em linguagem direta.",
    description: "Conteúdo demonstrativo criado para revisar a hierarquia da página de detalhes. Não existe processo seletivo associado a esta página.",
    requirements: ["Organização e atenção a detalhes", "Conhecimento básico de planilhas", "Boa comunicação escrita"],
  },
  {
    slug: "tecnico-de-suporte",
    title: "Técnico de Suporte Júnior",
    company: "Instituição fictícia",
    city: "Mucajaí, RR",
    modality: "Presencial",
    contract: "Tempo integral",
    area: "Tecnologia",
    published: "Exemplo de anúncio",
    summary: "Exemplo de vaga local para avaliar como município e modalidade aparecem nos resultados.",
    description: "Este conteúdo é fictício e serve apenas para testar a navegação e a busca do protótipo do ConectaRR.",
    requirements: ["Conhecimentos básicos de Windows e redes", "Facilidade para explicar soluções", "Disponibilidade para trabalho presencial"],
  },
  {
    slug: "analista-de-atendimento",
    title: "Analista de Atendimento ao Cliente",
    company: "Negócio demonstrativo",
    city: "Remoto — Brasil",
    modality: "Remoto",
    contract: "CLT",
    area: "Atendimento",
    published: "Exemplo de anúncio",
    summary: "Exemplo remoto para testar a distinção entre vagas locais e oportunidades disponíveis em outras regiões.",
    description: "Anúncio fictício. Em uma versão real, a empresa precisará informar com clareza onde pode contratar e quais horários são esperados.",
    requirements: ["Comunicação clara", "Conforto com ferramentas digitais", "Acesso à internet estável"],
  },
];

export const cities = ["Todas as cidades", "Boa Vista, RR", "Mucajaí, RR", "Remoto — Brasil"];
