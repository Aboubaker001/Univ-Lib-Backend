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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BookStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BookStatus" AS ENUM (
    'AVAILABLE',
    'CHECKED_OUT',
    'RESERVED',
    'UNDER_MAINTENANCE',
    'LOST'
);


ALTER TYPE public."BookStatus" OWNER TO postgres;

--
-- Name: ReservationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReservationStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'COMPLETED',
    'CANCELED',
    'OVERDUE',
    'RETURNED'
);


ALTER TYPE public."ReservationStatus" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'STUDENT',
    'LIBRARIAN',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Book" (
    id text NOT NULL,
    isbn text NOT NULL,
    title text NOT NULL,
    edition text NOT NULL,
    publisher text NOT NULL,
    "publicationYear" integer NOT NULL,
    "pageCout" integer NOT NULL,
    language text NOT NULL,
    "coverUrl" text,
    "digitalCopyUrl" text NOT NULL,
    keywords text[],
    authors text[],
    status public."BookStatus" DEFAULT 'AVAILABLE'::public."BookStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Book" OWNER TO postgres;

--
-- Name: Fine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Fine" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "reservationId" text NOT NULL,
    amount double precision DEFAULT 0.00 NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Fine" OWNER TO postgres;

--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "bookId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "returnDate" timestamp(3) without time zone NOT NULL,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "familyName" text NOT NULL,
    "studentId" text NOT NULL,
    faculty text NOT NULL,
    "academicYear" text NOT NULL,
    major text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "idCardUrl" text,
    password text NOT NULL,
    role public."UserRole" DEFAULT 'STUDENT'::public."UserRole" NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "reservationLimit" integer DEFAULT 3 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Book" (id, isbn, title, edition, publisher, "publicationYear", "pageCout", language, "coverUrl", "digitalCopyUrl", keywords, authors, status, "createdAt", "updatedAt") FROM stdin;
cmaiv6t8v0009m608lpvul0x6	9780321573513	Design Patterns	1st	Addison-Wesley	1994	395	English	http://example.com/cover4.jpg	http://example.com/digital4.pdf	{"design patterns","software engineering"}	{"Erich Gamma","Richard Helm"}	RESERVED	2025-05-10 23:36:50.575	2025-05-10 23:36:50.575
cmaiv6t8v0008m6080lnbjehk	9780596007126	JavaScript: The Good Parts	1st	O'Reilly Media	2008	176	English	http://example.com/cover2.jpg	http://example.com/digital2.pdf	{javascript,programming}	{"Douglas Crockford"}	AVAILABLE	2025-05-10 23:36:50.575	2025-05-10 23:36:50.575
cmaiv6t8v0006m60860rb147v	9780134685991	Effective Java	3rd	Addison-Wesley	2018	416	English	http://example.com/cover5.jpg	http://example.com/digital5.pdf	{java,programming}	{"Joshua Bloch"}	AVAILABLE	2025-05-10 23:36:50.575	2025-05-10 23:36:50.575
cmaiv6t8v0007m6083o7i9k5w	9780262033848	Introduction to Algorithms	3rd	MIT Press	2009	1312	English	http://example.com/cover3.jpg	http://example.com/digital3.pdf	{algorithms,"computer science"}	{"Thomas H. Cormen","Charles E. Leiserson"}	CHECKED_OUT	2025-05-10 23:36:50.575	2025-05-10 23:36:50.575
cmaiv6t8v0005m608qjszjih2	9780132350884	Clean Code	1st	Prentice Hall	2008	464	English	http://example.com/cover1.jpg	http://example.com/digital1.pdf	{programming,software,"clean code"}	{"Robert C. Martin"}	AVAILABLE	2025-05-10 23:36:50.575	2025-05-10 23:36:50.575
\.


--
-- Data for Name: Fine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Fine" (id, "userId", "reservationId", amount, paid, "createdAt", "updatedAt") FROM stdin;
cmaiv6t9f000sm608vmfxl4vc	cmaiv6t8h0003m608vrx2klpp	cmaiv6t93000gm608dnobwo7h	7.5	t	2025-05-10 23:36:50.595	2025-05-10 23:36:50.595
cmaiv6t9f000tm608eww2engt	cmaiv6t3s0000m608q3qwa9f0	cmaiv6t93000fm608uiaq8mud	10	t	2025-05-10 23:36:50.595	2025-05-10 23:36:50.595
cmaiv6t9f000om608lekew6ew	cmaiv6t7u0001m608ytkiurz2	cmaiv6t93000im608csvj2vff	15	f	2025-05-10 23:36:50.595	2025-05-10 23:36:50.595
cmaiv6t9f000rm608zy6l7n73	cmaiv6t8d0002m6081mm7wav2	cmaiv6t93000jm608pn19coe2	20	f	2025-05-10 23:36:50.595	2025-05-10 23:36:50.595
cmaiv6t9f000qm608frpl5qv8	cmaiv6t8o0004m6083qa1m78q	cmaiv6t93000hm608f5l3gif1	5	f	2025-05-10 23:36:50.595	2025-05-10 23:36:50.595
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (id, "userId", "bookId", "startDate", "returnDate", status, "createdAt", "updatedAt") FROM stdin;
cmaiv6t93000fm608uiaq8mud	cmaiv6t3s0000m608q3qwa9f0	cmaiv6t8v0008m6080lnbjehk	2025-05-11 00:00:00	2025-05-18 00:00:00	APPROVED	2025-05-10 23:36:50.584	2025-05-10 23:36:50.584
cmaiv6t93000jm608pn19coe2	cmaiv6t8d0002m6081mm7wav2	cmaiv6t8v0006m60860rb147v	2025-05-13 00:00:00	2025-05-20 00:00:00	CANCELED	2025-05-10 23:36:50.584	2025-05-10 23:36:50.584
cmaiv6t93000gm608dnobwo7h	cmaiv6t8h0003m608vrx2klpp	cmaiv6t8v0009m608lpvul0x6	2025-05-12 00:00:00	2025-05-19 00:00:00	RETURNED	2025-05-10 23:36:50.584	2025-05-10 23:36:50.584
cmaiv6t93000hm608f5l3gif1	cmaiv6t8o0004m6083qa1m78q	cmaiv6t8v0005m608qjszjih2	2025-05-10 00:00:00	2025-05-17 00:00:00	PENDING	2025-05-10 23:36:50.584	2025-05-10 23:36:50.584
cmaiv6t93000im608csvj2vff	cmaiv6t7u0001m608ytkiurz2	cmaiv6t8v0007m6083o7i9k5w	2025-05-09 00:00:00	2025-05-16 00:00:00	OVERDUE	2025-05-10 23:36:50.584	2025-05-10 23:36:50.584
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "firstName", "familyName", "studentId", faculty, "academicYear", major, email, phone, "idCardUrl", password, role, "isVerified", "reservationLimit", "createdAt", "updatedAt") FROM stdin;
cmaiv6t3s0000m608q3qwa9f0	Jane	Smith	S1002	Arts	2023	Literature	jane.smith@example.com	0987654321	http://example.com/id2.jpg	password456	STUDENT	t	3	2025-05-10 23:36:50.393	2025-05-10 23:36:50.393
cmaiv6t7u0001m608ytkiurz2	Alice	Johnson	S1003	Science	2023	Physics	alice.johnson@example.com	1112223333	http://example.com/id3.jpg	password789	LIBRARIAN	t	3	2025-05-10 23:36:50.393	2025-05-10 23:36:50.393
cmaiv6t8d0002m6081mm7wav2	Emma	Davis	S1005	Medicine	2023	Biology	emma.davis@example.com	7778889999	http://example.com/id5.jpg	password202	ADMIN	t	3	2025-05-10 23:36:50.393	2025-05-10 23:36:50.393
cmaiv6t8h0003m608vrx2klpp	Bob	Brown	S1004	Business	2023	Economics	bob.brown@example.com	4445556666	http://example.com/id4.jpg	password101	STUDENT	f	3	2025-05-10 23:36:50.393	2025-05-10 23:36:50.393
cmaiv6t8o0004m6083qa1m78q	John	Doe	S1001	Engineering	2023	Computer Science	john.doe@example.com	1234567890	http://example.com/id1.jpg	password123	STUDENT	t	3	2025-05-10 23:36:50.393	2025-05-10 23:36:50.393
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0d41331a-7869-42dd-b410-cd4307f7fb39	3368adc8759b27222a3fb55c58be21fee54753bcfca264e89de20225c7f7811b	2025-05-11 00:35:49.586331+01	20250510233548_init	\N	\N	2025-05-11 00:35:49.508597+01	1
\.


--
-- Name: Book Book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);


--
-- Name: Fine Fine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fine"
    ADD CONSTRAINT "Fine_pkey" PRIMARY KEY (id);


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Book_isbn_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Book_isbn_key" ON public."Book" USING btree (isbn);


--
-- Name: Fine_reservationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Fine_reservationId_key" ON public."Fine" USING btree ("reservationId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_studentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_studentId_key" ON public."User" USING btree ("studentId");


--
-- Name: Fine Fine_reservationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fine"
    ADD CONSTRAINT "Fine_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES public."Reservation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Fine Fine_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fine"
    ADD CONSTRAINT "Fine_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

