import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  CardBackground,
  CardFlush,
  CardHover,
  CardNavigation,
  CardOverlay,
  CardSink,
  CardStretch,
} from '@/components/UiElements/Base/Cards'

const Cards = () => {
  return (
    <>
      <PageBreadcrumb title="Cards" subName="Base UI" />
      <Row className="g-3 g-md-4">
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Sink</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardSink />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Navigation</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardNavigation />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Overlay</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardOverlay />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Background</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardBackground />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Flush</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardFlush />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Hover</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardHover />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Stretch</Card.Title>
            </Card.Header>
            <Card.Body>
              <CardStretch />
            </Card.Body>
          </Card>
        </Col>
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
                    <code>Card</code>
                  </td>
                  <td>
                    A card is a flexible and extensible content container. It includes options for
                    headers and footers, a wide variety of content, contextual background colors,
                    and powerful display options. If you're familiar with Bootstrap 3, cards replace
                    our old panels, wells, and thumbnails. Similar functionality to those components
                    is available as modifier classes for cards.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Titles, text, and links</code>
                  </td>
                  <td>
                    Card titles are used by adding <code>.card-title</code> to a
                    <code>&lt;h*&gt;</code> tag. In the same way, links are added and placed next to
                    each other by adding
                    <code>.card-link</code> to an <code>&lt;a&gt;</code> tag.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Images</code>
                  </td>
                  <td>
                    <code>.card-img-top</code> places an image to the top of the card. With{' '}
                    <code>.card-text</code>, text can be added to the card. Text within{' '}
                    <code>.card-text</code> can also be styled with the standard HTML tags.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Kitchen Sink</code>
                  </td>
                  <td>
                    Mix and match multiple content types to create the card you need, or throw
                    everything in there. Shown below are image styles, blocks, text styles, and a
                    list group—all wrapped in a fixed-width card.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Sizing</code>
                  </td>
                  <td>
                    Cards assume no specific <code>width</code> to start, so they'll be 100% wide
                    unless otherwise stated. You can change this as needed with custom CSS, grid
                    classes, grid Sass mixins, or utilities.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Text Alignment </code>
                  </td>
                  <td>
                    You can quickly change the text alignment of any card—in its entirety or
                    specific parts—with our
                    <a href="/docs/5.3/utilities/text/#text-alignment">text align classes</a>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Navigation</code>
                  </td>
                  <td>
                    Add some navigation to a card's header (or block) with Bootstrap's
                    <a href="/docs/5.3/components/navs-tabs/">nav components</a>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Overlays</code>
                  </td>
                  <td>
                    Turn an image into a card background and overlay your card's text. Depending on
                    the image, you may or may not need additional styles or utilities.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Horizontal</code>
                  </td>
                  <td>
                    Using a combination of grid and utility classes, cards can be made horizontal in
                    a mobile-friendly and responsive way. In the example below, we remove the grid
                    gutters with
                    <code>.g-0</code> and use <code>.col-md-*</code> classes to make the card
                    horizontal at the <code>md</code> breakpoint. Further adjustments may be needed
                    depending on your card content.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Background and color</code>
                  </td>
                  <td>
                    Set a <code>background-color</code> with contrasting foreground{' '}
                    <code>color</code> with
                    <a href="/docs/5.3/helpers/color-background/">
                      our <code>.text-bg-(color)</code> helpers
                    </a>
                    . Previously it was required to manually pair your choice of
                    <a href="/docs/5.3/utilities/colors/">
                      <code>.text-(color)</code>
                    </a>
                    and
                    <a href="/docs/5.3/utilities/background/">
                      <code>.bg-(color)</code>
                    </a>
                    utilities for styling, which you still may use if you prefer.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Card Groups</code>
                  </td>
                  <td>
                    Use card groups to render cards as a single, attached element with equal width
                    and height columns. Card groups start off stacked and use{' '}
                    <code>display: flex;</code> to become attached with uniform dimensions starting
                    at the
                    <code>sm</code> breakpoint.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Grid Cards</code>
                  </td>
                  <td>
                    Use the Bootstrap grid system and its
                    <a href="/docs/5.3/layout/grid/#row-columns">
                      <code>.row-cols</code> classes
                    </a>
                    to control how many grid columns (wrapped around your cards) you show per row.
                    For example, here's
                    <code>.row-cols-1</code> laying out the cards on one column, and{' '}
                    <code>.row-cols-md-2</code> splitting four cards to equal width across multiple
                    rows, from the medium breakpoint up.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Flush Cards</code>
                  </td>
                  <td>
                    Use <code>.card-flush</code> for flush cards.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Hover Cards</code>
                  </td>
                  <td>
                    Use <code>.card-hover</code> for hover cards.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Stretch</code>
                  </td>
                  <td>
                    Use <code>.card-stretch</code> for stretch cards. Stretch sizing{' '}
                    <code>.card-stretch-(size)</code> as:
                    <code>100, 75, 50, 33.33, 25</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/cards"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/cards
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

export default Cards
