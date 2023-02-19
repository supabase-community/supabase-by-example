-- original source: https://gist.github.com/abn/779166b0c766ce67351c588489831852

-- https://www.postgresql.org/docs/9.6/unaccent.html
create extension if not exists "unaccent" schema extensions;

-- create the function in the public schema
create or replace function public.slugify(
  v text
) returns text
  language plpgsql
  strict immutable as
$function$
    begin
        -- 1. trim trailing and leading whitespaces from text
        -- 2. remove accents (diacritic signs) from a given text
        -- 3. lowercase unaccented text
        -- 4. replace non-alphanumeric (excluding hyphen, underscore) with a hyphen
        -- 5. trim leading and trailing hyphens
        return trim(both '-' from regexp_replace(lower(unaccent(trim(v))), '[^a-z0-9_-]+', '-', 'gi'));
    end;
$function$;
