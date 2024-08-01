"use client"; // Add this line to mark the file as a client component

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Tabs, Tab } from 'react-bootstrap';

export default function Home() {
  const [unitTotal, setUnitTotal] = useState('');
  const [unitNow, setUnitNow] = useState('');
  const [V, setV] = useState('');
  const [I, setI] = useState('');
  const [PF, setPF] = useState('');
  const [readDate, setReadDate] = useState(new Date().toISOString().split('T')[0]);
  const [customLF, setCustomLF] = useState('');
  const [results, setResults] = useState([]);
  const [customResult, setCustomResult] = useState(null);
  const [pMeters, setPmeter] = useState('');
  const [pCalculaters, setPcalculaters] = useState('');
  const [key, setKey] = useState('singlePhase'); // State to manage active tab

  // Three-phase states
  const [V1, setV1] = useState('');
  const [V2, setV2] = useState('');
  const [V3, setV3] = useState('');
  const [I1, setI1] = useState('');
  const [I2, setI2] = useState('');
  const [I3, setI3] = useState('');
  const [PF1, setPF1] = useState('');
  const [PF2, setPF2] = useState('');
  const [PF3, setPF3] = useState('');

  const handleCalculate = () => {
    const readDateObj = new Date(readDate);
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - readDateObj) / (1000 * 3600 * 24)); // Calculate difference in days

    const newResults = [];
    for (let LF = 0.1; LF <= 1.0; LF += 0.1) {
      let result;
      if (key === 'singlePhase') {
        result = LF * (V * I * PF) / 1000 * 24 * daysDifference;
        setPcalculaters((V * I * PF) / 1000);
      } else if (key === 'threePhase') {
        const totalPower = ((V1 * I1 * PF1) + (V2 * I2 * PF2) + (V3 * I3 * PF3)) / 1000;
        result = LF * totalPower * 24 * daysDifference;
        setPcalculaters(totalPower);
      }
      newResults.push({ LF: LF.toFixed(1), result: result.toFixed(2) });
    }
    setResults(newResults);

    if (customLF) {
      let customResult;
      if (key === 'singlePhase') {
        customResult = customLF * (V * I * PF) / 1000 * 24 * daysDifference;
      } else if (key === 'threePhase') {
        const totalPower = ((V1 * I1 * PF1) + (V2 * I2 * PF2) + (V3 * I3 * PF3)) / 1000;
        customResult = customLF * totalPower * 24 * daysDifference;
      }
      setCustomResult({ LF: customLF, result: customResult.toFixed(2) });
    } else {
      setCustomResult(null);
    }
  };

  const percentError = pMeters && pCalculaters ? ((parseFloat(pMeters) - parseFloat(pCalculaters)) / parseFloat(pCalculaters)).toFixed(2) : '';
  const unitDifference = unitNow && unitTotal ? parseFloat(unitNow) - parseFloat(unitTotal) : '';

  return (
    <Container>
      <h1 className="my-5">Cyber-Patrol</h1>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="singlePhase" title="Single Phase">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="unitTotal">
                  <Form.Label>หน่วยสะสม (จดหน่วยครั้งก่อน)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={unitTotal}
                    onChange={(e) => setUnitTotal(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="unitNow">
                  <Form.Label>หน่วยสะสม (หน่วยปัจจุบัน)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={unitNow}
                    onChange={(e) => setUnitNow(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="V">
                  <Form.Label>แรงดัน</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={V}
                    onChange={(e) => setV(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="I">
                  <Form.Label>กระแส</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={I}
                    onChange={(e) => setI(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="PF">
                  <Form.Label>PF</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={PF}
                    onChange={(e) => setPF(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="readDate">
                  <Form.Label>วันที่จดหน่วย</Form.Label>
                  <Form.Control
                    type="date"
                    value={readDate}
                    onChange={(e) => setReadDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Set max date to today's date
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="customLF">
                  <Form.Label>LF (Load factor)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={customLF}
                    onChange={(e) => setCustomLF(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pMeter">
                  <Form.Label>P Meter (kW)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={pMeters}
                    onChange={(e) => setPmeter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={handleCalculate}>
              Calculate
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="threePhase" title="Three Phase">
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="unitTotal">
                  <Form.Label>หน่วยสะสม (จดหน่วยครั้งก่อน)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={unitTotal}
                    onChange={(e) => setUnitTotal(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="unitNow">
                  <Form.Label>หน่วยสะสม (หน่วยปัจจุบัน)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={unitNow}
                    onChange={(e) => setUnitNow(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="readDate">
                  <Form.Label>วันที่จดหน่วย</Form.Label>
                  <Form.Control
                    type="date"
                    value={readDate}
                    onChange={(e) => setReadDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Set max date to today's date
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="V1">
                  <Form.Label>แรงดัน (V1)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={V1}
                    onChange={(e) => setV1(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="V2">
                  <Form.Label>แรงดัน (V2)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={V2}
                    onChange={(e) => setV2(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="V3">
                  <Form.Label>แรงดัน (V3)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={V3}
                    onChange={(e) => setV3(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="I1">
                  <Form.Label>กระแส (I1)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={I1}
                    onChange={(e) => setI1(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="I2">
                  <Form.Label>กระแส (I2)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={I2}
                    onChange={(e) => setI2(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="I3">
                  <Form.Label>กระแส (I3)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={I3}
                    onChange={(e) => setI3(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="PF1">
                  <Form.Label>PF (PF1)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={PF1}
                    onChange={(e) => setPF1(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="PF2">
                  <Form.Label>PF (PF2)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={PF2}
                    onChange={(e) => setPF2(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="PF3">
                  <Form.Label>PF (PF3)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={PF3}
                    onChange={(e) => setPF3(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="customLF">
                  <Form.Label>LF (Load factor)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={customLF}
                    onChange={(e) => setCustomLF(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pMeter">
                  <Form.Label>P Meter (kW)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={pMeters}
                    onChange={(e) => setPmeter(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={handleCalculate}>
              Calculate
            </Button>
          </Form>
        </Tab>
      </Tabs>
      <Row>
        <Col md={6}>
          <Form.Group controlId="unitDifference">
            <Form.Label>หน่วยสะสม (หน่วยปัจจุบัน - หน่วยสะสม ครั้งก่อน)</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={unitDifference}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="percentError">
            <Form.Label>% Error</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={percentError}
            />
          </Form.Group>
        </Col>
      </Row>
      {results.length > 0 && (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>LF</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {customResult && (
              <tr>
                <td>{customResult.LF}</td>
                <td>{customResult.result}</td>
              </tr>
            )}
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.LF}</td>
                <td>{result.result}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
