import React from 'react'
import CommonCard, { CommonCardProps } from './CommonCard'
import TitleHelmet from '@/components/Common/TitleHelmet'

const NotAuthorized: React.FC = () => {
  const commonCardProps: CommonCardProps = {
    error: '401',
    errorTitle: 'You are not authorized!',
    errorMessage:
      'You do not have permission to view this page using the credentials that you have provided.',
  }

  return (
    <>
      <TitleHelmet title="401 Not Authorized" />
      <CommonCard {...commonCardProps} />
    </>
  )
}

export default NotAuthorized
