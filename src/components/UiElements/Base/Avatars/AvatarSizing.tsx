import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarImgData } from './data/avatarData'

const AvatarSizing = () => {
  return (
    <>
      <Stack direction="horizontal" gap={3} className="flex-wrap">
        {avatarImgData.map(({ src, alt, size }, index) => (
          <Avatar
            key={index}
            type="image"
            size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'}
            src={src}
            alt={alt}
          />
        ))}
      </Stack>
    </>
  )
}

export default AvatarSizing
