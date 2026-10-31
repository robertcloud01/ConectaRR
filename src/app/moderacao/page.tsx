"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Company = { id: string; name: string; description: string | null; municipality: string | null; website_url: string | null; review_status: string };
type Job = { id: string; title: string; summary: string; description: string; area: string; status: string; company_id: string; application_url: string; companies: { name: string } };

export default function ModerationPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]); const [jobs, setJobs] = useState<Job[]>([]); const [allowed, setAllowed] = useState<boolean | null>(null); const [notice, setNotice] = useState("");
  async function load() {
    const supabase = getSupabaseBrowserClient(); const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/conta"); return; }
    const { data: isModerator, error: moderatorError } = await supabase.rpc("is_current_user_moderator");
    if (moderatorError || isModerator !== true) { setAllowed(false); return; }
    const { data: cs, error: ce } = await supabase.from("companies").select("id,name,description,municipality,website_url,review_status").in("review_status", ["pending", "rejected"]).order("created_at");
    if (ce) { setAllowed(false); return; }
    const { data: js, error: je } = await supabase.from("jobs").select("id,title,summary,description,area,status,company_id,application_url,companies(name)").in("status", ["pending", "published", "rejected"]).order("created_at", { ascending: false });
    if (je) { setAllowed(false); return; }
    setCompanies((cs as Company[]) ?? []); setJobs((js as unknown as Job[]) ?? []); setAllowed(true);
  }
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  async function reviewCompany(id: string, status: "approved" | "rejected") { const { error } = await getSupabaseBrowserClient().from("companies").update({ review_status: status }).eq("id", id); setNotice(error?.message ?? "Organização revisada."); if (!error) await load(); }
  async function reviewJob(job: Job, status: "published" | "rejected") { const payload = status === "published" ? { status, published_at: new Date().toISOString() } : { status, published_at: null }; const { error } = await getSupabaseBrowserClient().from("jobs").update(payload).eq("id", job.id); setNotice(error?.message ?? "Vaga revisada."); if (!error) await load(); }
  if (allowed === null) return <main className="account-page"><p>Verificando acesso…</p></main>;
  if (!allowed) return <main className="account-page"><section className="account-card"><p className="eyebrow">ÁREA RESTRITA</p><h1>Acesso exclusivo à moderação.</h1><p>Sua conta não possui permissão de moderador. A autorização é feita no banco de dados; cadastrar-se no site não concede esse acesso.</p><Link href="/" className="button button-dark">Voltar ao início →</Link></section></main>;
  return <main className="account-page"><div className="dashboard-wrap"><Link href="/" className="detail-back">← ConectaRR</Link><p className="eyebrow">OPERAÇÃO / MODERAÇÃO</p><h1>Revisão de conteúdo</h1><p className="dashboard-lead">Aprove somente organizações verificadas e vagas com informações claras, atuais e com destino de candidatura válido.</p>{notice && <p role="status" className="form-message">{notice}</p>}<section className="dashboard-panel"><h2>Organizações para revisar</h2>{companies.length ? <div className="dashboard-list">{companies.map(c=><article key={c.id} className="moderation-card"><div><strong>{c.name}</strong><p>{c.municipality ?? "Município não informado"} · {c.description || "Sem descrição"}</p>{c.website_url && <a href={c.website_url} target="_blank" rel="noreferrer">Abrir site ↗</a>}</div><div className="moderation-actions"><button onClick={()=>void reviewCompany(c.id,"approved")}>Aprovar</button><button onClick={()=>void reviewCompany(c.id,"rejected")}>Rejeitar</button></div></article>)}</div> : <p>Nenhuma organização pendente.</p>}</section><section className="dashboard-panel"><h2>Vagas recebidas e publicadas</h2>{jobs.length ? <div className="dashboard-list">{jobs.map(job=><article key={job.id} className="moderation-card"><div><strong>{job.title} · {job.companies.name}</strong><p>{job.area} · {job.summary}</p><details><summary>Ver descrição e candidatura</summary><p>{job.description}</p><a href={job.application_url} target="_blank" rel="noreferrer">Ver link de candidatura ↗</a></details><small>Estado: {job.status}</small></div>{job.status === "pending" && <div className="moderation-actions"><button onClick={()=>void reviewJob(job,"published")}>Publicar</button><button onClick={()=>void reviewJob(job,"rejected")}>Rejeitar</button></div>}</article>)}</div> : <p>Nenhuma vaga para revisar.</p>}</section><p className="account-privacy">O painel consulta permissões de moderador aplicadas no banco. O primeiro moderador deve ser cadastrado por um administrador no schema privado.</p></div></main>;
}
