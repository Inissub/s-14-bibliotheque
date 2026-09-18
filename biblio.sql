--
-- PostgreSQL database dump
--

\restrict 1qo8Rp9yNeiEvbqZVFnLuwvWHdEI0XBsKVpleor2p13fatt6xLeAcmFavNK7f9V

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-17 20:32:59

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

--
-- TOC entry 6 (class 2615 OID 16389)
-- Name: biblio; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA biblio;


ALTER SCHEMA biblio OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16435)
-- Name: adherents; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.adherents (
    id integer NOT NULL,
    nom character varying(150) NOT NULL,
    prenom character varying(150) NOT NULL,
    contact character varying(150)
);


ALTER TABLE biblio.adherents OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16434)
-- Name: adherents_id_seq; Type: SEQUENCE; Schema: biblio; Owner: postgres
--

CREATE SEQUENCE biblio.adherents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biblio.adherents_id_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 225
-- Name: adherents_id_seq; Type: SEQUENCE OWNED BY; Schema: biblio; Owner: postgres
--

ALTER SEQUENCE biblio.adherents_id_seq OWNED BY biblio.adherents.id;


--
-- TOC entry 221 (class 1259 OID 16391)
-- Name: auteurs; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.auteurs (
    id integer NOT NULL,
    nom character varying(150) NOT NULL,
    nationalite character varying(100)
);


ALTER TABLE biblio.auteurs OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: auteurs_id_seq; Type: SEQUENCE; Schema: biblio; Owner: postgres
--

CREATE SEQUENCE biblio.auteurs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biblio.auteurs_id_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 220
-- Name: auteurs_id_seq; Type: SEQUENCE OWNED BY; Schema: biblio; Owner: postgres
--

ALTER SEQUENCE biblio.auteurs_id_seq OWNED BY biblio.auteurs.id;


--
-- TOC entry 228 (class 1259 OID 16454)
-- Name: employes; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.employes (
    id integer NOT NULL,
    nom character varying(150) NOT NULL,
    contact character varying(150),
    email character varying(255) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    poste character varying(20) DEFAULT 'gestionnaire'::character varying NOT NULL,
    CONSTRAINT employes_poste_check CHECK (((poste)::text = ANY ((ARRAY['gestionnaire'::character varying, 'super_admin'::character varying])::text[])))
);


ALTER TABLE biblio.employes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16453)
-- Name: employes_id_seq; Type: SEQUENCE; Schema: biblio; Owner: postgres
--

CREATE SEQUENCE biblio.employes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biblio.employes_id_seq OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 227
-- Name: employes_id_seq; Type: SEQUENCE OWNED BY; Schema: biblio; Owner: postgres
--

ALTER SEQUENCE biblio.employes_id_seq OWNED BY biblio.employes.id;


--
-- TOC entry 230 (class 1259 OID 16473)
-- Name: emprunts; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.emprunts (
    id integer NOT NULL,
    adherent_id integer NOT NULL,
    livre_id integer NOT NULL,
    date_emprunt date DEFAULT CURRENT_DATE NOT NULL,
    date_retour_prevue date NOT NULL,
    date_retour_effective date
);


ALTER TABLE biblio.emprunts OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16472)
-- Name: emprunts_id_seq; Type: SEQUENCE; Schema: biblio; Owner: postgres
--

CREATE SEQUENCE biblio.emprunts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biblio.emprunts_id_seq OWNER TO postgres;

--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 229
-- Name: emprunts_id_seq; Type: SEQUENCE OWNED BY; Schema: biblio; Owner: postgres
--

ALTER SEQUENCE biblio.emprunts_id_seq OWNED BY biblio.emprunts.id;


--
-- TOC entry 224 (class 1259 OID 16417)
-- Name: livre_auteur; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.livre_auteur (
    livre_id integer NOT NULL,
    auteur_id integer NOT NULL
);


ALTER TABLE biblio.livre_auteur OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16400)
-- Name: livres; Type: TABLE; Schema: biblio; Owner: postgres
--

CREATE TABLE biblio.livres (
    id integer NOT NULL,
    titre character varying(200) NOT NULL,
    annee_publication integer,
    exemplaires_total integer NOT NULL,
    exemplaires_disponibles integer NOT NULL
);


ALTER TABLE biblio.livres OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16399)
-- Name: livres_id_seq; Type: SEQUENCE; Schema: biblio; Owner: postgres
--

CREATE SEQUENCE biblio.livres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE biblio.livres_id_seq OWNER TO postgres;

--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 222
-- Name: livres_id_seq; Type: SEQUENCE OWNED BY; Schema: biblio; Owner: postgres
--

ALTER SEQUENCE biblio.livres_id_seq OWNED BY biblio.livres.id;


--
-- TOC entry 4883 (class 2604 OID 16438)
-- Name: adherents id; Type: DEFAULT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.adherents ALTER COLUMN id SET DEFAULT nextval('biblio.adherents_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 16394)
-- Name: auteurs id; Type: DEFAULT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.auteurs ALTER COLUMN id SET DEFAULT nextval('biblio.auteurs_id_seq'::regclass);


--
-- TOC entry 4884 (class 2604 OID 16457)
-- Name: employes id; Type: DEFAULT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.employes ALTER COLUMN id SET DEFAULT nextval('biblio.employes_id_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 16476)
-- Name: emprunts id; Type: DEFAULT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.emprunts ALTER COLUMN id SET DEFAULT nextval('biblio.emprunts_id_seq'::regclass);


--
-- TOC entry 4882 (class 2604 OID 16403)
-- Name: livres id; Type: DEFAULT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.livres ALTER COLUMN id SET DEFAULT nextval('biblio.livres_id_seq'::regclass);


--
-- TOC entry 5060 (class 0 OID 16435)
-- Dependencies: 226
-- Data for Name: adherents; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.adherents (id, nom, prenom, contact) FROM stdin;
2	Mabiala	Manu	068827920
3	Milongo	Mercia	068827930
4	Akiana	Almeda	068837930
5	Akiana	Almeda	068837930
6	Samba	Chraelle	068827930
\.


--
-- TOC entry 5055 (class 0 OID 16391)
-- Dependencies: 221
-- Data for Name: auteurs; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.auteurs (id, nom, nationalite) FROM stdin;
1	Victor Hugo	Français
3	Chinua Manike	Gabonaise
\.


--
-- TOC entry 5062 (class 0 OID 16454)
-- Dependencies: 228
-- Data for Name: employes; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.employes (id, nom, contact, email, mot_de_passe_hash, poste) FROM stdin;
\.


--
-- TOC entry 5064 (class 0 OID 16473)
-- Dependencies: 230
-- Data for Name: emprunts; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.emprunts (id, adherent_id, livre_id, date_emprunt, date_retour_prevue, date_retour_effective) FROM stdin;
1	3	1	2026-09-16	2026-09-30	2026-09-16
\.


--
-- TOC entry 5058 (class 0 OID 16417)
-- Dependencies: 224
-- Data for Name: livre_auteur; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.livre_auteur (livre_id, auteur_id) FROM stdin;
1	1
1	3
\.


--
-- TOC entry 5057 (class 0 OID 16400)
-- Dependencies: 223
-- Data for Name: livres; Type: TABLE DATA; Schema: biblio; Owner: postgres
--

COPY biblio.livres (id, titre, annee_publication, exemplaires_total, exemplaires_disponibles) FROM stdin;
1	Le Monde s'effondre	1958	2	2
\.


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 225
-- Name: adherents_id_seq; Type: SEQUENCE SET; Schema: biblio; Owner: postgres
--

SELECT pg_catalog.setval('biblio.adherents_id_seq', 6, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 220
-- Name: auteurs_id_seq; Type: SEQUENCE SET; Schema: biblio; Owner: postgres
--

SELECT pg_catalog.setval('biblio.auteurs_id_seq', 3, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 227
-- Name: employes_id_seq; Type: SEQUENCE SET; Schema: biblio; Owner: postgres
--

SELECT pg_catalog.setval('biblio.employes_id_seq', 1, false);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 229
-- Name: emprunts_id_seq; Type: SEQUENCE SET; Schema: biblio; Owner: postgres
--

SELECT pg_catalog.setval('biblio.emprunts_id_seq', 1, true);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 222
-- Name: livres_id_seq; Type: SEQUENCE SET; Schema: biblio; Owner: postgres
--

SELECT pg_catalog.setval('biblio.livres_id_seq', 1, true);


--
-- TOC entry 4896 (class 2606 OID 16446)
-- Name: adherents adherents_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.adherents
    ADD CONSTRAINT adherents_pkey PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 16398)
-- Name: auteurs auteurs_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.auteurs
    ADD CONSTRAINT auteurs_pkey PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 16471)
-- Name: employes employes_email_key; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.employes
    ADD CONSTRAINT employes_email_key UNIQUE (email);


--
-- TOC entry 4900 (class 2606 OID 16469)
-- Name: employes employes_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.employes
    ADD CONSTRAINT employes_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 16484)
-- Name: emprunts emprunts_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.emprunts
    ADD CONSTRAINT emprunts_pkey PRIMARY KEY (id);


--
-- TOC entry 4894 (class 2606 OID 16423)
-- Name: livre_auteur livre_auteur_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.livre_auteur
    ADD CONSTRAINT livre_auteur_pkey PRIMARY KEY (livre_id, auteur_id);


--
-- TOC entry 4892 (class 2606 OID 16409)
-- Name: livres livres_pkey; Type: CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.livres
    ADD CONSTRAINT livres_pkey PRIMARY KEY (id);


--
-- TOC entry 4905 (class 2606 OID 16485)
-- Name: emprunts emprunts_adherent_id_fkey; Type: FK CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.emprunts
    ADD CONSTRAINT emprunts_adherent_id_fkey FOREIGN KEY (adherent_id) REFERENCES biblio.adherents(id);


--
-- TOC entry 4906 (class 2606 OID 16490)
-- Name: emprunts emprunts_livre_id_fkey; Type: FK CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.emprunts
    ADD CONSTRAINT emprunts_livre_id_fkey FOREIGN KEY (livre_id) REFERENCES biblio.livres(id);


--
-- TOC entry 4903 (class 2606 OID 16429)
-- Name: livre_auteur livre_auteur_auteur_id_fkey; Type: FK CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.livre_auteur
    ADD CONSTRAINT livre_auteur_auteur_id_fkey FOREIGN KEY (auteur_id) REFERENCES biblio.auteurs(id) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 16424)
-- Name: livre_auteur livre_auteur_livre_id_fkey; Type: FK CONSTRAINT; Schema: biblio; Owner: postgres
--

ALTER TABLE ONLY biblio.livre_auteur
    ADD CONSTRAINT livre_auteur_livre_id_fkey FOREIGN KEY (livre_id) REFERENCES biblio.livres(id) ON DELETE CASCADE;


-- Completed on 2026-09-17 20:33:02

--
-- PostgreSQL database dump complete
--

\unrestrict 1qo8Rp9yNeiEvbqZVFnLuwvWHdEI0XBsKVpleor2p13fatt6xLeAcmFavNK7f9V

