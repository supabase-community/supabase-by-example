begin;
select no_plan();

set search_path = extensions, public;

set local role authenticated;
set local "request.jwt.claim.sub" to 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa';

\echo ========================
\echo profiles rls
\echo ========================

select
  results_eq(
    $$
    select display_name from profiles where id in ('d0fc7e46-a8a5-4fd4-8ba7-af485013e6fa', '4c6ed4d5-746c-4124-9d3e-b32e5f769476');
    $$,
    $$
    values('Damon Larkin'::text), ('Adam Grimes'::text);
    $$,
    'authenticated can see all users'
  );

\echo ========================
\echo profiles_info rls
\echo ========================

select
  results_eq(
    $$
    select first_name from profiles_info;
    $$,
    $$
    values('Jalon'::text)
    $$,
    'the user can see its own profiles_info'
  );

select
  is_empty(
    $$
    select * from profiles_info where profile_id = '4c6ed4d5-746c-4124-9d3e-b32e5f769476';
    $$,
    'user cannot see someone else profiles_info'
  );

select
  is_empty(
    $$
    update profiles_info set first_name = 'Samuel' where profile_id = '4c6ed4d5-746c-4124-9d3e-b32e5f769476'
    returning first_name;
    $$,
    'a user cannot update other user profiles_info'
  );

select
  results_eq(
    $$
    update profiles_info set first_name = 'James' where profile_id = 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa'
    returning first_name;
    $$,
    $$
    values('James')
    $$,
    'a user can update his own profiles_info'
  );

select
  results_eq(
    $$
    delete from profiles where id = 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa' returning 1;
    $$,
    $$
    values(1);
    $$,
    'a user can delete his own profile'
  );

select
  is_empty(
    $$
    delete from profiles where id = '4c6ed4d5-746c-4124-9d3e-b32e5f769476' returning *;
    $$,
    'a user cannot delete other user profile'
  );

select * from finish();

do $$ begin assert num_failed() = 0; end $$;

rollback;