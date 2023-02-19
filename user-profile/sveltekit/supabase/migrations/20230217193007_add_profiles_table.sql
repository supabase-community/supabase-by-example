create extension if not exists moddatetime schema extensions;

-- create public profile table that anyone can view
create table public.profiles (
    id uuid primary key references auth.users on delete cascade,
    display_name text unique,
    slug text generated always as (slugify(display_name)) stored,
    bio text,
    created_at timestamptz default now() not null,
    updated_at timestamptz
);

-- create profile info table to store sensitive data
create table public.profiles_info (
    profile_id uuid primary key references public.profiles on delete cascade,
    first_name text,
    last_name text,
    dob date,
    profile_location text,
    created_at timestamptz default now() not null,
    updated_at timestamptz
);

-- insert id into profiles table on signup
create function public.handle_new_profile()
returns trigger as $$
begin
    -- create a entry in profiles table
    insert into public.profiles (id)
    values (new.id);

    -- create a entry in profiles_info table
    insert into public.profiles_info (profile_id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;

-- trigger to add profile info when a signup happens
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_profile();

-- use moddatetime function to update updated_at field when a table
-- is about to be updated
create trigger handle_updated_at 
    before update on profiles
    for each row execute procedure moddatetime(updated_at);

create trigger handle_updated_at 
    before update on profiles_info
    for each row execute procedure moddatetime(updated_at);

-- enable RLS (profiles table)
alter table public.profiles enable row level security;

-- Policies (profiles table)
create policy "anyone can view all profiles" on public.profiles
as permissive for select 
to public
using (true);

create policy "allow insert for own profile only" on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "allow update for own profile only" on public.profiles 
as permissive for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "allow delete for own profile only" on public.profiles 
as permissive for delete
to authenticated
using (auth.uid() = id);


-- enable RLS (profiles_info table)
alter table public.profiles_info enable row level security;

-- Policies (profiles_info table)
create policy "allow select for users own profile info only" on public.profiles_info 
as permissive for select 
to authenticated
using (auth.uid() = profile_id);

create policy "allow insert for own profile info only" on public.profiles_info 
as permissive for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "allow update for own profile info only" on public.profiles_info 
as permissive for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "allow delete for own profile info only" on public.profiles_info 
as permissive for delete
to authenticated
using (auth.uid() = profile_id);

create function update_profile(display_name text, bio text, first_name text, last_name text, dob date, profile_location text)
returns boolean
language plpgsql
as $$
begin
    update profiles 
    set display_name = $1, bio = $2
    where id = auth.uid();

    update profiles_info 
    set first_name = $3, 
        last_name = $4,
        dob = $5,
        profile_location = $6
    where profile_id = auth.uid();
    
    return true;
end; $$;
