-- Create clients table
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  freelancer_id uuid references auth.users on delete cascade,
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

-- Create indexes for clients
create index if not exists clients_freelancer_id_idx on clients (freelancer_id);
create index if not exists clients_email_idx on clients (email);
create index if not exists clients_created_at_idx on clients (created_at);

-- Create freelancers table
create table if not exists public.freelancers (
  id uuid references auth.users on delete cascade primary key,
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
create policy "Users can view own profile"
  on freelancers for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on freelancers for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on freelancers for update
  using (auth.uid() = id);

-- Create quotes table
create table if not exists public.quotes (
  id uuid default gen_random_uuid() primary key,
  freelancer_id uuid references auth.users on delete cascade,
  client_id uuid references public.clients on delete restrict,
  quote_number text not null,
  total_amount numeric(10,2) not null,
  currency text not null check (currency in ('MXN', 'USD')),
  status text not null check (status in ('draft', 'sent', 'accepted', 'rejected')),
  services jsonb not null,
  terms text[] not null,
  volume_discount text check (volume_discount in ('none', '2-3', '4-5', '6+')),
  client_type text check (client_type in ('normal', 'recurrente', 'vip')),
  maintenance text check (maintenance in ('none', 'mensual', 'trimestral', 'anual')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on quotes
alter table public.quotes enable row level security;

-- Create policies for quotes
create policy "Users can view own quotes"
  on quotes for select
  using (auth.uid() = freelancer_id);

create policy "Users can insert own quotes"
  on quotes for insert
  with check (auth.uid() = freelancer_id);

create policy "Users can update own quotes"
  on quotes for update
  using (auth.uid() = freelancer_id);

create policy "Users can delete own quotes"
  on quotes for delete
  using (auth.uid() = freelancer_id);

-- Create indexes
create index if not exists quotes_freelancer_id_idx on quotes (freelancer_id);
create index if not exists quotes_client_id_idx on quotes (client_id);
create index if not exists quotes_quote_number_idx on quotes (quote_number);
create index if not exists quotes_status_idx on quotes (status);
create index if not exists quotes_created_at_idx on quotes (created_at);

-- Create function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_clients_updated_at
  before update on clients
  for each row
  execute function handle_updated_at();

create trigger handle_freelancers_updated_at
  before update on freelancers
  for each row
  execute function handle_updated_at();

create trigger handle_quotes_updated_at
  before update on quotes
  for each row
  execute function handle_updated_at();

-- Grant necessary permissions
grant all on public.clients to anon, authenticated;
grant all on public.freelancers to anon, authenticated;
grant all on public.quotes to anon, authenticated;