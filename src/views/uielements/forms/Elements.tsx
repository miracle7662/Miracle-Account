import { Link } from 'react-router-dom'
import { Row, Col, Card, Table } from 'react-bootstrap'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import {
  EleFormControl,
  EleFormSolidCheckbox,
  EleFormSolidRadio,
  EleFormToggleButton,
} from '@/components/UiElements/Forms/Elements'

const Elements = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Elements"
        subName="Forms"
        url={'https://react-bootstrap.netlify.app/docs/forms/overview'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Form Controls</Card.Title>
            </Card.Header>
            <Card.Body>
              <EleFormControl />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Solid Checkbox</Card.Title>
            </Card.Header>
            <Card.Body>
              <EleFormSolidCheckbox />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Solid Radio</Card.Title>
            </Card.Header>
            <Card.Body>
              <EleFormSolidRadio />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Toggle Button</Card.Title>
            </Card.Header>
            <Card.Body>
              <EleFormToggleButton />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
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
                    <code>Approach</code>
                  </td>
                  <td>
                    Browser default checkboxes and radios are replaced with the help of{' '}
                    <code>.form-check</code>, a series of classes for both input types that improves
                    the layout and behavior of their HTML elements, that provide greater
                    customization and cross browser consistency. Checkboxes are for selecting one or
                    several options in a list, while radios are for selecting one option from many.
                    <br />
                    Structurally, our <code>&lt;input&gt;</code>s and <code>&lt;label&gt;</code>s
                    are sibling elements as opposed to an <code>&lt;input&gt;</code> within a{' '}
                    <code>&lt;label&gt;</code>. This is slightly more verbose as you must specify{' '}
                    <code>id</code> and <code>for</code> attributes to relate the{' '}
                    <code>&lt;input&gt;</code> and <code>&lt;label&gt;</code>. We use the sibling
                    selector (<code>~</code>) for all our <code>&lt;input&gt;</code> states, like{' '}
                    <code>:checked</code> or <code>:disabled</code>. When combined with the{' '}
                    <code>.form-check-label</code> class, we can easily style the text for each item
                    based on the <code>&lt;input&gt;</code>'s state.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Indeterminate</code>
                  </td>
                  <td>
                    Checkboxes can utilize the <code>:indeterminate</code> pseudo class when
                    manually set via JavaScript (there is no available HTML attribute for specifying
                    it).
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Disabled</code>
                  </td>
                  <td>
                    Add the <code>disabled</code> attribute and the associated{' '}
                    <code>&lt;label&gt;</code>s are automatically styled to match with a lighter
                    color to help indicate the input's state.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Inline</code>
                  </td>
                  <td>
                    Group checkboxes or radios on the same horizontal row by adding{' '}
                    <code>.form-check-inline</code> to any <code>.form-check</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Reverse</code>
                  </td>
                  <td>
                    Put your checkboxes, radios, and switches on the opposite side with the{' '}
                    <code>.form-check-reverse</code> modifier class.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Without labels</code>
                  </td>
                  <td>
                    Omit the wrapping <code>.form-check</code> for checkboxes and radios that have
                    no label text. Remember to still provide some form of accessible name for
                    assistive technologies (for instance, using <code>aria-label</code>). See the{' '}
                    <code>forms overview accessibility</code> section for details.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Toggle buttons</code>
                  </td>
                  <td>
                    Create button-like checkboxes and radio buttons by using <code>.btn</code>{' '}
                    styles rather than <code>.form-check-label</code> on the{' '}
                    <code>&lt;label&gt;</code> elements. These toggle buttons can further be grouped
                    in a <code>button group</code> if needed.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:{' '}
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/forms/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/forms/overview
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

export default Elements
