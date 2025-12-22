import { components, ControlProps } from 'react-select'

export interface OptionType {
  value: string
  label: string
  image: string
}

export const CustomSelectOption: React.FC<{
  innerProps: any
  label: string
  data: OptionType
}> = ({ innerProps, label, data }) => (
  <div className="select__option p-2" {...innerProps}>
    <img
      src={data.image}
      className="img-fluid rounded-circle me-2"
      style={{ width: '20px', height: '20px' }}
      alt={label}
    />
    <span className="ml-2">{label}</span>
  </div>
)

export const CustomControl: React.FC<ControlProps<OptionType>> = ({ children, ...props }) => {
  const selected = (props as any).getValue()[0] as OptionType
  return (
    <components.Control {...props}>
      {selected && (
        <img
          src={selected.image}
          className="img-fluid rounded-circle ms-2"
          style={{ width: '20px', height: '20px' }}
          alt={selected.label}
        />
      )}
      {children}
    </components.Control>
  )
}
