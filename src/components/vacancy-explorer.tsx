"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "@/data/jobs";

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6"/><path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

function PinIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

type VacancyExplorerProps = { jobs: Job[]; cities: string[]; isDemo: boolean };

export function VacancyExplorer({ jobs, cities, isDemo }: VacancyExplorerProps) {
  const cityOptions = cities.length ? cities : ["Todas as cidades"];
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(cityOptions[0]);
  const [modality, setModality] = useState("Todas");

  const areas = [...new Set(jobs.map((job) => job.area))];
  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return jobs.filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.area} ${job.city}`.toLocaleLowerCase("pt-BR");
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCity = city === cityOptions[0] || job.city === city;
      const matchesModality = modality === "Todas" || job.modality === modality;
      return matchesQuery && matchesCity && matchesModality;
    });
  }, [city, cityOptions, jobs, modality, query]);

  function clearFilters() {
    setQuery("");
    setCity(cityOptions[0]);
    setModality("Todas");
  }

  return (
    <section id="vagas" className="opportunities-section">
      <div className="opportunities-inner">
        <div className="opportunities-heading">
          <div><p className="eyebrow">01 / ENCONTRE SEU CAMINHO</p><h2>Oportunidades<br /><em>em movimento.</em></h2></div>
          <div className="opportunities-aside"><p>Explore vagas por área, cidade e modalidade. Escolha com calma o próximo passo da sua jornada.</p><span className={isDemo ? "status-pill status-pill-demo" : "status-pill status-pill-live"}><i />{isDemo ? "Exemplos para demonstração" : "Oportunidades publicadas"}</span></div>
        </div>

        <div className="search-panel">
          <label className="search-field"><SearchIcon /><span className="sr-only">Buscar cargo, empresa ou área</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Qual caminho você procura?" /></label>
          <label className="filter-field"><PinIcon /><span className="sr-only">Filtrar por município</span><select value={city} onChange={(event) => setCity(event.target.value)}>{cityOptions.map((option) => <option key={option}>{option}</option>)}</select><span aria-hidden="true" className="select-caret">⌄</span></label>
          <label className="filter-field filter-field-mode"><span className="sr-only">Filtrar por modalidade</span><select value={modality} onChange={(event) => setModality(event.target.value)}>{["Todas", "Presencial", "Híbrido", "Remoto"].map((option) => <option key={option} value={option}>{option === "Todas" ? "Qualquer modalidade" : option}</option>)}</select><span aria-hidden="true" className="select-caret">⌄</span></label>
          <a href="#oportunidades-lista" className="search-submit">Buscar <ArrowIcon /></a>
        </div>

        {areas.length > 0 && <div className="area-shortcuts"><span>ATALHOS</span>{areas.map((area) => <button type="button" key={area} onClick={() => setQuery((current) => current === area ? "" : area)} aria-pressed={query === area}>{area}<span aria-hidden="true">↗</span></button>)}</div>}

        <div id="oportunidades-lista" className="vacancy-results-head"><p><strong>{String(filteredJobs.length).padStart(2, "0")}</strong> {isDemo ? "oportunidades de exemplo" : "oportunidades encontradas"}</p><span>{isDemo ? "CONTEÚDO FICTÍCIO · SEM PROCESSO SELETIVO REAL" : "LISTAGEM ATUALIZADA A PARTIR DO CONECTARR"}</span></div>

        {filteredJobs.length ? (
          <div className="vacancy-grid">
            {filteredJobs.map((job, index) => (
              <article key={job.slug} className="vacancy-card">
                <div className="vacancy-card-top"><span className="vacancy-index">{String(index + 1).padStart(2, "0")} / {job.area.toUpperCase()}</span><span className={job.isDemo ? "vacancy-type vacancy-type-demo" : "vacancy-type"}>{job.isDemo ? "DEMONSTRAÇÃO" : "PUBLICADA"}</span></div>
                <div className="vacancy-company-row"><span className="company-monogram">{job.company.slice(0, 1)}</span><span>{job.company}</span></div>
                <h3>{job.title}</h3>
                <p className="vacancy-summary">{job.summary}</p>
                <div className="vacancy-meta"><span>{job.city}</span><i /><span>{job.modality}</span><i /><span>{job.contract}</span></div>
                <div className="vacancy-card-bottom">{job.salary ? <span className="vacancy-salary">{job.salary}</span> : <span className="vacancy-published">{job.published}</span>}{job.applicationUrl ? <a href={job.applicationUrl} target="_blank" rel="noreferrer" aria-label={`Acessar a candidatura de ${job.title}`}>Candidatar-se <ArrowIcon /></a> : <Link href={`/vagas/${job.slug}`} aria-label={`Ver detalhes de ${job.title}`}>Ver oportunidade <ArrowIcon /></Link>}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results"><span aria-hidden="true">✳</span><h3>Nenhum caminho com esses filtros.</h3><p>Experimente outra palavra ou volte a ver todas as oportunidades.</p><button type="button" onClick={clearFilters}>Limpar filtros <ArrowIcon /></button></div>
        )}
      </div>
    </section>
  );
}
