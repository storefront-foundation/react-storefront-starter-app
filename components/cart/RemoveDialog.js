import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

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
