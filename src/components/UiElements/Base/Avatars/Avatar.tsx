import React, { ReactNode } from 'react'

interface TextAvatarProps {
  type: 'text'
  text: string
  size?: string
  className?: string
  status?: string
  colorSolid?: string
  colorSoft?: string
  shape?: string
}

interface ImageAvatarProps {
  type: 'image'
  src: string
  alt?: string
  className?: string
  children?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
  status?: 'busy' | 'online' | 'offline' | 'inactive' | 'invisible' | 'always'
  colorSolid?: string
  colorSoft?: string
  shape?: string
}

type AvatarProps = TextAvatarProps | ImageAvatarProps

const Avatar: React.FC<AvatarProps> = ({
  type,
  className,
  status,
  size,
  colorSolid,
  colorSoft,
  shape,
  ...props
}) => {
  const avatarClassName = `avatar ${className || ''} ${size ? `avatar-${size}` : ''} ${
    colorSolid ? `text-white bg-${colorSolid}` : ''
  } ${colorSoft ? `text-${colorSoft} bg-${colorSoft}-subtle` : ''} ${
    shape ? `rounded-${shape}` : ''
  }`

  if (type === 'text') {
    const { text } = props as TextAvatarProps

    const initials = text
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    return (
      <div className={avatarClassName}>
        {status}
        <div>{initials}</div>
      </div>
    )
  } else if (type === 'image') {
    const { src, alt, children: imageChildren } = props as ImageAvatarProps

    return (
      <div className={avatarClassName}>
        {status}
        <img src={src} alt={alt || 'Avatar'} className={`img-fluid rounded-${shape}`} />
        {imageChildren}
      </div>
    )
  } else {
    return null
  }
}

export default Avatar
