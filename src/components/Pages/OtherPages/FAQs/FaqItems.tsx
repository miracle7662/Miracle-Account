import { Accordion, Col, Row } from 'react-bootstrap'
const faqs1 = [
  {
    question: 'Can I change my plan later?',
    answer:
      "Yes! you can try us for free for 30 days. If you want, we'll provide you with a free personalize 30-minutes onbording call to get you up and running.",
  },
  {
    question: 'How do you process payments?',
    answer:
      'We accept Visa®, MasterCard®, American Express®, and PayPal®. So you can be confident that your credit card information will be kept safe and secure.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: '2Checkout accepts all types of credit and debit cards.',
  },
  {
    question: 'Do you have a money-back guarantee?',
    answer:
      'Yes. You may request a refund within 30 days of your purchase without any additional explanations.',
  },
  {
    question: 'I have more questions. Where can I get help?',
    answer: "Please contact us if you have any other questions or concerns. We're here to help!",
  },
]

const faqs2 = [
  {
    question: 'How do you process payments?',
    answer:
      'We accept Visa®, MasterCard®, American Express®, and PayPal®. So you can be confident that your credit card information will be kept safe and secure.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      "Yes! you can try us for free for 30 days. If you want, we'll provide you with a free personalize 30-minutes onbording call to get you up and running.",
  },
  {
    question: 'What payment methods do you accept?',
    answer: '2Checkout accepts all types of credit and debit cards.',
  },
  {
    question: 'I have more questions. Where can I get help?',
    answer: "Please contact us if you have any other questions or concerns. We're here to help!",
  },
  {
    question: 'Do you have a money-back guarantee?',
    answer:
      'Yes. You may request a refund within 30 days of your purchase without any additional explanations.',
  },
]

const FaqItems = () => {
  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '960px' }}>
        <div className="mb-8 mb-md-12 mb-lg-16 text-center mx-auto" style={{ maxWidth: '600px' }}>
          <p className="fw-semibold text-primary mb-3">FAQ'S</p>
          <h2 className="fw-bold text-dark mb-3">Frequently asked questions</h2>
          <p className="lead">Everything you need to know about the product and billing.</p>
        </div>
        <Row>
          <Col lg={6}>
            <Accordion className="accordion-icon" defaultActiveKey="0">
              {faqs1.map(({ question, answer }, idx) => (
                <Accordion.Item
                  key={idx}
                  eventKey={(idx + 1).toString()}
                  className="border-top mt-2 rounded-top"
                >
                  <Accordion.Header>{question}</Accordion.Header>
                  <Accordion.Body>{answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col lg={6}>
            <Accordion className="accordion-icon" defaultActiveKey="0">
              {faqs2.map(({ question, answer }, idx) => (
                <Accordion.Item
                  key={idx}
                  eventKey={(idx + 1).toString()}
                  className="border-top mt-2 rounded-top"
                >
                  <Accordion.Header>{question}</Accordion.Header>
                  <Accordion.Body>{answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>{' '}
      </div>
    </>
  )
}

export default FaqItems
