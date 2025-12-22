import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarTextData } from './data/avatarData'

const AvatarSolid = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarTextData.map(({ text, colorSolid }, index) => (
          <Avatar key={index} type="text" text={text} size="md" colorSolid={colorSolid} />
        ))}
      </Stack>
    </>
  )
}

export default AvatarSolid
