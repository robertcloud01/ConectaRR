import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "@/data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  return (
    <main className="detail-page">
      <div className="mx-auto max-w-4xl">
        <Link href="/#vagas" className="detail-back"><span aria-hidden="true">←</span> Voltar às oportunidades</Link>
        <article className="detail-shell">
          <div className="detail-kicker"><span>OPORTUNIDADE / {job.area.toUpperCase()}</span><span className="detail-demo">EXEMPLO FICTÍCIO</span></div>
          <h1 className="detail-title">{job.title}</h1>
          <p className="detail-company">{job.company}</p>
          <div className="detail-tags">{[job.city, job.modality, job.contract, job.salary].filter(Boolean).map((item) => <span key={item}>{item}</span>)}</div>
          <div className="detail-divider" />
          <div className="detail-content">
            <div>
              <h2>Sobre a oportunidade</h2>
              <p>{job.description}</p>
              <h2 className="mt-8">Requisitos do exemplo</h2>
              <ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
            </div>
            <aside className="detail-aside">
              <p>Uma demonstração, não uma vaga aberta.</p>
              <p>Este conteúdo fictício existe para apresentar a experiência do ConectaRR. Não há processo seletivo associado.</p>
              <Link href="/#vagas">Explorar oportunidades</Link>
            </aside>
          </div>
        </article>
        <div className="footer-bottom detail-footer"><span>CONECTARR · PROJETO EM DESENVOLVIMENTO</span><span>BOA VISTA, RORAIMA</span></div>
      </div>
    </main>
  );
}
