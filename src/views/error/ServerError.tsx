import React from 'react'
import CommonCard, { CommonCardProps } from './CommonCard'
import TitleHelmet from '@/components/Common/TitleHelmet'

const ServerError: React.FC = () => {
  const commonCardProps: CommonCardProps = {
    error: '500',
    errorTitle: 'Internal server error!',
    errorMessage:
      'There was an error with the internal server. Please contact your site administrator.',
  }

  return (
    <>
      <TitleHelmet title="500 Server Error" />
      <CommonCard {...commonCardProps} />
    </>
  )
}

export default ServerError
