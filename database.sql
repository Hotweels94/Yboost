--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    cocktail_id character varying NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number bigint,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    age integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, cocktail_id) FROM stdin;
1	15	1
2	15	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, phone_number, role, age, created_at) FROM stdin;
3	johndoe2	johndoe2@example.com	$2b$10$6zKLKYM8O0jhoMqcLgYTFeAUJQtWHXthNBvXYnlVRdnlldMoRLjHK	606060606	user	30	2025-03-18 19:14:38.021436
6	johndoe3	johndoe3@example.com	$2b$10$F7Ef78QS.475ptMLu8Umm.a.FKCjuybp9LvekMNdvon8j4RG2nXii	606060606	user	30	2025-03-18 19:16:43.391763
8	Ryan	test@admin	$2b$10$u6UFabDOEp27aYes3Vud0.HeCB27l0K5Nsw2OhCjtAV0oB3/XmXvO	562132457	user	100	2025-03-19 10:54:30.321861
9	lucas	test2@admin2	$2b$10$rifTGXER8PaImQYKmJozPu1mj9vjI99gOMQ/9jkmQ92Kkl.LWe5tK	562132456	user	110	2025-03-19 11:03:43.158564
10	mathieu	test3@test3	$2b$10$HA4KnYMqfIxoLPMR6Z99Pu.dPCPzxJj8PvzySXq4bxQPrNBYLHOPC	562132456	user	110	2025-03-19 11:04:40.970024
11	nico	test4@gmail.com	$2b$10$TpNpx4WQMEMssxS5khV6UeHB3oTc2eHzSYA0eH9JTm9zNwW2vRBZW	562132457	user	110	2025-03-19 11:06:38.079376
14	gabou	gabou@gabou	$2b$10$x27uT7pnZ/eGCBs6HPfvz.8EvOGn5wzh0Z/D.8SsKYSOMp07qQnPq	562132457	user	1	2025-04-09 10:54:05.274839
15	test56	test56@test56	$2b$10$am2N8cD8QRepbjb91a3DgeG4FtiBoHgtLxkiVX/Z8npXrfOFol/T.	562132457	admin	12	2025-04-30 10:53:14.160276
16	test57	test57@gmail.com	$2b$10$307YiINnpBlFPcFGoxV1m.4ecYzklno4sXy.tlhCBbQ39VpaaFlK6	562132457	user	12	2025-05-12 13:15:10.156698
17	test58	test58@gmail.com	$2b$10$w28T720uxceSLFguFC076.2.lfYuaERmfmAvA0CoFrmHCKgZg3gzi	562132457	user	15	2025-05-12 13:42:19.787183
18	test59	test59@gmail.com	$2b$10$K3c3j6dFtYZqs07HYvdHLu6T5y9RsSmD5hPvagQ3h0XCs6UW7ouCi	562132456	user	18	2025-05-12 13:48:01.585788
19	AdminAuriles	auriles.admin@gmail.com	$2b$10$CpbRUGGz3Yyu47W9YKhSpuqf8sCRFgob/Ttay/ZRjKW/xGM/8.0Zy	562132456	admin	30	2025-05-20 11:23:44.587358
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 19, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorites fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

