
CREATE TABLE public.populacao (
                cartao_sus BIGINT NOT NULL,
                nome_da_mae VARCHAR(60) NOT NULL,
                municipio_de_nacimento VARCHAR(30) NOT NULL,
                estado VARCHAR(2) NOT NULL,
                endereco VARCHAR(60) NOT NULL,
                nome_do_pai VARCHAR(60) NOT NULL,
                sexo VARCHAR(1) NOT NULL,
                nome VARCHAR(50) NOT NULL,
                data_nacimento DATE NOT NULL,
                senha VARCHAR(32) NOT NULL,
                CONSTRAINT populacao_pk PRIMARY KEY (cartao_sus)
);


CREATE SEQUENCE public.vacinas_id_vacina_seq;

CREATE TABLE public.vacinas (
                id_vacina INTEGER NOT NULL DEFAULT nextval('public.vacinas_id_vacina_seq'),
                qtd_vacinas INTEGER NOT NULL,
                nome VARCHAR(50) NOT NULL,
                lote VARCHAR(25) NOT NULL,
                nome_da_unidade VARCHAR(50) NOT NULL,
                periodo_de_imunizacao VARCHAR(5) NOT NULL,
                CONSTRAINT vacinas_pk PRIMARY KEY (id_vacina)
);

ALTER SEQUENCE public.vacinas_id_vacina_seq OWNED BY public.vacinas.id_vacina;

CREATE TABLE public.ubs (
                cnes INTEGER NOT NULL,
                nome_da_unidade VARCHAR(60) NOT NULL,
                municipio VARCHAR(30) NOT NULL,
                bairro VARCHAR(30) NOT NULL,
                endereco VARCHAR(60) NOT NULL,
                estado VARCHAR(2) NOT NULL,
                telefone VARCHAR(12) NOT NULL,
                cep INTEGER NOT NULL,
                senha VARCHAR(32) NOT NULL,
                CONSTRAINT ubs_pk PRIMARY KEY (cnes)
);
COMMENT ON COLUMN public.ubs.senha IS 'Senha da Unidade Basica de Saude';


CREATE TABLE public.agente_de_saude (
                cpf BIGINT NOT NULL,
                nome VARCHAR(50) NOT NULL,
                senha VARCHAR(32) NOT NULL,
                rg VARCHAR(10) NOT NULL,
                cnes INTEGER NOT NULL,
                CONSTRAINT agente_de_saude_pk PRIMARY KEY (cpf)
);
COMMENT ON COLUMN public.agente_de_saude.senha IS 'colocar como 32 no banco';


CREATE TABLE public.cartao (
                cartao_sus BIGINT NOT NULL,
                id_vacina INTEGER NOT NULL,
                data_aplicacao DATE NOT NULL,
                aplicada BOOLEAN DEFAULT false NOT NULL,
                cpf_agente BIGINT NOT NULL,
                data_validade DATE NOT NULL,
                CONSTRAINT cartao_pk PRIMARY KEY (cartao_sus)
);
COMMENT ON COLUMN public.cartao.aplicada IS 'mostra se a vacina foi aplicada ou nao.
true=aplicada
false=nao aplicada';
COMMENT ON COLUMN public.cartao.data_validade IS 'Ate quando vai valer a vacina';


ALTER TABLE public.cartao ADD CONSTRAINT populacao_cartao_fk
FOREIGN KEY (cartao_sus)
REFERENCES public.populacao (cartao_sus)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.cartao ADD CONSTRAINT vacinas_cartao_fk
FOREIGN KEY (id_vacina)
REFERENCES public.vacinas (id_vacina)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.agente_de_saude ADD CONSTRAINT ubs_agente_de_saude_fk
FOREIGN KEY (cnes)
REFERENCES public.ubs (cnes)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.cartao ADD CONSTRAINT agente_de_saude_cartao_fk
FOREIGN KEY (cpf_agente)
REFERENCES public.agente_de_saude (cpf)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;