import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const AcDelete = () => {
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked)
  }

  const handleDeleteAccount = () => {
    if (password === '' || !isChecked) {
      Swal.fire('Error', 'Please enter your password and confirm the action.', 'error')
      return
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25b865',
      cancelButtonColor: '#d13b4c',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your account has been deleted.', 'success')
      }
    })
  }

  const handleDeactivateAccount = () => {
    if (password === '' || !isChecked) {
      Swal.fire('Error', 'Please enter your password and confirm the action.', 'error')
      return
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Your account will be deactivated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25b865',
      cancelButtonColor: '#d13b4c',
      confirmButtonText: 'Yes, deactivate it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deactivated!', 'Your account has been deactivated.', 'success')
      }
    })
  }

  return (
    <>
      <h5 className="fw-semibold">Delete Account</h5>
      <p>
        He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty
        gay assistance joy. Unaffected at ye of compliment alteration to.
      </p>
      <Alert
        variant="danger"
        className="text-danger border border-danger border-opacity-10 mb-4 fs-12 fst-italic"
      >
        Go to the Data &amp; Privacy section of your profile Account. Scroll to "Your data &amp;
        privacy options." Delete your Profile Account. Follow the instructions to delete your
        account:
      </Alert>
      <Form>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group controlId="formCheckbox" className="mt-3">
          <Form.Check
            type="checkbox"
            label="I confirm my account deletions or deactivation."
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <div className="d-grid d-sm-flex gap-1 mt-4">
          <Button
            variant="danger"
            type="button"
            onClick={handleDeleteAccount}
            disabled={!password || !isChecked}
          >
            Delete Account
          </Button>
          <Button
            variant="warning"
            type="button"
            onClick={handleDeactivateAccount}
            disabled={!password || !isChecked}
          >
            Deactivate Account
          </Button>
        </div>
      </Form>
    </>
  )
}

export default AcDelete
