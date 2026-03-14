--
-- PostgreSQL database dump
--

\restrict 8135AorApvkCG96rZy5iajKIoTFoQfVzwHgbenuLWx4rN1i3ITGttXoEVelgo8C

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

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
-- Name: individuals; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    species_id integer NOT NULL,
    nickname text NOT NULL,
    scientist_name text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.individuals OWNER TO redu;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.individuals_id_seq OWNER TO redu;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    sighted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    individual_id integer NOT NULL,
    location text,
    healthy boolean,
    email text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sightings OWNER TO redu;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sightings_id_seq OWNER TO redu;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name text NOT NULL,
    scientific_name text NOT NULL,
    estimated_population integer,
    conservation_status text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.species OWNER TO redu;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.species_id_seq OWNER TO redu;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.individuals (id, species_id, nickname, scientist_name, created_at) FROM stdin;
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.sightings (id, sighted_at, individual_id, location, healthy, email, created_at) FROM stdin;
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.species (id, common_name, scientific_name, estimated_population, conservation_status, created_at) FROM stdin;
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.individuals_id_seq', 1, false);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.sightings_id_seq', 1, false);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.species_id_seq', 1, false);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 8135AorApvkCG96rZy5iajKIoTFoQfVzwHgbenuLWx4rN1i3ITGttXoEVelgo8C

