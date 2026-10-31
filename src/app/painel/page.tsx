"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Company = { id: string; name: string; review_status: "pending" | "approved" | "rejected"; municipality: string | null };
type Job = { id: string; title: string; status: string; created_at: string };

const inputClass = "dashboard-input";

export default function EmployerDashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [remoteWork, setRemoteWork] = useState(false);

  async function refresh() {
    const supabase = getSupabaseBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/conta"); return; }
    setEmail(user.email ?? "");
    const { data: companies } = await supabase.from("companies").select("id,name,review_status,municipality").order("created_at", { ascending: false }).limit(1);
    const selected = (companies?.[0] as Company | undefined) ?? null;
    setCompany(selected);
    if (selected) {
      const { data } = await supabase.from("jobs").select("id,title,status,created_at").eq("company_id", selected.id).order("created_at", { ascending: false });
      setJobs((data as Job[] | null) ?? []);
    }
    setLoading(false);
  }

  useEffect(() => { const timer = window.setTimeout(() => { void refresh(); }, 0); return () => window.clearTimeout(timer); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function createCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    const values = new FormData(event.currentTarget); const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("companies").insert({ name: String(values.get("name")).trim(), municipality: String(values.get("municipality")).trim() || null, description: String(values.get("description")).trim() || null, website_url: String(values.get("website")).trim() || null, state_code: "RR" });
    if (error) { setMessage(error.message); return; }
    setMessage("Solicitação enviada. A organização precisa ser aprovada antes do envio de vagas."); await refresh();
  }

  async function createJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!company) return; setMessage(""); const form = event.currentTarget;
    const values = new FormData(event.currentTarget); const supabase = getSupabaseBrowserClient();
    const remote = values.get("work_mode") === "remoto";
    const { error } = await supabase.from("jobs").insert({ company_id: company.id, title: String(values.get("title")).trim(), summary: String(values.get("summary")).trim(), description: String(values.get("description")).trim(), area: String(values.get("area")).trim(), employment_type: String(values.get("employment_type")), work_mode: String(values.get("work_mode")), municipality: remote ? null : String(values.get("municipality")).trim(), state_code: remote ? null : "RR", application_url: String(values.get("application_url")).trim(), closes_at: String(values.get("closes_at")) || null, status: "pending" });
    if (error) { setMessage(error.message); return; }
    setMessage("Vaga enviada para moderação. Ela só ficará pública depois da aprovação."); form.reset(); await refresh();
  }

  async function signOut() { await getSupabaseBrowserClient().auth.signOut(); router.replace("/"); router.refresh(); }

  if (loading) return <main className="account-page"><p>Carregando painel…</p></main>;
  return <main className="account-page"><div className="dashboard-wrap"><header className="dashboard-header"><Link href="/" className="brand-lockup"><span className="brand-mark">C</span><span className="brand-name">Conecta<span>RR</span></span></Link><div><span>{email}</span><button onClick={signOut} className="account-switch">Sair</button></div></header><p className="eyebrow">PAINEL DA ORGANIZAÇÃO</p><h1>Suas oportunidades, em um só lugar.</h1><p className="dashboard-lead">Envie informações completas e acompanhe a análise. Toda vaga passa por revisão antes de aparecer publicamente.</p>
    {!company ? <section className="dashboard-panel"><h2>Cadastre sua organização</h2><form className="dashboard-form" onSubmit={createCompany}><label>Nome da organização<input className={inputClass} name="name" required minLength={2} maxLength={120}/></label><label>Município<input className={inputClass} name="municipality" placeholder="Boa Vista"/></label><label>Site (opcional)<input className={inputClass} type="url" name="website" placeholder="https://"/></label><label>Sobre a organização<textarea className={inputClass} name="description" maxLength={3000} rows={4}/></label><button className="button button-dark">Enviar para validação →</button></form></section> : <><section className="dashboard-panel company-status"><div><p className="eyebrow">ORGANIZAÇÃO</p><h2>{company.name}</h2><p>{company.municipality ?? "Roraima"} · {company.review_status === "approved" ? "Aprovada" : company.review_status === "rejected" ? "Precisa de ajustes; fale com a moderação." : "Em análise"}</p></div><span className={`status-pill ${company.review_status === "approved" ? "status-pill-live" : "status-pill-demo"}`}>{company.review_status === "approved" ? "VALIDADA" : "AGUARDANDO REVISÃO"}</span></section>
    {company.review_status === "approved" && <section className="dashboard-panel"><h2>Enviar uma oportunidade</h2><form className="dashboard-form" onSubmit={createJob}><label>Cargo<input className={inputClass} name="title" required minLength={3} maxLength={140}/></label><label>Área<input className={inputClass} name="area" required maxLength={80} placeholder="Tecnologia"/></label><label>Resumo<textarea className={inputClass} name="summary" required minLength={10} maxLength={300} rows={2}/></label><label>Descrição<textarea className={inputClass} name="description" required minLength={30} maxLength={8000} rows={5}/></label><label>Tipo de contrato<select className={inputClass} name="employment_type">{["CLT","Estágio","Aprendiz","Temporário","PJ","Freelance","Outro"].map(x=><option key={x}>{x}</option>)}</select></label><label>Modalidade<select className={inputClass} name="work_mode" onChange={event => setRemoteWork(event.target.value === "remoto")}>{[["presencial","Presencial"],["hibrido","Híbrido"],["remoto","Remoto"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label>Município (obrigatório para presencial/híbrido)<input className={inputClass} name="municipality" placeholder="Boa Vista" required={!remoteWork}/></label><label>Link para candidatura<input className={inputClass} type="url" name="application_url" required placeholder="https://"/></label><label>Prazo de inscrição<input className={inputClass} type="date" name="closes_at"/></label><button className="button button-dark">Enviar vaga para revisão →</button></form></section>}
    <section className="dashboard-panel"><h2>Vagas enviadas</h2>{jobs.length ? <div className="dashboard-list">{jobs.map(job=><article key={job.id}><strong>{job.title}</strong><span>{({pending:"Em revisão",published:"Publicada",draft:"Rascunho",paused:"Pausada",closed:"Encerrada",rejected:"Rejeitada",expired:"Expirada"} as Record<string,string>)[job.status] ?? job.status}</span></article>)}</div> : <p>Ainda não há oportunidades enviadas.</p>}</section></>}
    {message && <p role="status" className="form-message">{message}</p>}<p className="account-privacy">A candidatura é recebida no endereço externo informado pela organização. O ConectaRR não recebe currículos nem confirma candidaturas.</p></div></main>;
}
