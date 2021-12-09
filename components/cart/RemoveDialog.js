import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export default function RemoveDialog({ open, setOpen, name, action }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure that you want to remove selected item?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action}>Remove Item</Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Keep Item
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RemoveDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  name: PropTypes.string,
  action: PropTypes.string,
}
