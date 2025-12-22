import React from 'react'
import { Alert, Image } from 'react-bootstrap'
import bell from '@/assets/images/general/bell.svg'
import banner from '@/assets/images/general/banner.png'

interface AlertItem {
  variant: string
  dismissible: boolean
  closeVariant: string
  style: React.CSSProperties | null
}

const alerts: AlertItem[] = [
  {
    variant: 'primary',
    dismissible: true,
    closeVariant: 'white',
    style: null,
  },
  {
    variant: 'primary',
    dismissible: true,
    closeVariant: 'white',
    style: {
      background: 'linear-gradient(135deg, rgba(188, 26, 78, 1) 0%, rgba(0, 79, 230, 1) 100%)',
    },
  },
  {
    variant: 'primary',
    dismissible: true,
    closeVariant: 'white',
    style: {
      background: `linear-gradient(135deg, rgba(188, 26, 78, 0.5) 0%, rgba(0, 79, 230, 0.5) 100%), url(${banner}) no-repeat top center / cover`,
    },
  },
]

const MiscAlert = () => {
  return (
    <>
      {alerts.map((alert, index) => (
        <AlertComponent key={index} {...alert} />
      ))}
    </>
  )
}

const AlertComponent = ({ variant, dismissible, closeVariant, style }: AlertItem) => {
  return (
    <Alert
      dismissible={dismissible}
      variant={variant}
      closeVariant={closeVariant}
      style={style ?? undefined}
      className="text-bg-primary text-white"
    >
      <div className="d-flex align-items-center">
        <Image src={bell} className="rounded me-2" />
        <div className="flex-grow-1">
          <strong>Notify!</strong> Lorem Ipsum is simply dummy text of the printing.
        </div>
      </div>
    </Alert>
  )
}

export default MiscAlert
