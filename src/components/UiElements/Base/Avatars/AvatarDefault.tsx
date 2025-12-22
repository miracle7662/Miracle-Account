import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarImgData } from './data/avatarData'

const AvatarDefault = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarImgData.map(({ src, alt }, index) => (
          <Avatar key={index} type="image" size="md" src={src} alt={alt} />
        ))}
      </Stack>
    </>
  )
}

export default AvatarDefault
