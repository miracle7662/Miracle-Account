import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import Select from 'react-select'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import { mandiApi } from '@/common/api'

const ProjectStatisticChart = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string }>({
    label: 'Monthly',
    value: 'monthly',
  })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const options = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'All Times', value: 'all_times' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [customerBillsRes, farmerBillsRes] = await Promise.allSettled([
          mandiApi.getCustomerBills(),
          mandiApi.getFarmerBills(),
        ])

        const customerBills = (customerBillsRes.status === 'fulfilled' && customerBillsRes.value?.data) || []
        const farmerBills = (farmerBillsRes.status === 'fulfilled' && farmerBillsRes.value?.data) || []

        // Process data based on selected period
        const processedData = processBillData(customerBills, farmerBills, selectedOption.value)
        setChartData(processedData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
        setChartData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedOption])

  const processBillData = (customerBills: any[], farmerBills: any[], period: string) => {
    const allBills = [...customerBills, ...farmerBills]
    const now = new Date()
    const periods = getPeriods(period, now)

    const customerAmounts = periods.map(() => 0)
    const farmerAmounts = periods.map(() => 0)

    allBills.forEach((bill: any) => {
      const billDate = new Date(bill.custBillDate || bill.farBillDate)
      const periodIndex = getPeriodIndex(billDate, period, now)

      if (periodIndex >= 0 && periodIndex < periods.length) {
        const amount = bill.FinalBillAmount || 0
        if (bill.custBillID) {
          customerAmounts[periodIndex] += amount
        } else {
          farmerAmounts[periodIndex] += amount
        }
      }
    })

    return [
      {
        name: 'Customer Bills',
        type: 'bar',
        data: customerAmounts,
      },
      {
        name: 'Farmer Bills',
        type: 'bar',
        data: farmerAmounts,
      },
    ]
  }

  const getPeriods = (period: string, now: Date) => {
    switch (period) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now)
          date.setDate(now.getDate() - (6 - i))
          return date.toISOString().split('T')[0]
        })
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`)
      case 'monthly':
        return [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      case 'yearly':
        return Array.from({ length: 5 }, (_, i) => `${now.getFullYear() - 4 + i}`)
      default:
        return ['All Time']
    }
  }

  const getPeriodIndex = (billDate: Date, period: string, now: Date) => {
    switch (period) {
      case 'daily':
        const daysDiff = Math.floor((now.getTime() - billDate.getTime()) / (1000 * 60 * 60 * 24))
        return daysDiff >= 0 && daysDiff < 7 ? 6 - daysDiff : -1
      case 'weekly':
        const weeksDiff = Math.floor((now.getTime() - billDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
        return weeksDiff >= 0 && weeksDiff < 4 ? 3 - weeksDiff : -1
      case 'monthly':
        return billDate.getMonth()
      case 'yearly':
        const yearDiff = now.getFullYear() - billDate.getFullYear()
        return yearDiff >= 0 && yearDiff < 5 ? yearDiff : -1
      default:
        return 0
    }
  }

  const apexOptions: ApexCharts.ApexOptions = {
    chart: {
      width: '100%',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [1, 2, 3],
      curve: 'smooth',
      lineCap: 'round',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: '35%',
      },
    },
    xaxis: {
      categories: getPeriods(selectedOption.value, new Date()),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (e: any) {
          return '₹' + e.toLocaleString()
        },
      },
    },
    grid: {
      padding: {
        left: 16,
        right: 0,
      },
      strokeDashArray: 3,
      borderColor: 'rgba(170, 180, 195, 0.25)',
    },
    legend: {
      show: true,
      position: 'top',
    },
    colors: [themeColor, '#e49e3d'],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (value: any) {
          return '₹' + value.toLocaleString()
        },
      },
    },
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  return (
    <>
      <Card>
        <Card.Header className="d-sm-flex align-items-center py-3">
          <Card.Title>Bill Statistics</Card.Title>
          <div className="ms-auto mt-3 mt-sm-0" style={{ width: '160px' }}>
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              isClearable={false}
              classNamePrefix="select"
            />
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <ReactApexChart type="bar" options={apexOptions} series={chartData} height={366} />
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default ProjectStatisticChart
