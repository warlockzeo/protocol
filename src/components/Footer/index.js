import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

const Footer = props =>
  window.location.href.includes('dashboard') ? (
    <footer>2019 © stansallcar.pt | All Rights Reserved</footer>
  ) : (
    <footer className="">
      <Row>
        <Col md={4}>{props.telefones}</Col>
        <Col md={4}>
          <h3 className="text-left">Institucional</h3>
          <a href="/sobrenos">Sobre Nós</a>
          <br />
          <a href="/ensino">Ensino</a>
        </Col>
        <Col md={4}>
          <h3 className="text-left">Acesso Rápido</h3>
          <a href="/contato">Contato</a>
          <br />
          <a href="/circularesprovas">Circulares / Provas</a>
        </Col>
      </Row>
      <Row>
        <Col md={12}>2019 © sagradocoracaovertentes.com.br | All Rights Reserved</Col>
      </Row>
    </footer>
  );

const mapStateToProps = state => ({
  ...state.escola.data,
});

export default connect(mapStateToProps)(Footer);
