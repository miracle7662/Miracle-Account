import { Row, Col, Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const EleFormControl = () => {
  return (
    <>
      <Row className="gy-6 gy-sm-8 gy-md-12">
        <Col xs={12}>
          <Form.Label htmlFor="basiInput">Basic Input</Form.Label>
          <Form.Control type="text" id="basiInput" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="placeholderInput">Input with Placeholder</Form.Label>
          <Form.Control type="text" id="placeholderInput" placeholder="Placeholder" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="valueInput">Input with Value</Form.Label>
          <Form.Control type="text" id="valueInput" defaultValue="Input with Value" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="readonlyInput">Readonly Input</Form.Label>
          <Form.Control type="text" id="readonlyInput" defaultValue="Readonly input" readOnly />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="disabledInput">Disabled Input</Form.Label>
          <Form.Control type="text" id="disabledInput" defaultValue="Disabled input" disabled />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleInputdate">Input Date</Form.Label>
          <Form.Control type="date" id="exampleInputdate" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleInputtime">Input Time</Form.Label>
          <Form.Control type="time" id="exampleInputtime" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleInputpassword">Input Password</Form.Label>
          <Form.Control type="password" id="exampleInputpassword" defaultValue="44512465" />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleFormControlTextarea5">Example Textarea</Form.Label>
          <Form.Control as="textarea" rows={3} id="exampleFormControlTextarea5"></Form.Control>
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="formtextInput">Form Text</Form.Label>
          <Form.Control type="password" id="formtextInput" />
          <Form.Text>Must be 8-20 characters long.</Form.Text>
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="colorPicker">Color Picker</Form.Label>
          <Form.Control
            type="color"
            className="form-control-color w-100"
            id="colorPicker"
            defaultValue="#364574"
          />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="borderInput">Input Border Style</Form.Label>
          <Form.Control
            type="text"
            id="borderInput"
            placeholder="Enter your name"
            style={{ borderStyle: 'dashed' }}
          />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleDataList">Datalist Example</Form.Label>
          <Form.Control
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Search your country..."
          />
          <datalist id="datalistOptions">
            <option value="Switzerland"></option>
            <option value="New York"></option>
            <option value="France"></option>
            <option value="Spain"></option>
            <option value="Chicago"></option>
            <option value="Bulgaria"></option>
            <option value="Hong Kong"></option>
          </datalist>
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleInputrounded">Rounded Input</Form.Label>
          <Form.Control
            type="text"
            className="rounded-pill"
            id="exampleInputrounded"
            placeholder="Enter your name"
          />
        </Col>
        <Col xs={12}>
          <Form.Label htmlFor="exampleInputrounded">Floating Input</Form.Label>
          <FloatingLabel label="Floating Input">
            <Form.Control type="password" placeholder="Floating Input" />
          </FloatingLabel>
        </Col>
        <Col xs={12}>
          <Form.Label>Sizing</Form.Label>
          <Form.Control size="lg" type="text" placeholder="Large text" />
          <br />
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Control size="sm" type="text" placeholder="Small text" />
        </Col>
        <Col xs={12}>
          <Form.Group controlId="formFile" className="mb-6 mb-md-8 mb-lg-12">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-6 mb-md-8 mb-lg-12">
            <Form.Label>Multiple files input example</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-6 mb-md-8 mb-lg-12">
            <Form.Label>Disabled file input example</Form.Label>
            <Form.Control type="file" disabled />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-6 mb-md-8 mb-lg-12">
            <Form.Label>Small file input example</Form.Label>
            <Form.Control type="file" size="sm" />
          </Form.Group>
          <Form.Group controlId="formFileLg">
            <Form.Label>Large file input example</Form.Label>
            <Form.Control type="file" size="lg" />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Label>Form Select</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  )
}

export default EleFormControl
