/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Form, Input, Select } from "@rocketseat/unform";
import Styled from "styled-components";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../components/Loader";
import ProtocolList from "../../components/ProtocolList";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

const PROTOCOL_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/protocolos`;
const today = moment().format("YYYY-MM-DD");

const schema = Yup.object().shape({
  secretaria: Yup.string().required("Selecione uma secretaria"),
  situacao: Yup.string().required("Selecione o status dos protocolos"),
  de: Yup.string().required("Selecione uma data inicial"),
  ate: Yup.string().required("Selecione uma data final"),
});

const secretariasOptions = [
  { id: "Correios", title: "Correios" },
  { id: "Câmara", title: "Câmara" },
  { id: "TCE", title: "TCE" },
  { id: "Fórum TJ", title: "Fórum TJ" },
  { id: "Sindicato", title: "Sindicato" },
  { id: "Compesa", title: "Compesa" },
  { id: "Celpe", title: "Celpe" },
  { id: "Polícia Militar", title: "Polícia Militar" },
  { id: "Polícia Civil", title: "Polícia Civil" },
  { id: "Igrejas", title: "Igrejas" },
  { id: "Banco Real", title: "Banco Real" },
  { id: "Banco do Brasil", title: "Banco do Brasil" },
  { id: "CEF", title: "CEF" },
  { id: "Conselho Tutelar", title: "Conselho Tutelar" },
];

const options = [
  { id: "Todos", title: "Todos" },
  { id: "Enviados", title: "Enviados" },
  { id: "Recebidos", title: "Recebidos" },
  { id: "Em trânsito", title: "Em trânsito" },
  { id: "Em análise", title: "Em análise" },
];

const FormReport = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

//  @media only screen and (min-width: 600px) {
//    padding: 0 100px;
//  }
`;

const Relatorio = () => {
  const [secretarias, setSecretarias] = useState([]);
  const [returnBusca, setReturnBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialDate, setInitialDate] = useState("");
  const [fetchData, setFetchData] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(1);
  const length = 100;

  const storage = useSelector((state) => state);

  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        secretariaNome: "",
        page,
        length,
      };

      setFetchData(newData);

      const ret = await axios({
        method: "post",
        responseType: "json",
        url: PROTOCOL_ENDPOINT,
        data: JSON.stringify({ option: "report", body: { ...newData } }),
      });

      setTimeout(() => {
        setReturnBusca((returnBusca) => [...returnBusca, ...ret.data]);
        setPage((page) => page + 1);
        if (ret?.data.length < length) setHasMore(false);
      }, 1700);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const onChangeInitialDateField = (e) => {
    setTimeout(() => setInitialDate(e.currentTarget.value), 500);
  };

  useEffect(() => {
    const dataSecretarias = storage?.users
      ? [
          { id: "Todos", title: "Todos" },
          { id: ".", title: "::: INTERNO :::" },
          ...storage.users
            .filter((user) => user.nivel > 0)
            .map((user) => ({
              id: user.id,
              title: user.nome,
            })),
          { id: "..", title: "::: EXTERNO :::" },
          ...secretariasOptions,
        ]
      : secretarias;
    setSecretarias(dataSecretarias);
    setInitialDate(today);
  }, [storage]);

  const initialData = !Array.isArray(returnBusca)
    ? {
        secretaria: { id: "Todos", title: "Todos" },
        situacao: { id: "Todos", title: "Todos" },
        de: today,
        ate: today,
      }
    : "";

  return (
    <>
      <h1>Relatórios</h1>
      <FormReport>
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmit} schema={schema} initialData={initialData}>
            <Row>
              <Col md={3}>
                <label>Secretaria: </label>
                <Select
                  options={secretarias}
                  name="secretaria"
                  id="secretaria"
                  className="form-control"
                />
              </Col>
              <Col md={3}>
                <label>Situação</label>
                <Select
                  options={options}
                  name="situacao"
                  id="situacao"
                  className="form-control"
                />
              </Col>
              <Col md={3}>
                <label>De: </label>
                <Input
                  className="form-control"
                  type="date"
                  name="de"
                  id="de"
                  max={today}
                  placeholder="Data inicial"
                  onChange={onChangeInitialDateField}
                />
              </Col>
              <Col md={3}>
                <label>Até: </label>
                <Input
                  className="form-control"
                  type="date"
                  name="ate"
                  id="ate"
                  min={initialDate}
                  max={today}
                  placeholder="Data final"
                />
              </Col>
            </Row>
            <Button type="submit" className="form-control">
              Gerar Relatório
            </Button>
          </Form>
        )}
        {returnBusca && (
          <Col md={12}>
            <InfiniteScroll
              dataLength={returnBusca.length} //This is important field to render the next data
              next={() => onSubmit(fetchData)}
              hasMore={hasMore}
              loader={
                <div className="text-center">
                  <Loader />
                </div>
              }
            >
              <ProtocolList data={returnBusca} showProtocolNumber="true" />
            </InfiniteScroll>
          </Col>
        )}
      </FormReport>
    </>
  );
};

export default Relatorio;
