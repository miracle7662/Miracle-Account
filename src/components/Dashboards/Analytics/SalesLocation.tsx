import { Link } from 'react-router-dom'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { Card, Dropdown, DropdownDivider, ListGroup, Stack } from 'react-bootstrap'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/world.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

interface MapVectorMarkerProps {
  width?: string
  height?: string
  options?: any
}

interface Country {
  name: string
  color: string
  count: string
}

const SalesLocation = ({ width, height }: MapVectorMarkerProps) => {
  const mapOptsMarker = {
    normalizeFunction: 'polynomial',
    zoomButtons: false,
    zoomOnScroll: false,
    hoverOpacity: 0.7,
    hoverColor: false,
    backgroundColor: 'transparent',
    markers: [
      {
        name: 'Russia',
        coords: [61, 105],
        style: {
          fill: '#d13b4c',
        },
      },
      {
        name: 'Geenland',
        coords: [72, -42],
        style: {
          fill: '#3dc7be',
        },
      },
      {
        name: 'Canada',
        coords: [56, -106],
        style: {
          fill: '#ea4d4d',
        },
      },
      {
        name: 'Palestine',
        coords: [31.5, 34.8],
        style: {
          fill: '#fd7e14',
        },
      },
      {
        name: 'Brazil',
        coords: [-14.235, -51.9253],
        style: {
          fill: '#000000',
        },
      },
      {
        name: 'China',
        coords: [35.8617, 104.1954],
        style: {
          fill: '#25b865',
        },
      },
      {
        name: 'United States',
        coords: [37.0902, -95.7129],
        style: {
          fill: '#963258',
        },
        offsets: [2, 2],
      },
    ],
    markerStyle: {
      hover: {
        stroke: '#DDD',
        strokeWidth: 3,
        fill: '#FFF',
      },
      selected: {
        fill: '#ff525d',
      },
    },
  }

  const countries: Country[] = [
    { name: 'United States', color: 'primary', count: '$9,658' },
    { name: 'Canada', color: 'danger', count: '$8,258' },
    { name: 'China', color: 'success', count: '$7,698' },
    { name: 'Russia', color: 'danger', count: '$6,657' },
    { name: 'Brazil', color: 'dark', count: '$5,357' },
    { name: 'Palestine', color: 'warning', count: '$4,456' },
  ]

  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Sales Location</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">Full Reports</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <MapBase type="world" width={width} height={height} options={mapOptsMarker} />
          <Stack direction="horizontal" gap={4}>
            <div className="mt-6">
              <span className="fs-20 fw-bold text-dark">$72,695</span>
              <span className="badge bg-success-subtle text-success rounded-pill d-inline-flex align-items-center ms-2">
                <i className="fi fi-rr-arrow-trend-up fs-11"></i>
                <span>12.68%</span>
              </span>
              <span className="fs-13 text-muted mt-1 d-block">Compared to last month sales.</span>
            </div>
            <Link to="" className="ms-auto icon-link icon-link-hover link-primary">
              <span>Explore</span>
              <i className="fi fi-rr-arrow-small-right bi"></i>
            </Link>
          </Stack>
        </Card.Body>
        <ListGroup>
          {countries.map(({ name, color, count }, index) => (
            <ListGroup.Item key={index} className="hstack py-2">
              <div className="me-auto">
                <Link to="" className="hstack gap-3">
                  <span
                    className={`bg-${color} rounded-circle d-flex flex-shrink-0`}
                    style={{ width: '0.45rem', height: '0.45rem' }}
                  ></span>
                  <span>{name}</span>
                </Link>
              </div>
              <div className="text-muted">{count}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  )
}

export default SalesLocation
