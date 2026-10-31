import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "@/data/jobs";
import { createClient } from "@supabase/supabase-js";
import type { Job } from "@/data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let job: Job | undefined = jobs.find((item) => item.slug === slug);
  if (!job && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await supabase.from("jobs").select("id,title,summary,description,area,employment_type,work_mode,municipality,state_code,application_url,companies!inner(name)").eq("id", slug).eq("status", "published").maybeSingle();
    if (data) {
      const row = data as unknown as { id: string; title: string; summary: string; description: string; area: string; employment_type: string; work_mode: string; municipality: string | null; state_code: string | null; application_url: string; companies: { name: string } };
      job = { slug: row.id, title: row.title, summary: row.summary, description: row.description, area: row.area, company: row.companies.name, city: row.municipality ? `${row.municipality}, ${row.state_code}` : "Remoto — Brasil", modality: row.work_mode === "hibrido" ? "Híbrido" : row.work_mode === "remoto" ? "Remoto" : "Presencial", contract: row.employment_type, published: "Oportunidade publicada", requirements: [], isDemo: false, applicationUrl: row.application_url };
    }
  }
  if (!job) notFound();

  return (
    <main className="detail-page">
      <div className="mx-auto max-w-4xl">
        <Link href="/#vagas" className="detail-back"><span aria-hidden="true">←</span> Voltar às oportunidades</Link>
        <article className="detail-shell">
          <div className="detail-kicker"><span>OPORTUNIDADE / {job.area.toUpperCase()}</span><span className="detail-demo">{job.isDemo ? "EXEMPLO FICTÍCIO" : "VAGA PUBLICADA"}</span></div>
          <h1 className="detail-title">{job.title}</h1>
          <p className="detail-company">{job.company}</p>
          <div className="detail-tags">{[job.city, job.modality, job.contract, job.salary].filter(Boolean).map((item) => <span key={item}>{item}</span>)}</div>
          <div className="detail-divider" />
          <div className="detail-content">
            <div>
              <h2>Sobre a oportunidade</h2>
              <p>{job.description}</p>
              {job.requirements.length > 0 && <><h2 className="mt-8">Requisitos do exemplo</h2><ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul></>}
            </div>
            <aside className="detail-aside">
              <p>{job.isDemo ? "Uma demonstração, não uma vaga aberta." : "Candidate-se pelo canal informado."}</p>
              <p>{job.isDemo ? "Este conteúdo fictício existe para apresentar a experiência do ConectaRR. Não há processo seletivo associado." : "A candidatura acontece fora do ConectaRR, no processo indicado pela organização."}</p>
              {job.isDemo ? <Link href="/#vagas">Explorar oportunidades</Link> : <a href={job.applicationUrl} target="_blank" rel="noreferrer">Acessar candidatura ↗</a>}
            </aside>
          </div>
        </article>
        <div className="footer-bottom detail-footer"><span>CONECTARR · PROJETO EM DESENVOLVIMENTO</span><span>BOA VISTA, RORAIMA</span></div>
      </div>
    </main>
  );
}
