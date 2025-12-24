import { Link } from 'react-router-dom'
import { Card, ListGroup, Pagination, Stack, Dropdown, DropdownDivider } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

// Sample images
import img1 from '@/assets/images/gallery/1.png'
import img2 from '@/assets/images/gallery/2.png'
import img3 from '@/assets/images/gallery/3.png'
import img4 from '@/assets/images/gallery/4.png'
import img5 from '@/assets/images/gallery/5.png'

const products = [
  {
    id: 1,
    name: 'Edifier headphone',
    img: img1,
    itemNumber: '#WLH-001',
    reviews: 895,
  },
  {
    id: 2,
    name: 'Apple watch ultra',
    img: img2,
    itemNumber: '#PCK-202',
    reviews: 732,
  },
  {
    id: 3,
    name: 'Google pixel buds',
    img: img3,
    itemNumber: '#SHS-303',
    reviews: 621,
  },
  {
    id: 4,
    name: 'iPhone 15 pro max',
    img: img4,
    itemNumber: '#UHD-404',
    reviews: 543,
  },
  {
    id: 5,
    name: 'Canon camera kit',
    img: img5,
    itemNumber: '#GPL-505',
    reviews: 467,
  },
]

const BestSellingCard = () => {
  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Best Selling</Card.Title>
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
                <span className="ms-3">All Reviews</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <ListGroup variant="flush">
          {products.map((product) => (
            <ListGroup.Item
              className="hstack"
              key={product.id}
              style={{ borderBottomStyle: 'dashed' }}
            >
              <Stack direction="horizontal" gap={3}>
                <div style={{ width: '3.5rem', height: '3rem' }}>
                  <Avatar
                    size="md"
                    type="image"
                    shape="1"
                    src={product.img}
                    alt={`Product ${product.id} Avatar`}
                    className="w-100 flex-shrink-0 rounded bg-body-secondary"
                  />
                </div>
                <Link to="">
                  <h6>{product.name}</h6>
                  <span className="fs-12 text-muted">Code: {product.itemNumber}</span>
                </Link>
              </Stack>
              <div className="ms-auto text-end">
                <Stack direction="horizontal" gap={1} className="mb-2">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className="fi fi-sr-star fs-12 text-warning"></i>
                  ))}
                </Stack>
                <p className="fs-13 text-muted mb-0">{product.reviews} Reviews</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Footer>
          <Pagination className="mb-0">
            <Pagination.Prev />
            {[...Array(4)].map((_, index) => (
              <Pagination.Item key={index}>{index + 1}</Pagination.Item>
            ))}
            <Pagination.Next />
          </Pagination>
        </Card.Footer>
      </Card>
    </>
  )
}

export default BestSellingCard
