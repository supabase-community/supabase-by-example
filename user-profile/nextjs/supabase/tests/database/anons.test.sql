begin;
select no_plan();

set search_path = extensions, public;

set local role anon;
reset "request.jwt.claim.sub";

\echo ========================
\echo profiles
\echo ========================

select
  results_eq(
    $$
    select display_name from profiles where id in ('d0fc7e46-a8a5-4fd4-8ba7-af485013e6fa', '4c6ed4d5-746c-4124-9d3e-b32e5f769476');
    $$,
    $$
    values('Damon Larkin'::text), ('Adam Grimes'::text);
    $$,
    'anon can see all users'
  );

\echo ========================
\echo profiles_info
\echo ========================

select
  is_empty(
    $$
    select * from profiles_info;
    $$,
    'anon cannot see any profiles_info'
  );

select * from finish();

do $$ begin assert num_failed() = 0; end $$;

rollback;