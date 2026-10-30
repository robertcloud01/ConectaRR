import { createClient } from "@supabase/supabase-js";
import { cities as demoCities, jobs as demoJobs, type Job } from "@/data/jobs";

type PublishedJobRow = {
  id: string;
  title: string;
  summary: string;
  description: string;
  area: string;
  employment_type: string;
  work_mode: "presencial" | "hibrido" | "remoto";
  municipality: string | null;
  state_code: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string | null;
  application_url: string;
  published_at: string | null;
  companies: { name: string };
};

function formatSalary(row: PublishedJobRow) {
  if (row.salary_min === null && row.salary_max === null) return undefined;
  const format = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const amount = row.salary_min !== null && row.salary_max !== null
    ? `${format(row.salary_min)} a ${format(row.salary_max)}`
    : format(row.salary_min ?? row.salary_max ?? 0);
  return row.salary_period ? `${amount} / ${row.salary_period}` : amount;
}

function formatDate(value: string | null) {
  if (!value) return "Publicada recentemente";
  return `Publicada em ${new Date(value).toLocaleDateString("pt-BR")}`;
}

function toJob(row: PublishedJobRow): Job {
  const city = row.municipality
    ? `${row.municipality}, ${row.state_code}`
    : row.work_mode === "remoto" ? "Remoto — Brasil" : "Local não informado";
  const modality = row.work_mode === "hibrido" ? "Híbrido" : row.work_mode === "remoto" ? "Remoto" : "Presencial";

  return {
    slug: row.id,
    title: row.title,
    company: row.companies.name,
    city,
    modality,
    contract: row.employment_type,
    area: row.area,
    published: formatDate(row.published_at),
    salary: formatSalary(row),
    summary: row.summary,
    description: row.description,
    requirements: [],
    isDemo: false,
    applicationUrl: row.application_url,
  };
}

export async function getPublicJobs(): Promise<{ jobs: Job[]; cities: string[]; isDemo: boolean }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const demo = { jobs: demoJobs, cities: demoCities, isDemo: true };
  if (!url || !publishableKey) return demo;

  const supabase = createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from("jobs")
    .select("id,title,summary,description,area,employment_type,work_mode,municipality,state_code,salary_min,salary_max,salary_period,application_url,published_at,companies!inner(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(100);

  if (error || !data?.length) return demo;

  const liveJobs = (data as unknown as PublishedJobRow[]).map(toJob);
  const liveCities = ["Todas as cidades", ...new Set(liveJobs.map((job) => job.city))];
  return { jobs: liveJobs, cities: liveCities, isDemo: false };
}
