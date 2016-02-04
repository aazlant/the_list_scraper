--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.4
-- Dumped by pg_dump version 9.4.1
-- Started on 2016-02-03 21:07:17 PST

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

--
-- TOC entry 2345 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 186 (class 3079 OID 12123)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2346 (class 0 OID 0)
-- Dependencies: 186
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 177 (class 1259 OID 16988)
-- Name: artist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE artist (
    id integer NOT NULL,
    name character varying(255)
);


--
-- TOC entry 176 (class 1259 OID 16986)
-- Name: artist_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE artist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2347 (class 0 OID 0)
-- Dependencies: 176
-- Name: artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE artist_id_seq OWNED BY artist.id;


--
-- TOC entry 175 (class 1259 OID 16975)
-- Name: artist_shows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE artist_shows (
    id integer NOT NULL,
    show_id integer,
    artist_id integer
);


--
-- TOC entry 181 (class 1259 OID 17099)
-- Name: calendar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE calendar (
    id integer NOT NULL
);


--
-- TOC entry 180 (class 1259 OID 17097)
-- Name: calendar_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE calendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2348 (class 0 OID 0)
-- Dependencies: 180
-- Name: calendar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE calendar_id_seq OWNED BY calendar.id;


--
-- TOC entry 183 (class 1259 OID 17119)
-- Name: calendar_shows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE calendar_shows (
    id integer NOT NULL,
    calendar_id integer,
    show_id integer,
    confirmed boolean,
    purchased boolean
);


--
-- TOC entry 182 (class 1259 OID 17117)
-- Name: calendar_shows_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE calendar_shows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2349 (class 0 OID 0)
-- Dependencies: 182
-- Name: calendar_shows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE calendar_shows_id_seq OWNED BY calendar_shows.id;


--
-- TOC entry 174 (class 1259 OID 16973)
-- Name: show_artist_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE show_artist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2350 (class 0 OID 0)
-- Dependencies: 174
-- Name: show_artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE show_artist_id_seq OWNED BY artist_shows.id;


--
-- TOC entry 173 (class 1259 OID 16967)
-- Name: shows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE shows (
    id integer NOT NULL,
    date date,
    venue character varying(100),
    price character varying(25),
    is_sold boolean,
    ages character varying(10),
    "time" character varying(25),
    multi_day boolean,
    pit boolean
);


--
-- TOC entry 172 (class 1259 OID 16965)
-- Name: shows_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE shows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2351 (class 0 OID 0)
-- Dependencies: 172
-- Name: shows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE shows_id_seq OWNED BY shows.id;


--
-- TOC entry 179 (class 1259 OID 17088)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(200),
    email character varying(100),
    hashed_password character varying(255),
    google_token character varying(255)[],
    facebook_token character varying(255),
    spotify_token character varying(255)
);


--
-- TOC entry 185 (class 1259 OID 17139)
-- Name: users_friends; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users_friends (
    id integer NOT NULL,
    user_id integer,
    friend_id integer
);


--
-- TOC entry 184 (class 1259 OID 17137)
-- Name: users_friends_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_friends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2352 (class 0 OID 0)
-- Dependencies: 184
-- Name: users_friends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_friends_id_seq OWNED BY users_friends.id;


--
-- TOC entry 178 (class 1259 OID 17086)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2353 (class 0 OID 0)
-- Dependencies: 178
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2186 (class 2604 OID 16991)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist ALTER COLUMN id SET DEFAULT nextval('artist_id_seq'::regclass);


--
-- TOC entry 2185 (class 2604 OID 16978)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist_shows ALTER COLUMN id SET DEFAULT nextval('show_artist_id_seq'::regclass);


--
-- TOC entry 2188 (class 2604 OID 17102)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar ALTER COLUMN id SET DEFAULT nextval('calendar_id_seq'::regclass);


--
-- TOC entry 2189 (class 2604 OID 17122)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar_shows ALTER COLUMN id SET DEFAULT nextval('calendar_shows_id_seq'::regclass);


--
-- TOC entry 2184 (class 2604 OID 16970)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY shows ALTER COLUMN id SET DEFAULT nextval('shows_id_seq'::regclass);


--
-- TOC entry 2187 (class 2604 OID 17091)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2190 (class 2604 OID 17142)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends ALTER COLUMN id SET DEFAULT nextval('users_friends_id_seq'::regclass);


--
-- TOC entry 2200 (class 2606 OID 17000)
-- Name: artist_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist
    ADD CONSTRAINT artist_name_key UNIQUE (name);


--
-- TOC entry 2202 (class 2606 OID 16993)
-- Name: artist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist
    ADD CONSTRAINT artist_pkey PRIMARY KEY (id);


--
-- TOC entry 2212 (class 2606 OID 17165)
-- Name: calendar_shows_calendar_id_show_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar_shows
    ADD CONSTRAINT calendar_shows_calendar_id_show_id_key UNIQUE (calendar_id, show_id);


--
-- TOC entry 2204 (class 2606 OID 17106)
-- Name: idx_user_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT idx_user_email UNIQUE (email);


--
-- TOC entry 2210 (class 2606 OID 17104)
-- Name: pk_calendar; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar
    ADD CONSTRAINT pk_calendar PRIMARY KEY (id);


--
-- TOC entry 2216 (class 2606 OID 17124)
-- Name: pk_calendar_show; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar_shows
    ADD CONSTRAINT pk_calendar_show PRIMARY KEY (id);


--
-- TOC entry 2220 (class 2606 OID 17144)
-- Name: pk_friends; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends
    ADD CONSTRAINT pk_friends PRIMARY KEY (id);


--
-- TOC entry 2206 (class 2606 OID 17096)
-- Name: pk_users; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- TOC entry 2196 (class 2606 OID 16980)
-- Name: show_artist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist_shows
    ADD CONSTRAINT show_artist_pkey PRIMARY KEY (id);


--
-- TOC entry 2198 (class 2606 OID 17055)
-- Name: show_artist_show_id_artist_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist_shows
    ADD CONSTRAINT show_artist_show_id_artist_id_key UNIQUE (show_id, artist_id);


--
-- TOC entry 2192 (class 2606 OID 17051)
-- Name: shows_date_venue_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY shows
    ADD CONSTRAINT shows_date_venue_key UNIQUE (date, venue);


--
-- TOC entry 2194 (class 2606 OID 16972)
-- Name: shows_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY shows
    ADD CONSTRAINT shows_pkey PRIMARY KEY (id);


--
-- TOC entry 2222 (class 2606 OID 17172)
-- Name: users_friends_friend_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends
    ADD CONSTRAINT users_friends_friend_id_user_id_key UNIQUE (friend_id, user_id);


--
-- TOC entry 2224 (class 2606 OID 17170)
-- Name: users_friends_user_id_friend_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends
    ADD CONSTRAINT users_friends_user_id_friend_id_key UNIQUE (user_id, friend_id);


--
-- TOC entry 2208 (class 2606 OID 17168)
-- Name: users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_user_email_key UNIQUE (email);


--
-- TOC entry 2213 (class 1259 OID 17125)
-- Name: idx_calendar_shows; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_calendar_shows ON calendar_shows USING btree (calendar_id);


--
-- TOC entry 2214 (class 1259 OID 17131)
-- Name: idx_calendar_shows_0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_calendar_shows_0 ON calendar_shows USING btree (show_id);


--
-- TOC entry 2217 (class 1259 OID 17145)
-- Name: idx_users_friends; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_friends ON users_friends USING btree (user_id);


--
-- TOC entry 2218 (class 1259 OID 17156)
-- Name: idx_users_friends_0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_friends_0 ON users_friends USING btree (friend_id);


--
-- TOC entry 2227 (class 2606 OID 17126)
-- Name: fk_calendar_shows_calendar; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar_shows
    ADD CONSTRAINT fk_calendar_shows_calendar FOREIGN KEY (calendar_id) REFERENCES calendar(id);


--
-- TOC entry 2228 (class 2606 OID 17132)
-- Name: fk_calendar_shows_shows; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY calendar_shows
    ADD CONSTRAINT fk_calendar_shows_shows FOREIGN KEY (show_id) REFERENCES shows(id);


--
-- TOC entry 2230 (class 2606 OID 17157)
-- Name: fk_users_friends_friends; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends
    ADD CONSTRAINT fk_users_friends_friends FOREIGN KEY (friend_id) REFERENCES users(id);


--
-- TOC entry 2229 (class 2606 OID 17151)
-- Name: fk_users_friends_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_friends
    ADD CONSTRAINT fk_users_friends_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2226 (class 2606 OID 16994)
-- Name: show_artist_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist_shows
    ADD CONSTRAINT show_artist_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES artist(id);


--
-- TOC entry 2225 (class 2606 OID 16981)
-- Name: show_artist_show_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY artist_shows
    ADD CONSTRAINT show_artist_show_id_fkey FOREIGN KEY (show_id) REFERENCES shows(id);


-- Completed on 2016-02-03 21:07:17 PST

--
-- PostgreSQL database dump complete
--

