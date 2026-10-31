import Link from "next/link";
import { VacancyExplorer } from "@/components/vacancy-explorer";
import { getPublicJobs } from "@/lib/public-jobs";

function BrandMark() {
  return (
    <span aria-hidden="true" className="brand-mark">
      <svg viewBox="0 0 32 32" fill="none"><path d="M24.5 8.2A12 12 0 1 0 26 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M19 8h6v6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="16" r="2" fill="currentColor"/></svg>
    </span>
  );
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function NorthArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 540" fill="none" className="north-artwork">
      <defs>
        <linearGradient id="north-sky" x1="320" y1="0" x2="320" y2="540" gradientUnits="userSpaceOnUse"><stop stopColor="#315542"/><stop offset="1" stopColor="#132B24"/></linearGradient>
        <linearGradient id="north-sun" x1="427" y1="125" x2="427" y2="357" gradientUnits="userSpaceOnUse"><stop stopColor="#DCE99A"/><stop offset="1" stopColor="#C6D87A" stopOpacity=".1"/></linearGradient>
      </defs>
      <rect width="640" height="540" rx="26" fill="url(#north-sky)"/>
      <path d="M0 407c74-8 111-43 178-37 82 7 101 55 187 43 65-9 95-48 155-34 44 11 74 38 120 40v121H0V407Z" fill="#1A392C"/>
      <path d="M0 447c93-24 139-5 205 14 78 23 116 13 184-7 62-18 107-21 154-4 34 12 63 30 97 39v51H0v-93Z" fill="#10251F"/>
      <circle cx="428" cy="227" r="128" fill="url(#north-sun)" fillOpacity=".72"/>
      <circle cx="428" cy="227" r="96" stroke="#E5E9B8" strokeOpacity=".42"/>
      <circle cx="428" cy="227" r="65" stroke="#E5E9B8" strokeOpacity=".25"/>
      <path d="M74 374 197 264l85 47 93-154 148 186" stroke="#D7E3A2" strokeWidth="2" strokeOpacity=".72" strokeLinejoin="round"/>
      <path d="m74 374 48-43 34 13 41-80 47 26 42-31 38 21 51-83 42 53 36-13 44 57 26-16 52 68" stroke="#F0EBCB" strokeWidth="1.25" strokeOpacity=".46" strokeLinejoin="round"/>
      <path d="M57 431h526M89 454h467M127 477h380" stroke="#C8D68F" strokeOpacity=".14"/>
      <circle cx="197" cy="264" r="4" fill="#DDE89C"/><circle cx="375" cy="157" r="4" fill="#DDE89C"/><circle cx="523" cy="343" r="4" fill="#DDE89C"/>
      <path d="M81 85v30m-15-15h30M558 111v20m-10-10h20" stroke="#F2EFD8" strokeOpacity=".7" strokeLinecap="round"/>
      <text x="42" y="48" fill="#D5E0BD" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="3">NORTE · BRASIL</text>
      <text x="42" y="507" fill="#D5E0BD" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2.5">NOVOS CAMINHOS COMEÇAM PERTO</text>
    </svg>
  );
}

function SmallArrow() {
  return <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-full border border-current/20"><ArrowIcon /></span>;
}

export default async function Home() {
  const vacancyData = await getPublicJobs();
  const featuredJob = vacancyData.jobs[0];

  return (
    <main>
      <div className="announcement-bar">
        <span className="announcement-dot" />
        <p>Plataforma em piloto <span aria-hidden="true">·</span> Feita para aproximar Roraima das próximas oportunidades</p>
        <span className="announcement-code">RR / 01</span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" aria-label="ConectaRR — início" className="brand-lockup">
            <BrandMark />
            <span className="brand-name">Conecta<span>RR</span></span>
          </Link>
          <nav aria-label="Navegação principal" className="desktop-nav">
            <Link href="#vagas">Oportunidades</Link>
            <Link href="#sobre">Nossa ideia</Link>
            <Link href="#organizacoes">Para organizações</Link>
          </nav>
          <Link href="/conta" className="header-action">Para organizações <ArrowIcon /></Link>
          <details className="mobile-nav">
            <summary aria-label="Abrir menu de navegação"><span /><span /></summary>
            <nav aria-label="Navegação mobile">
              <Link href="#vagas">Oportunidades</Link>
              <Link href="#sobre">Nossa ideia</Link>
              <Link href="#organizacoes">Para organizações</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark">✳</span> Oportunidades profissionais · Roraima</p>
            <h1>Talento do Norte.<br /><em>Futuro em movimento.</em></h1>
            <div className="hero-lower">
              <p>Um lugar para descobrir caminhos profissionais, encontrar oportunidades locais e dar o próximo passo com mais clareza.</p>
              <div className="hero-actions">
                <Link href="#vagas" className="button button-dark">Explorar oportunidades <ArrowIcon /></Link>
                <Link href="#sobre" className="text-link">Conheça a ideia <span aria-hidden="true">↘</span></Link>
              </div>
            </div>
            <p className="hero-caption"><span>02°49′ N</span> <span>Um começo no extremo norte do Brasil</span></p>
          </div>

          <div className="hero-visual">
            <NorthArtwork />
            <div className="visual-index"><span>01</span><span>BOA VISTA, RR</span></div>
            <div className="featured-card">
              <div className="featured-card-top"><span>{vacancyData.isDemo ? "ESTUDO DE INTERFACE" : "OPORTUNIDADE RECENTE"}</span><span className="featured-card-dot" /></div>
              <div className="featured-card-body">
                <span className="featured-company">{featuredJob?.company.slice(0, 1) ?? "C"}</span>
                <div><p>{featuredJob?.area ?? "Carreiras"} <span>·</span> {featuredJob?.modality ?? "Roraima"}</p><h2>{featuredJob?.title ?? "O próximo passo começa aqui"}</h2></div>
              </div>
              <p className="featured-card-note">{vacancyData.isDemo ? "Exemplo fictício · para demonstrar a experiência" : featuredJob?.city}</p>
            </div>
            <div className="hero-orbit-label"><span>+</span><span>RORAIMA<br />EM CONEXÃO</span></div>
          </div>
        </div>
        <div className="hero-bottomline"><span>CONEXÕES COM PROPÓSITO</span><span>RORAIMA — BRASIL</span></div>
      </section>

      <div className="marquee-band" role="region" aria-label="Trabalho, talento e novas possibilidades em Roraima">
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, row) => <span key={row}>TRABALHO <i>✳</i> TALENTO <i>✳</i> TERRITÓRIO <i>✳</i> POSSIBILIDADE <i>✳</i> RORAIMA <i>✳</i> </span>)}
        </div>
      </div>

      <VacancyExplorer {...vacancyData} />

      <section id="sobre" className="manifesto-section">
        <div className="manifesto-side"><span>02 / NOSSA IDEIA</span><span className="manifesto-star">✳</span></div>
        <div className="manifesto-content">
          <p className="eyebrow eyebrow-light">Um olhar mais próximo para o trabalho</p>
          <h2>Oportunidade boa<br />também <em>nasce por aqui.</em></h2>
          <div className="manifesto-foot">
            <p>Encontrar trabalho não deveria depender de procurar em dezenas de lugares. O ConectaRR organiza oportunidades em uma experiência pensada para quem vive, trabalha e empreende em Roraima.</p>
            <div className="manifesto-signature"><span className="signature-line" /><span>GENTE · TRABALHO · NORTE</span></div>
          </div>
        </div>
        <div className="manifesto-stamp" aria-hidden="true"><span>FEITO NO</span><strong>NORTE</strong><span>PARA CONECTAR</span><i>✳</i></div>
      </section>

      <section className="principles-section">
        <div className="principles-head">
          <div><p className="eyebrow">03 / COMO A EXPERIÊNCIA FUNCIONA</p><h2 className="section-heading">Direto ao que<br /><em>importa para você.</em></h2></div>
          <p className="principles-intro">Informação clara para encontrar oportunidades e decidir qual caminho faz sentido para sua vida profissional.</p>
        </div>
        <div className="principles-grid">
          <article className="principle-card principle-card-primary"><span className="principle-number">01</span><span className="principle-icon">⌕</span><h3>Encontre com contexto</h3><p>Busque por cargo, área, município e modalidade de trabalho em um só lugar.</p><span className="principle-bottom">BUSCA + FILTROS <SmallArrow /></span></article>
          <article className="principle-card"><span className="principle-number">02</span><span className="principle-icon principle-icon-paper">↗</span><h3>Entenda a oportunidade</h3><p>Veja quem está contratando, os detalhes da vaga e as informações disponíveis.</p><span className="principle-bottom">INFORMAÇÃO OBJETIVA <SmallArrow /></span></article>
          <article className="principle-card principle-card-lime"><span className="principle-number">03</span><span className="principle-icon">→</span><h3>Conecte-se direto</h3><p>Quando uma vaga está publicada, siga para o canal de candidatura informado.</p><span className="principle-bottom">CANDIDATURA EXTERNA <SmallArrow /></span></article>
        </div>
      </section>

      <section id="organizacoes" className="organizations-section">
        <div className="organizations-art" aria-hidden="true"><span className="org-circle org-circle-one"/><span className="org-circle org-circle-two"/><span className="org-cross">✳</span><span className="org-coordinates">03° N<br />60° W</span></div>
        <div className="organizations-copy">
          <p className="eyebrow eyebrow-light">PARA EMPRESAS E ORGANIZAÇÕES</p>
          <h2>Tem uma oportunidade?<br /><em>Ajude-a a chegar mais longe.</em></h2>
          <p>Cadastre sua organização, envie oportunidades e acompanhe a revisão. Cada vaga passa por moderação antes de ser publicada.</p>
          <Link className="button button-light" href="/conta">Acessar área de organizações <ArrowIcon /></Link>
        </div>
        <span className="org-index">04 / PRÓXIMOS PASSOS</span>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div><Link href="/" className="brand-lockup footer-brand"><BrandMark /><span className="brand-name">Conecta<span>RR</span></span></Link><p>Um projeto em construção para aproximar Roraima de novas oportunidades profissionais.</p></div>
          <div className="footer-links"><span>EXPLORE</span><Link href="#vagas">Oportunidades <ArrowIcon /></Link><Link href="#sobre">Nossa ideia <ArrowIcon /></Link><Link href="#organizacoes">Para organizações <ArrowIcon /></Link></div>
          <a className="github-link" href="https://github.com/robertcloud01/ConectaRR" target="_blank" rel="noreferrer"><span>PROJETO ABERTO</span><strong>Construído em público <span aria-hidden="true">↗</span></strong></a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} CONECTARR · PROJETO EM DESENVOLVIMENTO</span><span>BOA VISTA, RORAIMA <i>✳</i></span></div>
      </footer>
    </main>
  );
}
