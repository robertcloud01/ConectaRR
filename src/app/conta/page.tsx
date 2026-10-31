"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") ?? "").trim();
    const password = String(values.get("password") ?? "");
    const supabase = getSupabaseBrowserClient();
    const result = mode === "register"
      ? await supabase.auth.signUp({ email, password, options: { data: { display_name: String(values.get("name") ?? "").trim() } } })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === "register" && !result.data.session) { setMessage("Confira seu e-mail para confirmar a conta. Depois, entre para cadastrar a organização."); return; }
    router.push("/painel"); router.refresh();
  }

  return <main className="account-page"><Link href="/" className="detail-back">← Voltar ao ConectaRR</Link><section className="account-card"><p className="eyebrow">ÁREA DE ORGANIZAÇÕES</p><h1>{mode === "register" ? "Vamos conectar sua organização." : "Que bom ter você de volta."}</h1><p>Crie sua conta para solicitar a validação da organização e enviar oportunidades para análise.</p><form onSubmit={submit} className="account-form">{mode === "register" && <label>Seu nome<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label>}<label>E-mail<input name="email" type="email" required autoComplete="email" /></label><label>Senha<input name="password" type="password" required minLength={8} autoComplete={mode === "register" ? "new-password" : "current-password"} /><small>Use pelo menos 8 caracteres.</small></label><button className="button button-dark" disabled={busy}>{busy ? "Aguarde…" : mode === "register" ? "Criar conta" : "Entrar"} <span aria-hidden="true">→</span></button></form>{message && <p role="status" className="form-message">{message}</p>}<button className="account-switch" type="button" onClick={() => { setMode(mode === "register" ? "login" : "register"); setMessage(""); }}>{mode === "register" ? "Já tem conta? Entrar" : "Ainda não tem conta? Criar conta"}</button><p className="account-privacy">A conta usa autenticação do Supabase. O ConectaRR não solicita currículo nem dados de candidatura no piloto.</p></section></main>;
}
