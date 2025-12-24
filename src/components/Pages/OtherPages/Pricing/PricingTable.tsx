import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'

import featuresData from './data/pricingFeaturesData'

interface Plan {
  type: string
  price: number
  features: string
}

const PricingTable: React.FC = () => {
  const [billingOption, setBillingOption] = useState<'monthly' | 'annual'>('monthly')

  const plans: Record<string, Plan[]> = {
    monthly: [
      {
        type: 'Basic',
        price: 12.99,
        features: 'Basic feature for up to 5 employees with everything you need.',
      },
      {
        type: 'Business',
        price: 24.99,
        features: 'Advanced feature and reporting, better workflow and.',
      },
      {
        type: 'Enterprise',
        price: 39.99,
        features: 'Personalized service and enterprise security for large team.',
      },
    ],
    annual: [
      {
        type: 'Basic',
        price: 10.99 * 12,
        features: 'Basic feature for up to 5 employees with everything you need.',
      },
      {
        type: 'Business',
        price: 20.99 * 12,
        features: 'Advanced feature and reporting, better workflow and.',
      },
      {
        type: 'Enterprise',
        price: 34.99 * 12,
        features: 'Personalized service and enterprise security for large team.',
      },
    ],
  }

  const handleBillingOptionChange = (option: 'monthly' | 'annual') => {
    setBillingOption(option)
  }

  const commonWidth = {
    minWidth: '320px',
    maxWidth: '320px',
  }

  return (
    <>
      <div className="mb-8 mb-md-12 mb-lg-16 text-center mx-auto" style={{ maxWidth: '600px' }}>
        <div className="d-inline-block border rounded-pill">
          <Link
            to="#!"
            className={`btn rounded-pill ${billingOption === 'monthly' ? 'active' : ''}`}
            onClick={() => handleBillingOptionChange('monthly')}
          >
            Monthly billing
          </Link>
          <Link
            to="#!"
            className={`btn rounded-pill ${billingOption === 'annual' ? 'active' : ''}`}
            onClick={() => handleBillingOptionChange('annual')}
          >
            Annual billing
          </Link>
        </div>
      </div>
      <Table responsive bordered>
        <thead>
          <tr>
            <th></th>
            {plans[billingOption].map(({ type, price, features }, idx) => (
              <th key={idx} style={commonWidth} className="text-wrap">
                <h5 className="fw-semibold mb-4">{type}</h5>
                <div className="mb-2">
                  <span className="fw-bold text-dark h2">
                    <span className="text-secondary">$</span>
                    {price.toFixed(2)}
                  </span>
                  <span className="fw-normal">
                    {' '}
                    / per {billingOption === 'annual' ? 'year' : 'month'}
                  </span>
                </div>
                <p className="fs-14 lead mb-8">{features}</p>
                <Button variant="primary" className="w-100">
                  Get Started
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featuresData.map(({ name, basic, business, enterprise }, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td className="hstack">
                  {name} <i className="fi fi-rr-info text-muted fs-10 ms-2"></i>
                </td>
                <td style={commonWidth} className="text-center">
                  {basic}
                </td>
                <td style={commonWidth} className="text-center">
                  {business}
                </td>
                <td style={commonWidth} className="text-center">
                  {enterprise}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th style={commonWidth}>
              <div className="d-grid gap-2">
                <Button variant="primary">Get Started</Button>
                <Button variant="neutral">Chat to Sales</Button>
              </div>
            </th>
            <th style={commonWidth}>
              <div className="d-grid gap-2">
                <Button variant="primary">Get Started</Button>
                <Button variant="neutral">Chat to Sales</Button>
              </div>
            </th>
            <th style={commonWidth}>
              <div className="d-grid gap-2">
                <Button variant="primary">Get Started</Button>
                <Button variant="neutral">Chat to Sales</Button>
              </div>
            </th>
          </tr>
        </tfoot>
      </Table>
    </>
  )
}

export default PricingTable
