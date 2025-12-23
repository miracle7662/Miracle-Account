import { Card } from 'react-bootstrap'

const Preloader = () => {
  return (
    <Card className="d-flex align-items-center justify-content-center flex-grow-1 rounded-3 h-100 w-100 border-0 z-1090 ">
      <div className="preloader"></div>
    </Card>
  )
}

const PreloaderFull = () => {
  return (
    <Card className="d-flex align-items-center justify-content-center flex-grow-1 rounded-3 vh-100 w-100 position-absolute border-0 z-1090">
      <div className="preloader"></div>
    </Card>
  )
}

export { Preloader, PreloaderFull }
