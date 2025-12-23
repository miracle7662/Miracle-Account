import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Button } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import Followers from './data/ConnectionData'

const OverviewConnection = () => {
  const [followerData, setFollowerData] = useState(Followers)

  const toggleIsFollow = (idx: any) => {
    setFollowerData((prevData) => {
      const newData = [...prevData]
      newData[idx].isFollowing = !newData[idx].isFollowing
      return newData
    })

    if (followerData[idx].isFollowing) {
      toast.success(`Following ${followerData[idx].name}!`)
    } else {
      toast.error(`Unfollowed ${followerData[idx].name}!`)
    }
  }

  return (
    <>
      <h5 className="fw-semibold mb-4">Connections</h5>
      {followerData.map(({ image, name, connection, isFollowing }, idx) => (
        <Stack key={idx} direction="horizontal" gap={3} className="w-100 mb-4">
          <Stack direction="horizontal" gap={3}>
            <Avatar type="image" src={image} alt="User Avatar" className="avatar avatar-md" />
            <div>
              <Link to="#!" className="fw-semibold d-block">
                {name}
              </Link>
              <small className="text-muted">{connection}</small>
            </div>
          </Stack>
          <Button
            variant="soft-light"
            className={`rounded-pill ms-auto ${
              isFollowing ? 'bg-success-subtle text-success' : ''
            }`}
            onClick={() => toggleIsFollow(idx)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </Stack>
      ))}
      <Link to="#!" className="icon-link icon-link-hover link-primary">
        <span>All Connections</span>
        <i className="fi fi-rr-arrow-small-right bi"></i>
      </Link>
      <Toaster position="top-center" />
    </>
  )
}

export default OverviewConnection
