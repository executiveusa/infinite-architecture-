create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique check (reference ~ '^IA-[0-9]{8}-[A-F0-9]{4}$'),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  whatsapp text not null check (char_length(whatsapp) between 7 and 40),
  location text not null check (char_length(location) between 2 and 180),
  property_control text not null check (char_length(property_control) <= 180),
  intended_use text not null check (char_length(intended_use) <= 180),
  investment_range text not null check (char_length(investment_range) <= 120),
  timeline text not null check (char_length(timeline) <= 120),
  property_url text,
  main_constraint text not null check (char_length(main_constraint) between 8 and 2000),
  offer text not null default 'site_to_stay_opportunity_scan',
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  consent_at timestamptz not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'qualified', 'proposal', 'closed')),
  notes text,
  user_agent text
);

alter table public.inquiries enable row level security;

revoke all on table public.inquiries from anon, authenticated;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status, created_at desc);

comment on table public.inquiries is
  'Private Site-to-Stay inquiry records. Server-only writes; no public read policy.';
