-- Create quotes table
create table if not exists public.quotes (
  id uuid default gen_random_uuid() primary key,
  freelancer_id uuid not null references auth.users on delete cascade,
  client_id uuid not null references public.clients on delete restrict,
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

-- Create trigger for updated_at
create trigger handle_quotes_updated_at
  before update on quotes
  for each row
  execute function handle_updated_at();

-- Grant necessary permissions
grant all on public.quotes to anon, authenticated;

-- Create function to generate quote number
create or replace function generate_quote_number(freelancer_id uuid)
returns text
language plpgsql
as $$
declare
  quote_count integer;
  year_str text;
begin
  select count(*)
  into quote_count
  from quotes
  where quotes.freelancer_id = $1;

  year_str := to_char(current_date, 'YYYY');
  return 'COT-' || year_str || '-' || lpad((quote_count + 1)::text, 4, '0');
end;
$$;