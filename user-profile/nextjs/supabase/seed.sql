INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user") VALUES
('00000000-0000-0000-0000-000000000000', 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa', 'authenticated', 'authenticated', 'up+rosamond_damore@example.com', crypt('password123', gen_salt('bf')), '2023-02-18 23:31:13.017218+00', NULL, '', '2023-02-18 23:31:12.757017+00', '', NULL, '', '', NULL, '2023-02-18 23:31:13.01781+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-18 23:31:12.752281+00', '2023-02-18 23:31:13.019418+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f'),
('00000000-0000-0000-0000-000000000000', '4c6ed4d5-746c-4124-9d3e-b32e5f769476', 'authenticated', 'authenticated', 'up+christopher.larson63@example.org', crypt('password123', gen_salt('bf')), '2023-02-19 00:01:51.351735+00', NULL, '', '2023-02-19 00:01:51.147035+00', '', NULL, '', '', NULL, '2023-02-19 00:01:51.352369+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-19 00:01:51.142802+00', '2023-02-19 00:01:51.353896+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f'),
('00000000-0000-0000-0000-000000000000', 'b4461135-6cc9-42e7-a2b1-450938500290', 'authenticated', 'authenticated', 'up+naomie.spencer49@example.net', crypt('password123', gen_salt('bf')), '2023-02-18 23:36:54.88495+00', NULL, '', '2023-02-18 23:36:54.67958+00', '', NULL, '', '', NULL, '2023-02-18 23:36:54.885592+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-18 23:36:54.674532+00', '2023-02-18 23:36:54.887312+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f'),
('00000000-0000-0000-0000-000000000000', 'c1ef0aed-73c0-41f1-bf51-8c1d2fe3994e', 'authenticated', 'authenticated', 'up+camila.brakus@example.net', crypt('password123', gen_salt('bf')), '2023-02-18 23:36:56.08865+00', NULL, '', '2023-02-18 23:36:55.827566+00', '', NULL, '', '', NULL, '2023-02-18 23:48:04.159175+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-18 23:36:55.823901+00', '2023-02-18 23:48:04.16081+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f'),
('00000000-0000-0000-0000-000000000000', 'ee111686-d4a9-4263-9735-445b60d53c8d', 'authenticated', 'authenticated', 'up+elmo50@example.com', crypt('password123', gen_salt('bf')), '2023-02-18 23:30:49.554834+00', NULL, '', '2023-02-18 23:30:49.330541+00', '', NULL, '', '', NULL, '2023-02-18 23:48:24.578005+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-02-18 23:30:49.322994+00', '2023-02-18 23:48:24.579303+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, 'f');

UPDATE "public"."profiles" SET 
    "display_name" = 'Damon Larkin', 
    "bio" = 'Reprehenderit et autem.'
WHERE id = 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa';

UPDATE "public"."profiles" SET 
    "display_name" = 'Adam Grimes',
    "bio" = 'Ab perspiciatis accusamus temporibus perferendis porro ex blanditiis.'
WHERE id = '4c6ed4d5-746c-4124-9d3e-b32e5f769476';

UPDATE "public"."profiles_info" SET
    "first_name" = 'Jalon',
    "last_name" = 'Hegmann',
    "dob" = '1997-11-23',
    "profile_location" = 'Rempelhaven, Bouvet Island (Bouvetoya)'
WHERE profile_id = 'd0fc7e46-a8a5-4fd4-8ba7-af485013e6fa';

UPDATE "public"."profiles_info" SET
    "first_name" = 'Cameron',
    "last_name" = 'Kerluke',
    "dob" = '1999-02-18',
    "profile_location" = 'East Vivienneton, Jamaica'
WHERE profile_id = '4c6ed4d5-746c-4124-9d3e-b32e5f769476';
