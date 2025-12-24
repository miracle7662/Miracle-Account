import React from 'react'
import CommonCard, { CommonCardProps } from './CommonCard'
import TitleHelmet from '@/components/Common/TitleHelmet'

const NotFound: React.FC = () => {
  const commonCardProps: CommonCardProps = {
    error: '404',
    errorTitle: 'Opps! Page not found',
    errorMessage:
      "We are very sorry for inconvenience. The page you are looking for can't be found.",
  }

  return (
    <>
      <TitleHelmet title="404 Not Found" />
      <CommonCard {...commonCardProps} />
    </> 
  )
}

export default NotFound
