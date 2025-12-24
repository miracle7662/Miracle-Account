import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarImgData } from './data/avatarData'

const AvatarStatus = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarImgData.map(({ src, alt, status }, index) => (
          <Avatar key={index} type="image" size="md" src={src} alt={alt}>
            <div className={`avatar-status ${status}`}></div>
          </Avatar>
        ))}
      </Stack>
    </>
  )
}

export default AvatarStatus
