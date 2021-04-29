/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Row, Col, Button } from "react-bootstrap";
import Styled from "styled-components";
import * as Yup from "yup";
import MultiSelect from "react-select";
import Select from "react-select";
import axios from "axios";
import jwt from "jwt-decode";
import Loader from "../../components/Loader";

const origemDestinoExterno = [
  "Correios",
  "Câmara",
  "TCE",
  "Fórum TJ",
  "Sindicato",
  "Compesa",
  "Celpe",
  "Polícia Militar",
  "Polícia Civil",
  "Igrejas",
  "Banco Real",
  "Banco do Brasil",
  "CEF",
  "Conselho Tutelar",
  "Outros",
];

const PROTOCOL_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/protocolos`;
const tokenJwt = sessionStorage.getItem("access_token");
const actualUser = tokenJwt && jwt(tokenJwt).data;

const schema = Yup.object().shape({
  origem: Yup.string().required("Selecione uma origem"),
  dep_origem: Yup.string(),
  destino: Yup.string().required("Selecione um destino"),
  dep_destino: Yup.string(),
  copia: Yup.string(),
  portador: Yup.string(),
  mat: Yup.string(),
  carater: Yup.string().required("Selecione o caráter"),
  prazo: Yup.string(),
  caraterOutros: Yup.string(),
  obs: Yup.string(),
});

const FormCadastro = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 600px) {
    padding: 0 20px;
  }
`;

const Protocolo = Styled.span`
  font-size: 2em;
  color: #ff0000;
  font-weight: bolder;
`;

const NovoProtocolo = () => {
  const { reg } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [origens, setOrigens] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [protocolo, setProtocolo] = useState("");
  const [data, setData] = useState([]);

  const [comCopia, setComCopia] = useState(false);

  const [novoProtocolo, setNovoProtocolo] = useState("");
  const [errorForm, setErrorForm] = useState([]);
  const storage = useSelector((state) => state);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.documentos?.length) {
      setIsLoading(true);
      try {
        if (reg) {
          const newData = {
            ...data,
            reg,
            protocolo: protocolo.protocolo,
            origem: actualUser.reg,
            //dep_origem: '',
          };
          try {
            await axios({
              method: "post",
              responseType: "json",
              url: PROTOCOL_ENDPOINT,
              data: JSON.stringify({
                option: reg ? "edit" : "resend",
                body: { ...newData },
              }),
            });
          } catch (e) {
            console.error(e);
          } finally {
            setTimeout(() => {
              sessionStorage.removeItem("protocolo");
              window.open(`/`, "_self");
            }, 1500);
          }
        } else {
          const newData = data;

          const response = await axios({
            method: "post",
            responseType: "json",
            url: PROTOCOL_ENDPOINT,
            data: JSON.stringify({ option: "add", body: { ...newData } }),
          });
          setNovoProtocolo(response.data.protocolo);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    } else {
      setErrorForm("Precisa selecionar um tipo de documento.");
    }
  };

  const onNewProtocol = () => {
    setNovoProtocolo("");
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onChangeMultiSelect = (eventValues) => {
    const values = eventValues.map((eventValue) => eventValue?.value);
    setData({ ...data, copia: values });
  };

  const onChangeDocumentos = (e) => {
    const novoDocumento = e.currentTarget.value;
    let documentos = data.documentos !== undefined ? data.documentos : [];

    if (documentos.includes(novoDocumento)) {
      documentos = documentos.filter(
        (documento) => novoDocumento !== documento
      );
    } else {
      documentos.push(novoDocumento);
    }
    setData({ ...data, documentos });
  };

  const onChangeOrigem = ({ value }) => {
    if (actualUser.nivel >= 10) {
      setDestinos(origens.filter((origem) => origem.value !== value));
    } else if (actualUser.nivel < 10 && value === actualUser.reg) {
      setDestinos(origens.filter((origem) => origem.value !== value));
    } else {
      setDestinos(origens.filter((origem) => origem.value === actualUser.reg));
    }
  };

  const montagemOptionsCopias = (copias, destinos) => {
    if (Array.isArray(copias)) {
      return destinos.filter((element) =>
        copias.some((x) => x === element.label)
      );
    }
  };

  useEffect(() => {
    const dataOrigens = storage?.users
      ? [
          { value: ".", label: "::: INTERNO :::" },
          ...storage.users
            .filter((user) => user.nivel > 0)
            .map((user) => ({ value: user.id, label: user.nome })),
          { value: "..", label: "::: EXTERNO :::" },
          ...origemDestinoExterno.map((item) => ({ label: item, value: item })),
        ]
      : origens;
    setOrigens(dataOrigens);

    if (reg) {
      const storageProtocolo = JSON.parse(sessionStorage.getItem("protocolo"));
      setProtocolo(storageProtocolo);
      const destinosFiltered = dataOrigens.filter(
        (origem) =>
          origem.value !== actualUser.reg &&
          origem.value !== storageProtocolo.origem
      );
      setDestinos(destinosFiltered);
    }
  }, [storage]);

  return (
    <>
      <h1>{`${reg ? "Editar" : "Novo"} protocolo ${
        reg ? protocolo.protocolo : ""
      }`}</h1>
      <FormCadastro>
        {isLoading ? (
          <Loader />
        ) : novoProtocolo ? (
          <Alert variant="success" className="text-center">
            Protocolo cadastrado com sucesso. <br />
            Seu protocolo é <br />
            <Protocolo>{novoProtocolo}</Protocolo>
            <br />
            <Button variant="primary" onClick={onNewProtocol}>
              Gerar outro protocolo
            </Button>
          </Alert>
        ) : (
          <form onSubmit={(e) => onSubmit(e)} schema={schema}>
            {console.log(protocolo)}
            <Row>
              {!reg ? (
                <>
                  <Col md={3}>
                    <label>Origem: </label>
                    <Select
                      value={[
                        {
                          value: protocolo.origem,
                          label: protocolo.origemNome,
                        },
                      ]}
                      options={origens}
                      name="origem"
                      id="origem"
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={(e) => {
                        onChangeOrigem(e);
                        onChange({
                          currentTarget: { name: "origem", value: e.value },
                        });
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <label>Departamento: </label>
                    <input
                      className="form-control"
                      defaultValue={data.dep_origem}
                      type="text"
                      name="dep_origem"
                      id="dep_origem"
                      placeholder="Dep. origem.  Opcional"
                      onChange={onChange}
                    />
                  </Col>
                </>
              ) : (
                <input
                  type="hidden"
                  name="origem"
                  id="origem"
                  defaultValue={protocolo.origem}
                />
              )}
              <Col md={3}>
                <label>Destino: </label>
                <Select
                  value={[
                    {
                      value: protocolo.destino,
                      label: protocolo.destinoNome,
                    },
                  ]}
                  options={destinos}
                  name="destino"
                  id="destino"
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(e) =>
                    onChange({
                      currentTarget: { name: "destino", value: e.value },
                    })
                  }
                />
              </Col>
              <Col md={3}>
                <label>Departamento: </label>
                <input
                  defaultValue={protocolo.dep_destino}
                  className="form-control"
                  type="text"
                  name="dep_destino"
                  id="dep_destino"
                  placeholder="Dep. destino.  Opcional"
                  onChange={onChange}
                />
              </Col>
              <Col md={6}>
                <label htmlFor="comCopia">Enviar cópia: </label>
                <input
                  type="checkbox"
                  name="comCopia"
                  id="comCopia"
                  value="comCopia"
                  {...(protocolo?.copia?.length > 0 && "checked")}
                  onClick={() => setComCopia(!comCopia)}
                />
                {montagemOptionsCopias(protocolo.copia, destinos)}
                {comCopia && (
                  <MultiSelect
                    value={montagemOptionsCopias(protocolo.copia, destinos)}
                    isMulti
                    name="copia"
                    id="copia"
                    options={destinos.filter(
                      (destino) =>
                        destino.value !== actualUser.reg &&
                        destino.value !== data.destino
                    )}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onChangeMultiSelect}
                  />
                )}
              </Col>
              <Col md={3}>
                <label>Portador Nome: </label>
                <input
                  defaultValue={protocolo.portador}
                  className="form-control"
                  type="text"
                  name="portador"
                  id="portador"
                  placeholder="Nome do portador"
                  onChange={onChange}
                />
              </Col>
              <Col md={3}>
                <label>Portador Matrícula: </label>
                <input
                  defaultValue={protocolo.mat}
                  className="form-control"
                  type="text"
                  name="mat"
                  id="mat"
                  placeholder="Matrícula do portador"
                  onChange={onChange}
                />
              </Col>
              <Col md={3}>
                <label>Caráter: </label>
                <Select
                  value={[
                    { value: protocolo.carater, label: protocolo.carater },
                  ]}
                  options={[
                    { label: "Normal", value: "Normal" },
                    { label: "Urgente", value: "Urgente" },
                    {
                      label: "Documento com prazo",
                      value: "Documento com Prazo",
                    },
                    { label: "Outros", value: "outros" },
                  ]}
                  name="carater"
                  id="carater"
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(e) =>
                    onChange({
                      currentTarget: { name: "carater", value: e.value },
                    })
                  }
                />
              </Col>
              {data.carater === "Documento com Prazo" && (
                <Col md={3}>
                  <label>Prazo: </label>
                  <input
                    defaultValue={protocolo.prazo}
                    className="form-control"
                    type="date"
                    name="prazo"
                    id="prazo"
                    placeholder=""
                    onChange={onChange}
                  />
                </Col>
              )}

              {data.carater === "outros" && (
                <Col md={3}>
                  <label>Outros: </label>
                  <input
                    defaultValue={protocolo.caraterOutros}
                    className="form-control"
                    type="text"
                    name="caraterOutros"
                    id="caraterOutros"
                    placeholder=""
                    onChange={onChange}
                  />
                </Col>
              )}
              <Col md={6}>
                <label style={{ width: "100%" }}>Documento: </label>
                <input
                  type="checkbox"
                  name="docOficio"
                  id="docOficio"
                  value="Ofício"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docOficio">Ofício</label>
                <input
                  type="checkbox"
                  name="docrequisicao"
                  id="docrequisicao"
                  value="Requisição"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docRequisicao">Requisição</label>
                <input
                  type="checkbox"
                  name="docPl"
                  id="docPl"
                  value="PL"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docPl">PL</label>
                <input
                  type="checkbox"
                  name="docDeclaracao"
                  id="docDeclaracao"
                  value="Declaração"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docDeclaracao">Declaração</label>
                <input
                  type="checkbox"
                  name="docPortaria"
                  id="docPortaria"
                  value="Portaria"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docPortaria">Portaria</label>
                <input
                  type="checkbox"
                  name="docOutros"
                  id="docOutros"
                  value="Outros"
                  onChange={onChangeDocumentos}
                />
                <label htmlFor="docOutros">Outros</label>
                <p style={{ color: "#ff0000" }}>{errorForm}</p>
              </Col>
              <Col md={12}>
                <label>Obs: </label>
                <textarea
                  defaultValue={protocolo.obs}
                  className="form-control"
                  type="text"
                  name="obs"
                  id="obs"
                  placeholder=""
                  multiline
                  onChange={onChange}
                />
              </Col>
            </Row>
            <Button type="submit" className="form-control">
              Gravar
            </Button>
          </form>
        )}
      </FormCadastro>
    </>
  );
};

export default NovoProtocolo;
