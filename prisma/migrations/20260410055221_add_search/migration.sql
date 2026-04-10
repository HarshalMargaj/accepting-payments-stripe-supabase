-- add column
alter table public."Product"
add column search_vector tsvector;

-- fill data
update public."Product"
set search_vector = setweight(to_tsvector('english', name), 'A') ||
    setweight(to_tsvector('english', description), 'B');

-- trigger function
create or replace function product_search_trigger() 
returns trigger 
language plpgsql
as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', new.name), 'A') ||
    setweight(to_tsvector('english', new.description), 'B');
  return new;
end;
$$;

-- trigger
create trigger product_tsvector_update
before insert or update on public."Product"
for each row 
execute function product_search_trigger();

-- create index
create index product_search_idx
on public."Product"
using gin(search_vector);