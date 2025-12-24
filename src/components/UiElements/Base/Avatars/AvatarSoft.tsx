import { Stack } from 'react-bootstrap'
import Avatar from './Avatar'
import { avatarTextData } from './data/avatarData'

const AvatarSoft = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {avatarTextData.map(({ text, colorSoft }, index) => (
          <Avatar key={index} type="text" size="md" text={text} colorSoft={colorSoft} />
        ))}
      </Stack>
    </>
  )
}

export default AvatarSoft
