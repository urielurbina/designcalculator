-- Create a secure profile table linked to auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  primary key (id)
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using (true);

create policy "Users can insert their own profile."
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile."
  on profiles for update
  using (auth.uid() = id);

-- Create a trigger to handle new user profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for better query performance
create index if not exists profiles_username_idx on profiles (username);
create index if not exists profiles_updated_at_idx on profiles (updated_at);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.profiles to anon, authenticated;