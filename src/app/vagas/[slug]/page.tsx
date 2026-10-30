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
    <main className="min-h-screen bg-[#f6f8f5] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/#vagas" className="inline-flex items-center gap-2 text-sm font-semibold text-[#176344] hover:underline">← Voltar às oportunidades</Link>
        <div className="mt-8 rounded-[30px] border border-[#e0e8df] bg-white p-6 shadow-[0_25px_70px_-52px_rgba(24,62,42,.45)] sm:p-10">
          <span className="inline-flex rounded-full bg-[#fff8e9] px-3 py-1.5 text-xs font-bold text-[#85642b]">Exemplo fictício · não é uma vaga aberta</span>
          <p className="mt-7 text-sm font-semibold text-[#668075]">{job.area} <span className="mx-1.5 text-[#b7c4ba]">·</span> {job.contract}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-.05em] text-[#19392c] sm:text-5xl">{job.title}</h1>
          <p className="mt-3 text-lg text-[#65756b]">{job.company}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[job.city, job.modality, job.salary].filter(Boolean).map((item) => <span key={item} className="rounded-full border border-[#e1e8e0] bg-[#f9faf8] px-4 py-2 text-sm text-[#526258]">{item}</span>)}
          </div>
          <div className="my-8 h-px bg-[#e9eee8]" />
          <div className="grid gap-9 md:grid-cols-[1fr_250px]">
            <div>
              <h2 className="text-lg font-bold text-[#19392c]">Sobre esta oportunidade</h2>
              <p className="mt-3 text-sm leading-7 text-[#596b60]">{job.description}</p>
              <h2 className="mt-8 text-lg font-bold text-[#19392c]">Requisitos do exemplo</h2>
              <ul className="mt-3 space-y-3">
                {job.requirements.map((requirement) => <li key={requirement} className="flex gap-3 text-sm leading-6 text-[#596b60]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#4a9469]" />{requirement}</li>)}
              </ul>
            </div>
            <aside className="h-fit rounded-2xl bg-[#f5f8f4] p-5">
              <p className="text-sm font-bold text-[#19392c]">Sobre o protótipo</p>
              <p className="mt-2 text-sm leading-6 text-[#68776e]">Os dados desta página são fictícios e servem para validar a leitura dos detalhes. Nenhuma candidatura será enviada.</p>
              <Link href="/#vagas" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#176344] px-4 text-sm font-bold text-white hover:bg-[#104d33]">Continuar explorando</Link>
            </aside>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-[#87928b]">ConectaRR · Protótipo em desenvolvimento</p>
      </div>
    </main>
  );
}
