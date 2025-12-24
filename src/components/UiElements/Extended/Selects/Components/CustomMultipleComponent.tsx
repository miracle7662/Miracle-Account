import { MultiValueProps } from 'react-select'

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

export const CustomMultiValue: React.FC<MultiValueProps<OptionType>> = ({
  innerProps,
  data,
  removeProps,
}) => {
  const dataArray = Array.isArray(data) ? data : [data]

  return (
    <div
      className="select__multi-value d-flex align-items-center py-1 px-1 rounded-pill"
      style={{ margin: '0.15rem' }}
    >
      {dataArray.map((option) => (
        <div key={option.value} className="d-flex align-items-center me-1">
          <img
            src={option.image}
            className="img-fluid rounded-circle me-2"
            style={{ width: '20px', height: '20px' }}
            alt={option.label}
          />
          <span className="ml-2">{option.label}</span>
        </div>
      ))}
      {removeProps && (
        <div
          {...innerProps}
          {...removeProps}
          role="button"
          className="select__multi-value__remove"
          aria-label="Remove Blue"
        >
          <svg
            height="14"
            width="14"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-tj5bde-Svg"
          >
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </div>
      )}
    </div>
  )
}
