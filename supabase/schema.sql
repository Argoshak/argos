create table if not exists site_content(key text primary key, value jsonb not null, updated_at timestamptz default now());
create table if not exists projects(id uuid primary key default gen_random_uuid(), slug text unique not null, sort int default 0,
  published boolean default false, featured boolean default false, status text default 'ongoing', data jsonb not null default '{}', updated_at timestamptz default now());
create table if not exists versions(id bigserial primary key, at timestamptz default now(), actor text, snapshot jsonb not null);
create table if not exists activity(id bigserial primary key, at timestamptz default now(), actor text, action text, detail text);
create table if not exists admins(id int primary key default 1, username text unique not null, pw_hash text not null, must_change boolean default true);
create table if not exists login_attempts(id bigserial primary key, ip text, at timestamptz default now());
-- RLS on with no policies: only the server-side service key can touch data.
alter table site_content enable row level security; alter table projects enable row level security;
alter table versions enable row level security; alter table activity enable row level security;
alter table admins enable row level security; alter table login_attempts enable row level security;
insert into storage.buckets (id, name, public) values ('media','media',true) on conflict do nothing;
