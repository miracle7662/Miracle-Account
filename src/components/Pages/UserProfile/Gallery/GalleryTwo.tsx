import { useState } from 'react'
import { Card, Dropdown, Stack } from 'react-bootstrap'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import Download from 'yet-another-react-lightbox/plugins/download'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Share from 'yet-another-react-lightbox/plugins/share'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import dataGalleryTwo from './data/dataGalleryTwo'

const GalleryTwo = () => {
  const [index, setIndex] = useState(-1)

  return (
    <>
      <style>
        {`
          .yarl__icon {
            height: 24px;
            width: 24px;
          }
          .yarl__thumbnails_thumbnail { 
            width: 150px;
            height: 92px;
            border-color: #ced5e340;
          }
          .yarl__thumbnails_thumbnail_active {
            border-width: 2px;
            border-color: #00e700;
          }
          .yarl__slide_image {
            width: 100%;
            height: 100%;
            border-radius: 0.25rem;
          }
        `}
      </style>

      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Personal albums</Card.Title>
          <div className="ms-auto">
            <Dropdown align={'end'} className="flex-shrink-0 ms-2">
              <Dropdown.Toggle variant="soft-light" size="sm" className="rounded-pill">
                Action
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#!">Invite</Dropdown.Item>
                <Dropdown.Item href="#!">Rename</Dropdown.Item>
                <Dropdown.Item href="#!">View Details</Dropdown.Item>
                <Dropdown.Item href="#!">Add to Favorite</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#!" className="text-danger">
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <Card.Body>
          <PhotoAlbum
            photos={dataGalleryTwo}
            layout="masonry"
            targetRowHeight={200}
            onClick={({ index }) => setIndex(index)}
          />
          <Lightbox
            slides={dataGalleryTwo}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download, Captions, Counter, Share]}
          />
        </Card.Body>
        <Card.Footer>
          <Stack direction="horizontal" gap={2}>
            <span className="fs-13 text-muted">46 Photos</span>
            <span
              className="d-none d-lg-flex bg-secondary bg-opacity-50 rounded-circle"
              style={{ width: '0.25rem', height: '0.25rem' }}></span>
            <span className="fs-13 text-muted">22 Aug, 2024</span>
          </Stack>
        </Card.Footer>
      </Card>
    </>
  )
}

export default GalleryTwo
