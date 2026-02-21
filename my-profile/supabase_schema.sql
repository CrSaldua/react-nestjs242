-- Create the table
create table guestbook (
  id bigint primary key generated always as identity,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table guestbook enable row level security;

-- Create a policy to allow anyone to read/write (since it's a public guestbook)
-- Note: For better security, you might want to restrict DELETE/UPDATE to specific users later.
create policy "Allow public access" 
on guestbook 
for all 
using (true) 
with check (true);
