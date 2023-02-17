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
    select count(*) from profiles;
    $$,
    $$
    values(5::bigint);
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