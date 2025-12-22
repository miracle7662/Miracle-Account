import { Button, Card, Col, ProgressBar, Row, Stack } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { mandiApi } from '../../../common/api'

interface CardData {
  icon: string
  title: string
  count: string
  amount: string
  percentage: number
  color: string
}

const CrmMiniCard = () => {
  const [cardData, setCardData] = useState<CardData[]>([
    {
      icon: 'album-circle-plus',
      title: 'Farmers',
      count: '0',
      amount: '',
      percentage: 0,
      color: 'warning',
    },
    {
      icon: 'briefcase',
      title: 'Customers',
      count: '0',
      amount: '',
      percentage: 0,
      color: 'danger',
    },
    {
      icon: 'animated-icon',
      title: 'Today\'s Total Bill',
      count: '0',
      amount: '₹0',
      percentage: 0,
      color: 'success',
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersRes, customersRes, customerBillsRes, farmerBillsRes] = await Promise.allSettled([
          mandiApi.getFarmers(),
          mandiApi.getCustomers(),
          mandiApi.getCustomerBills(),
          mandiApi.getFarmerBills(),
        ])

        const farmers = (farmersRes.status === 'fulfilled' && farmersRes.value?.data) || []
        const customers = (customersRes.status === 'fulfilled' && customersRes.value?.data) || []
        const customerBills = (customerBillsRes.status === 'fulfilled' && customerBillsRes.value?.data) || []
        const farmerBills = (farmerBillsRes.status === 'fulfilled' && farmerBillsRes.value?.data) || []

        const today = new Date().toISOString().split('T')[0]

        const todaysCustomerBills = customerBills.filter((bill: any) => bill.custBillDate === today)
        const todaysFarmerBills = farmerBills.filter((bill: any) => bill.farBillDate === today)

        const totalBillAmount = todaysCustomerBills.reduce((sum: number, bill: any) => sum + (bill.FinalBillAmount || 0), 0) +
                                todaysFarmerBills.reduce((sum: number, bill: any) => sum + (bill.FinalBillAmount || 0), 0)

        setCardData([
          {
            icon: 'album-circle-plus',
            title: 'Farmers',
            count: farmers.length.toString(),
            amount: '',
            percentage: 0,
            color: 'warning',
          },
          {
            icon: 'briefcase',
            title: 'Customers',
            count: customers.length.toString(),
            amount: '',
            percentage: 0,
            color: 'danger',
          },
          {
            icon: 'animated-icon',
            title: 'Today\'s Total Bill',
            count: totalBillAmount.toString(),
            amount: `₹${totalBillAmount}`,
            percentage: 0,
            color: 'success',
          },
        ])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Row xl={3}>
      {cardData.map(({ icon, count, title, amount, percentage, color }, index) => (
        <Col key={index}>
          <Card>
            <Card.Body>
              <Stack direction="horizontal" gap={4} className="mb-12 align-items-start">
                <Stack direction="horizontal" gap={4}>
                  <div
                    className={`d-flex align-items-center justify-content-center rounded bg-${color}-subtle text-${color}`}
                    style={{ width: '3.5rem', height: '3.5rem' }}>
                    <i className={`fs-4 fi fi-rr-${icon}`}></i>
                  </div>
                  <div>
                    <div className="fs-24 fw-bold text-dark">{count}</div>
                    <div>{title}</div>
                  </div>
                </Stack>
                <Button variant="light" className="btn-icon btn-md ms-auto">
                  <i className="fi fi-br-menu-dots-vertical"></i>
                </Button>
              </Stack>
              <div>
                <Stack direction="horizontal" gap={2} className="mb-2">
                  <div>{title}</div>
                  <div className="fs-13 ms-auto">
                    {amount} <span className=" text-muted">({percentage}%)</span>
                  </div>
                </Stack>
                <ProgressBar variant={color} now={percentage} style={{ height: '0.25rem' }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CrmMiniCard
