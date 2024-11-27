-- Create subscriptions table if it doesn't exist
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text not null,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.subscriptions enable row level security;

-- Create policies
create policy "Allow anonymous inserts to subscriptions"
  on public.subscriptions for insert
  to anon
  with check (true);

create policy "Allow users to view their own subscription"
  on public.subscriptions for select
  to authenticated
  using (email = auth.email());

create policy "Allow users to update their own subscription"
  on public.subscriptions for update
  to authenticated
  using (email = auth.email())
  with check (email = auth.email());

-- Add indexes
create index if not exists subscriptions_email_idx on public.subscriptions (email);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

-- Add email validation
alter table public.subscriptions
  add constraint subscriptions_email_check
  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create brand_leads table
create table if not exists public.brand_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand_name text not null,
  whatsapp text not null,
  email text not null,
  state text not null,
  diagnostic_score integer not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'pending' not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.brand_leads enable row level security;

-- Create policy to allow inserts from authenticated and anonymous users
create policy "Allow anonymous inserts"
  on public.brand_leads
  for insert
  to anon
  with check (true);

-- Create policy to allow select only for authenticated users
create policy "Allow authenticated select"
  on public.brand_leads
  for select
  to authenticated
  using (true);

-- Add indexes for better query performance
create index if not exists brand_leads_email_idx on public.brand_leads (email);
create index if not exists brand_leads_status_idx on public.brand_leads (status);
create index if not exists brand_leads_submitted_at_idx on public.brand_leads (submitted_at);

-- Add validation for email format
alter table public.brand_leads
  add constraint brand_leads_email_check
  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add validation for whatsapp format (assuming Mexican numbers)
alter table public.brand_leads
  add constraint brand_leads_whatsapp_check
  check (whatsapp ~* '^\+?[0-9]{10,15}$');

-- Add validation for status values
alter table public.brand_leads
  add constraint brand_leads_status_check
  check (status in ('pending', 'contacted', 'converted', 'rejected'));

-- Create statistics table
create table if not exists public.estadistica (
  id uuid default gen_random_uuid() primary key,
  pdfs_generados integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert initial row if not exists
insert into public.estadistica (pdfs_generados)
select 0
where not exists (select 1 from public.estadistica);

-- Enable Row Level Security (RLS)
alter table public.estadistica enable row level security;

-- Create policy to allow updates
create policy "Allow anonymous updates"
  on public.estadistica
  for update
  to anon
  using (true)
  with check (true);

-- Create policy to allow selects
create policy "Allow anonymous selects"
  on public.estadistica
  for select
  to anon
  using (true);