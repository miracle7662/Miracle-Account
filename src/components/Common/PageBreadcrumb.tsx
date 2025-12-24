import { ReactNode } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

interface PageTitleProps {
  subName?: string
  title: string
  addedChild?: ReactNode
}
const PageBreadcrumb = ({ subName, title, addedChild }: PageTitleProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | Miracle-Infotech call +91 9021167662 </title>
      </Helmet>
      {subName && (
        <div className="mt-2 mb-4 mb-md-6">
          <h4 className="fw-semibold">{title}</h4>
          {addedChild}
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <Link to="/" className="breadcrumb-item">
                Home
              </Link>
              <Breadcrumb.Item>{subName}</Breadcrumb.Item>
              <Breadcrumb.Item active>{title}</Breadcrumb.Item>
            </ol>
          </div>
        </div>
      )}
    </>
  )
}

export default PageBreadcrumb
