-- Create freelancers table
create table if not exists public.freelancers (
  id uuid primary key references auth.users on delete cascade,
  name text not null,
  website text,
  email text not null,
  phone text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on freelancers
alter table public.freelancers enable row level security;

-- Create policies for freelancers
create policy "Users can view own freelancer profile"
  on freelancers for select
  using (auth.uid() = id);

create policy "Users can update own freelancer profile"
  on freelancers for update
  using (auth.uid() = id);

create policy "Users can insert own freelancer profile"
  on freelancers for insert
  with check (auth.uid() = id);

-- Create clients table
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  freelancer_id uuid not null references auth.users on delete cascade,
  name text not null,
  company text,
  email text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on clients
alter table public.clients enable row level security;

-- Create policies for clients
create policy "Users can view own clients"
  on clients for select
  using (auth.uid() = freelancer_id);

create policy "Users can insert own clients"
  on clients for insert
  with check (auth.uid() = freelancer_id);

create policy "Users can update own clients"
  on clients for update
  using (auth.uid() = freelancer_id);

create policy "Users can delete own clients"
  on clients for delete
  using (auth.uid() = freelancer_id);

-- Create indexes
create index if not exists clients_freelancer_id_idx on clients (freelancer_id);
create index if not exists clients_email_idx on clients (email);

-- Add email validation
alter table public.clients
  add constraint clients_email_check
  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

alter table public.freelancers
  add constraint freelancers_email_check
  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger handle_freelancers_updated_at
  before update on freelancers
  for each row
  execute function handle_updated_at();

create trigger handle_clients_updated_at
  before update on clients
  for each row
  execute function handle_updated_at();