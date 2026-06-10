-- SUPABASE DATABASE SETUP SCHEMA
-- Copy and paste this script into your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql) and click RUN.

-- 1. Projects Table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image text not null,
  tech text[] not null,
  category text not null,
  github text default '',
  demo text default '',
  features text[] default '{}',
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Skills Table
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  skills text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Experience & Education Table
create table if not exists experience (
  id uuid default gen_random_uuid() primary key,
  type text not null, -- 'education' or 'experience'
  title text not null,
  organization text not null,
  period text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. About Highlights Table
create table if not exists about_highlights (
  id uuid default gen_random_uuid() primary key,
  icon_name text not null, -- e.g. 'GraduationCap', 'Code2', 'Lightbulb'
  title text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Contact Info Table
create table if not exists contact_info (
  id uuid default gen_random_uuid() primary key,
  icon_name text not null, -- e.g. 'Mail', 'Phone', 'MapPin'
  title text not null,
  value text not null,
  href text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Contact Messages Table
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY (RLS)
alter table projects enable row level security;
alter table skills enable row level security;
alter table experience enable row level security;
alter table about_highlights enable row level security;
alter table contact_info enable row level security;
alter table messages enable row level security;

-- DEFINE SECURITY POLICIES FOR DIRECT CLIENTS (IF ROUTED OUTSIDE BACKEND)
-- Drop existing policies if they exist to avoid duplication
drop policy if exists "Allow public read projects" on projects;
drop policy if exists "Allow public read skills" on skills;
drop policy if exists "Allow public read experience" on experience;
drop policy if exists "Allow public read highlights" on about_highlights;
drop policy if exists "Allow public read contact_info" on contact_info;
drop policy if exists "Allow public insert messages" on messages;

-- Create policies
create policy "Allow public read projects" on projects for select using (true);
create policy "Allow public read skills" on skills for select using (true);
create policy "Allow public read experience" on experience for select using (true);
create policy "Allow public read highlights" on about_highlights for select using (true);
create policy "Allow public read contact_info" on contact_info for select using (true);
create policy "Allow public insert messages" on messages for insert with check (true);
