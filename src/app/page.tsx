import Link from "next/link";
import { VacancyExplorer } from "@/components/vacancy-explorer";

function BrandMark() {
  return <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#176344] text-lg font-black tracking-[-.08em] text-white shadow-[0_5px_14px_-7px_rgba(23,99,68,.7)]">C<span className="text-[#f0c46e]">+</span></span>;
}

function LocationIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

function SparkIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-6"><path d="m16 3 2.9 9.1L28 15l-9.1 2.9L16 27l-2.9-9.1L4 15l9.1-2.9L16 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m25 21 .9 2.8 2.8.9-2.8.9L25 28l-.9-2.4-2.8-.9 2.8-.9L25 21Z" fill="currentColor"/></svg>;
}

export default function Home() {
  return (
    <main>
      <div className="bg-[#123a2b] px-4 py-2 text-center text-xs font-medium tracking-wide text-[#e5efe8]">
        <span className="text-[#f0c46e]">●</span> Protótipo em construção <span className="mx-2 text-[#739583]">/</span> vagas desta página são apenas exemplos
      </div>

      <header className="sticky top-0 z-20 border-b border-[#e8ede7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" aria-label="ConectaRR, página inicial" className="flex items-center gap-3">
            <BrandMark />
            <span className="text-[19px] font-extrabold tracking-[-.05em] text-[#19392c]">Conecta<span className="text-[#176344]">RR</span></span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
            <Link href="#vagas" className="text-sm font-medium text-[#56675e] transition hover:text-[#176344]">Encontrar oportunidades</Link>
            <Link href="#como-funciona" className="text-sm font-medium text-[#56675e] transition hover:text-[#176344]">Como funciona</Link>
          </nav>
          <Link href="#para-empresas" className="inline-flex items-center rounded-full border border-[#c9d8cc] px-4 py-2.5 text-xs font-bold text-[#28553e] transition hover:border-[#176344] hover:bg-[#f4f8f4] sm:px-5 sm:text-sm">Sou empresa</Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#f6f8f5] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-48 -z-10 size-[520px] rounded-full border border-[#dce7dd] sm:size-[720px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-28 -z-10 size-[370px] rounded-full border border-[#e5ece4] sm:size-[540px]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-220px] left-[42%] -z-10 size-[460px] rounded-full bg-[#e8f0e7] blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-[#dce7dd] bg-white/70 px-3.5 py-2">
              <LocationIcon /> Feito para conectar Roraima
            </p>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.2rem,7.2vw,6.4rem)] font-extrabold leading-[.91] tracking-[-.075em] text-[#143d2c]">
              O próximo passo<br /> começa <span className="relative inline-block text-[#2c8057]">por aqui.<span aria-hidden="true" className="absolute -bottom-1 left-1 h-2 w-[94%] -rotate-2 rounded-full bg-[#efc568]/70" /></span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#596b60] sm:text-lg sm:leading-8">Oportunidades profissionais reunidas em um só lugar. Encontre vagas perto de você e descubra novos caminhos em Roraima.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#vagas" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#176344] px-6 text-sm font-bold text-white shadow-[0_10px_25px_-14px_rgba(23,99,68,.7)] transition hover:-translate-y-0.5 hover:bg-[#104d33]">Explorar oportunidades <span aria-hidden="true">→</span></Link>
              <Link href="#para-empresas" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d3ded3] bg-white/60 px-6 text-sm font-bold text-[#365744] transition hover:bg-white">Quero divulgar uma vaga</Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#78877d]">Projeto em fase de protótipo. As oportunidades exibidas abaixo são fictícias.</p>
          </div>

          <div className="relative mx-auto w-full max-w-[510px] lg:mr-0">
            <div aria-hidden="true" className="absolute -inset-5 rotate-[-3deg] rounded-[36px] bg-[#e8efe6]" />
            <div className="relative rounded-[30px] border border-[#e0e8df] bg-white p-5 shadow-[0_30px_90px_-48px_rgba(24,62,42,.38)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#edf1ec] pb-5">
                <div><p className="text-xs font-semibold uppercase tracking-[.13em] text-[#718278]">Seu próximo movimento</p><p className="mt-1 text-lg font-bold tracking-[-.03em] text-[#19392c]">Começa com uma busca</p></div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#f5f0e2] text-[#9d782d]"><SparkIcon /></span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-4 rounded-2xl bg-[#f6f8f5] p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#176344] shadow-sm"><LocationIcon /></span>
                  <div><p className="text-sm font-bold text-[#254633]">Oportunidades locais</p><p className="mt-1 text-xs text-[#78877d]">Explore vagas por município</p></div>
                  <span className="ml-auto text-[#86a08d]">→</span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-[#f6f8f5] p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#176344] shadow-sm"><SparkIcon /></span>
                  <div><p className="text-sm font-bold text-[#254633]">Filtros que fazem sentido</p><p className="mt-1 text-xs text-[#78877d]">Área, formato e tipo de vaga</p></div>
                  <span className="ml-auto text-[#86a08d]">→</span>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-[#143d2c] p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#b9d0bf]">Roraima em movimento</p>
                <p className="mt-2 max-w-xs text-xl font-bold leading-6 tracking-[-.03em]">Um lugar mais simples para encontrar seu caminho profissional.</p>
                <div className="mt-4 h-px bg-white/15" />
                <p className="mt-3 text-xs text-[#d1dfd4]">Conectando pessoas e organizações, oportunidade por oportunidade.</p>
              </div>
            </div>
            <span className="absolute -left-5 top-16 hidden rounded-full border border-[#dbe7dc] bg-white px-4 py-2 text-xs font-bold text-[#466b53] shadow-sm sm:block">Roraima • Brasil</span>
          </div>
        </div>
      </section>

      <VacancyExplorer />

      <section id="como-funciona" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="eyebrow">Uma experiência direta</p>
            <h2 className="section-title mt-3">Menos procura espalhada.<br /> Mais clareza no caminho.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Encontre", "Busque vagas por cargo, área, cidade e modalidade de trabalho."],
              ["02", "Entenda", "Veja requisitos e detalhes em uma página feita para facilitar a decisão."],
              ["03", "Conecte-se", "Saiba como demonstrar interesse e acompanhar cada oportunidade."],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-[#e3eae2] p-6 sm:p-8">
                <span className="text-sm font-bold tracking-widest text-[#7b9a83]">{number}</span>
                <h3 className="mt-7 text-2xl font-bold tracking-[-.04em] text-[#19392c]">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#68776e]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="para-empresas" className="bg-[#143d2c] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#bdd6c4]">Para empresas e organizações</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-.05em] sm:text-4xl">Uma boa oportunidade merece ser encontrada.</h2>
            <p className="mt-3 text-sm leading-6 text-[#d0dfd4]">Estamos preparando um jeito simples e responsável de divulgar vagas em Roraima.</p>
          </div>
          <span className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white/90">Cadastro de empresas em breve</span>
        </div>
      </section>

      <footer className="bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#738078] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-bold text-[#254633]">ConectaRR <span className="font-normal text-[#89968d]">— aproximando oportunidades em Roraima</span></Link>
          <p>Protótipo acadêmico em desenvolvimento · Boa Vista, RR</p>
        </div>
      </footer>
    </main>
  );
}
