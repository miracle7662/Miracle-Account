import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  InputMaskCard,
  InputMaskCurrency,
  InputMaskDate,
  InputMaskDate2,
  InputMaskIP,
  InputMaskISBN,
  InputMaskNumLetter,
  InputMaskPhone,
  InputMaskPhone2,
  InputMaskSSN,
} from '@/components/UiElements/Forms/InputMask'

const InputMask = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="InputMask"
        subName="Forms"
        url={'https://github.com/sanniassin/react-input-mask'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Phones</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskPhone />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Phone2</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskPhone2 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Date</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskDate />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Date2</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskDate2 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>CreditCard</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskCard />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>IP</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskIP />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>SSN</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskSSN />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>ISBN</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskISBN />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Currency</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskCurrency />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <Card.Title>NumLetter</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputMaskNumLetter />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title>Options</Card.Title>
            </Card.Header>
            <Table className="mb-0" responsive>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>Inputmask</code>
                  </td>
                  <td>
                    Inputmask is a javascript library that creates an input mask. Inputmask can run
                    against vanilla javascript, jQuery, and jqlite.
                    <br />
                    An inputmask helps the user with the input by ensuring a predefined format. This
                    can be useful for dates, numerics, phone numbers, ...
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link to="https://github.com/sanniassin/react-input-mask" target="_blank">
                      https://github.com/sanniassin/react-input-mask
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default InputMask
