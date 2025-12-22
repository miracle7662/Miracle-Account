import { IntegrationsAvaiable, IntegrationsConnect } from './Components'

const IntegrationsComponent = () => {
  return (
    <>
      <IntegrationsConnect />
      <hr className="mt-6" />
      <IntegrationsAvaiable />
    </>
  )
}

export default IntegrationsComponent
