"use client"; // Add this line to mark the file as a client component

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

export default function Home() {
  const [unitTotal, setUnitTotal] = useState('');
  const [unitNow, setUnitNow] = useState('');
  const [V, setV] = useState('220');
  const [I, setI] = useState('');
  const [PF, setPF] = useState('');
  const [readDate, setReadDate] = useState(new Date().toISOString().split('T')[0]);
  const [customLF, setCustomLF] = useState('');
  const [results, setResults] = useState([]);
  const [customResult, setCustomResult] = useState(null);

  const handleCalculate = () => {
    const readDateObj = new Date(readDate);
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - readDateObj) / (1000 * 3600 * 24)); // Calculate difference in days

    const newResults = [];
    for (let LF = 0.1; LF <= 1.0; LF += 0.1) {
      const result = LF * (V * I * PF) / 1000 * 24 * daysDifference;
      newResults.push({ LF: LF.toFixed(1), result: result.toFixed(2) });
    }
    setResults(newResults);

    if (customLF) {
      const customResult = customLF * (V * I * PF) / 1000 * 24 * daysDifference;
      setCustomResult({ LF: customLF, result: customResult.toFixed(2) });
    } else {
      setCustomResult(null);
    }
  };

  // Function to calculate default value for unitNow
  const calculateDefaultUnitNow = () => {
    if (!readDate) return ''; // Return empty string if readDate is not set

    const readDateObj = new Date(readDate);
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - readDateObj) / (1000 * 3600 * 24)); // Calculate difference in days

    return daysDifference.toString(); // Return days difference as string
  };

  return (
    <Container>
      <h1 className="my-5">Calculation Page</h1>
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
                defaultValue={calculateDefaultUnitNow()} // Set default value using calculateDefaultUnitNow function
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
        </Row>
        <Button className="mt-3" onClick={handleCalculate}>
          Calculate
        </Button>
      </Form>
      {results.length > 0 && (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>LF</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.LF}</td>
                <td>{result.result}</td>
              </tr>
            ))}
            {customResult && (
              <tr>
                <td>{customResult.LF}</td>
                <td>{customResult.result}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
