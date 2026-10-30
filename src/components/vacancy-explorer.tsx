"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cities, jobs } from "@/data/jobs";

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function PinIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function VacancyExplorer() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(cities[0]);
  const [modality, setModality] = useState("Todas");

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return jobs.filter((job) => {
      const matchesQuery = !normalizedQuery || `${job.title} ${job.company} ${job.area} ${job.city}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      const matchesCity = city === cities[0] || job.city === city;
      const matchesModality = modality === "Todas" || job.modality === modality;
      return matchesQuery && matchesCity && matchesModality;
    });
  }, [city, modality, query]);

  return (
    <section id="vagas" className="scroll-mt-24 bg-[#f6f8f5] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Explore oportunidades</p>
            <h2 className="section-title mt-3">Seu próximo passo<br className="hidden sm:block" /> pode começar aqui.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#56675e]">Encontre oportunidades por área, cidade e modalidade. Este protótipo usa anúncios fictícios para testar a experiência.</p>
          </div>
          <span className="demo-pill self-start md:self-auto">Dados demonstrativos</span>
        </div>

        <div className="mt-9 grid gap-3 rounded-3xl border border-[#dce5dc] bg-white p-3 shadow-[0_14px_45px_-32px_rgba(18,54,38,.35)] md:grid-cols-[1fr_220px_170px_auto] md:items-center md:p-3">
          <label className="flex min-h-12 items-center gap-3 rounded-2xl px-3 text-[#718078] focus-within:ring-2 focus-within:ring-[#2d8a63]">
            <SearchIcon />
            <span className="sr-only">Cargo, empresa ou área</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cargo, empresa ou área" className="w-full bg-transparent text-sm text-[#19392c] outline-none placeholder:text-[#87958d]" />
          </label>
          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#e6ece6] px-3 text-[#718078] focus-within:ring-2 focus-within:ring-[#2d8a63]">
            <PinIcon />
            <span className="sr-only">Município</span>
            <select value={city} onChange={(event) => setCity(event.target.value)} className="w-full appearance-none bg-transparent text-sm text-[#19392c] outline-none">
              {cities.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="flex min-h-12 items-center rounded-2xl border border-[#e6ece6] px-3 focus-within:ring-2 focus-within:ring-[#2d8a63]">
            <span className="sr-only">Modalidade</span>
            <select value={modality} onChange={(event) => setModality(event.target.value)} className="w-full appearance-none bg-transparent text-sm text-[#19392c] outline-none">
              {["Todas", "Presencial", "Híbrido", "Remoto"].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <a href="#resultados" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#176344] px-5 text-sm font-semibold text-white transition hover:bg-[#104d33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176344]">Buscar <ArrowIcon /></a>
        </div>

        <div id="resultados" className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm font-medium text-[#58685f]">{filteredJobs.length} exemplos de oportunidade</p>
          <div className="flex flex-wrap gap-2">
            {["Todas", "Presencial", "Híbrido", "Remoto"].map((item) => (
              <button key={item} type="button" onClick={() => setModality(item)} aria-pressed={modality === item} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${modality === item ? "border-[#176344] bg-[#176344] text-white" : "border-[#d7e0d7] bg-white text-[#526258] hover:border-[#93ad9b]"}`}>
                {item === "Todas" ? "Todas" : item}
              </button>
            ))}
          </div>
        </div>

        {filteredJobs.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredJobs.map((job, index) => (
              <article key={job.slug} className="group flex min-h-[285px] flex-col rounded-3xl border border-[#e1e8e0] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#b6cdb9] hover:shadow-[0_20px_45px_-35px_rgba(18,54,38,.5)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[#edf5ee] text-sm font-bold text-[#176344]">{job.company.slice(0, 1)}</span>
                  <span className="rounded-full bg-[#fbf4e4] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#85642b]">Exemplo</span>
                </div>
                <p className="mt-5 text-xs font-medium text-[#668075]">{job.area} <span className="mx-1.5 text-[#b7c4ba]">·</span> {job.contract}</p>
                <h3 className="mt-2 text-lg font-bold leading-6 tracking-[-.02em] text-[#19392c]">{job.title}</h3>
                <p className="mt-1 text-sm text-[#68776e]">{job.company}</p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#738078]">
                  <span>{job.city}</span><span>{job.modality}</span>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#edf0ec] pt-4">
                  <span className="text-xs text-[#87928b]">{job.published}</span>
                  <Link href={`/vagas/${job.slug}`} aria-label={`Ver detalhes: ${job.title}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176344] transition group-hover:gap-2.5">Detalhes <ArrowIcon /></Link>
                </div>
                {index === 0 && <span className="sr-only">Primeiro exemplo de vaga</span>}
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-[#cbd8cc] bg-white px-6 py-14 text-center">
            <p className="text-base font-semibold text-[#19392c]">Nenhum exemplo encontrado</p>
            <p className="mt-2 text-sm text-[#68776e]">Tente outra palavra ou remova um dos filtros.</p>
            <button type="button" onClick={() => { setQuery(""); setCity(cities[0]); setModality("Todas"); }} className="mt-5 text-sm font-semibold text-[#176344] underline underline-offset-4">Limpar filtros</button>
          </div>
        )}
      </div>
    </section>
  );
}
