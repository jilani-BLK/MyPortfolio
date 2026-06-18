-- ============================================================
--  Commentaires du portfolio — schéma Supabase
--  À coller dans : Supabase → SQL Editor → New query → Run
--  (Remplace l'email ci-dessous si ton email admin est différent.)
-- ============================================================

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  page_key text not null,
  author_name text not null check (char_length(author_name) between 1 and 60),
  body text not null check (char_length(body) between 1 and 2000),
  parent_id uuid references public.comments(id) on delete cascade,
  is_owner boolean not null default false
);

create index if not exists comments_page_key_idx
  on public.comments (page_key, created_at);

-- Permissions de table (la sécurité fine est gérée par les règles RLS ci-dessous)
grant select, insert on public.comments to anon, authenticated;
grant delete on public.comments to authenticated;

alter table public.comments enable row level security;

-- Lecture : publique
create policy "comments_select_all"
  on public.comments for select
  using (true);

-- Écriture : tout le monde peut publier un commentaire NON-auteur
create policy "comments_insert_anon"
  on public.comments for insert
  with check (is_owner = false);

-- Écriture « auteur » : réservée à l'admin connecté avec SON email
create policy "comments_insert_owner"
  on public.comments for insert
  to authenticated
  with check (is_owner = true and auth.jwt() ->> 'email' = 'jilani.belarbi@yahoo.com');

-- Suppression : réservée à l'admin
create policy "comments_delete_owner"
  on public.comments for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'jilani.belarbi@yahoo.com');
