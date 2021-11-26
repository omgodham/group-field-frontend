import { Button, IconButton, Snackbar } from '@material-ui/core';
import React, { useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';

function AlertMessage({message,toggleMessage}) {


  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(message)
    setOpen(true);
  },[message,toggleMessage])

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

//   console.log(message)
    return (
       <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message ? message : ''}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
    )
}

export default AlertMessage
