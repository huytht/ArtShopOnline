import * as React from 'react';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmployeeForm from './formProduct'; 

// import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Views from '../Invoice/Invoice'

export default function ViewsInvoice() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <VisibilityIcon/>
        Create new
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          <h4>Create New Product</h4>
        </DialogTitle>
        <DialogContent>
          <EmployeeForm/>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
