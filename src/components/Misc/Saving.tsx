import { useState } from 'react'
import { Stack, Spinner, Button } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast'

interface SavingProps {
  message?: string
}

const Saving: React.FC<SavingProps> = ({ message }) => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveChanges = () => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      toast.success(message || 'Saved successfully')
    }, 2000)
  }

  return (
    <>
      <Stack direction="horizontal" gap={1}>
        <Button
          variant="primary"
          className="text-white"
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">{' Saving...'}</span>
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
        <Button variant="" className="btn-soft-danger">
          Reset
        </Button>
      </Stack>
      <Toaster position="top-center" />
    </>
  )
}

export default Saving
