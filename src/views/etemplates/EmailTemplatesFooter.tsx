import { Link } from 'react-router-dom'

const EmailTemplatesFooter = () => {
  return (
    <>
      <div className="my-16 px-6 py-6 bg-secondary-subtle border border-secondary border-opacity-10 rounded-3 text-center">
        <i className="fi fi-rr-interrogation fs-2 mb-4 d-block"></i>
        <h4 className="fs-18 fw-bold">Still needs more help?</h4>
        <Link to="" className="fs-13 fw-light text-primary">
          We're here, ready to talk
        </Link>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <Link to="">
            <i className="fi fi-brands-facebook"></i>
          </Link>
          <Link to="">
            <i className="fi fi-brands-twitter"></i>
          </Link>
          <Link to="">
            <i className="fi fi-brands-linkedin"></i>
          </Link>
          <Link to="">
            <i className="fi fi-brands-youtube"></i>
          </Link>
        </div>
      </div>
      <div>
        <div className="mb-6 text-center text-muted">
          <h6 className="fs-16 fw-bold">It's all about customers!</h6>
          <div className="mb-2">
            Call our customer care number:
            <Link to="" className="text-muted fw-semibold">
              {' '}
              +1(375) 3344 5566
            </Link>
          </div>
          <div className="mb-2">
            You may reach us at:
            <Link to="" className="text-muted fw-semibold">
              {' '}
              support@wrapcoders.com
            </Link>
          </div>
          <div className="mb-2">We serve Mon-Fri, 9AM-18AM</div>
        </div>
        <div className="mb-6 text-center">
          <p>
            Please feel free to
            <Link to="" className="fw-semibold text-danger">
              {' '}
              Unsubscribe
            </Link>{' '}
            from newsletter.
          </p>
        </div>
      </div>
      <hr className="my-12" />
      <div className="d-sm-flex align-items-center text-center">
        <div className="mb-4 mb-sm-0">
          <span>Copyright &copy; 2024</span>
        </div>
        <div className="ms-auto fs-11 text-uppercase text-center d-flex gap-3 justify-content-center">
          <Link to="" className=" fw-bold">
            About
          </Link>
          <Link to="" className=" fw-bold">
            Contact
          </Link>
          <Link to="" className=" fw-bold">
            Policy
          </Link>
          <Link to="" className=" fw-bold">
            Terms
          </Link>
        </div>
      </div>
    </>
  )
}

export default EmailTemplatesFooter
