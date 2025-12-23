import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarTextData } from './data/avatarData'

const AvatarShape = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarTextData.map(({ text, shape }, index) => (
          <Avatar
            key={index}
            type="text"
            size="md"
            text={text}
            shape={shape}
            colorSolid="primary"
          />
        ))}
      </Stack>
    </>
  )
}

export default AvatarShape
