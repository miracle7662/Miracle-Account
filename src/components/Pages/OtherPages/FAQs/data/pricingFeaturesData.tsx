interface Feature {
  name: string
  basic: string | number | JSX.Element
  business: string | number | JSX.Element
  enterprise: string | number | JSX.Element
}

const pricingFeaturesData: Feature[] = [
  {
    name: 'Basic Features',
    basic: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Users',
    basic: 10,
    business: 20,
    enterprise: 'Unlimited',
  },
  {
    name: 'Individual data',
    basic: '10GB',
    business: '20GB',
    enterprise: 'Unlimited',
  },
  {
    name: 'Support',
    basic: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Automation workflow',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: '200+ integrations',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Analytics',
    basic: 'Basic',
    business: 'Advanced',
    enterprise: 'Extraordinary',
  },
  {
    name: 'Export reports',
    basic: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Schedule reports',
    basic: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'API Access',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Advanced reports',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Saved reports',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Customer reports',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Custom fields',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'OSS/SAML Authentication',
    basic: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Advanced permission',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Audit logs',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    enterprise: <i className="fi fi-rr-badge-check text-success fs-14"></i>,
  },
  {
    name: 'Data history',
    basic: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    business: <i className="fi fi-rr-minus text-muted fs-14"></i>,
    enterprise: <i className="fi fi-rr-minus text-muted fs-14"></i>,
  },
]

export default pricingFeaturesData
