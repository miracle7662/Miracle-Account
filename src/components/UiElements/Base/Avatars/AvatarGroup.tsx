import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarImgData, avatarTextData } from './data/avatarData'

const AvatarGroup = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="avatar-group avatar-group-md">
        {avatarImgData.map(({ src, alt }, index) => (
          <Avatar key={index} type="image" size="md" src={src} alt={alt} />
        ))}
      </Stack>
      <hr />
      <Stack direction="horizontal" gap={1} className="avatar-group avatar-group-md">
        {avatarTextData.map(({ text, colorSolid }, index) => (
          <Avatar key={index} type="text" text={text} size="md" colorSolid={colorSolid} />
        ))}
      </Stack>
    </>
  )
}

export default AvatarGroup
