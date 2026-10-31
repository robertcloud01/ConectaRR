-- Exposição mínima e segura do próprio status de moderador para a interface.
-- SECURITY INVOKER mantém as permissões RLS do usuário que chama a função.
create or replace function public.is_current_user_moderator()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_moderator();
$$;

revoke all on function public.is_current_user_moderator() from public, anon;
grant execute on function public.is_current_user_moderator() to authenticated;

-- Cobre a FK jobs.created_by e consultas de auditoria por autor.
create index if not exists jobs_created_by_idx on public.jobs (created_by);
