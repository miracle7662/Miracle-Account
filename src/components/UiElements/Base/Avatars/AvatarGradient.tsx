import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarTextData } from './data/avatarData'

const AvatarGradient = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarTextData.map(({ text, colorSolid }, index) => (
          <Avatar
            key={index}
            type="text"
            size="md"
            text={text}
            colorSolid={colorSolid}
            className="bg-gradient"
          />
        ))}
      </Stack>
    </>
  )
}

export default AvatarGradient
