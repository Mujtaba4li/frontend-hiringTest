import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Paper,
  IconButton,
  TableRow,
  Button,
  FormControl,
  NativeSelect,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './table.css'
//popup start
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

//popup end

export default function TableData(props) {
  const callDetails = props.callDetails;
  console.log(callDetails);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [status, setStatus] = React.useState('all');
  const [filterData, setFilterData] = React.useState(callDetails);
  React.useEffect(() => {
    console.log(status);
    setFilterData(checkStatus(status));
    // setFilterData(status==='all'?callDetails:);
  }, [status]);
  const checkStatus = (status) => {
    if (status === 'all') {
      return callDetails;
    }
    else if (status === 'archive') {
      return callDetails.filter(dt => dt.is_archived === true);
    }
    else {
      return callDetails.filter(dt => dt.is_archived === false);
    }

  }


  const timeDuration = (time) => {
    // let time = ;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    // let hours = Math.floor(time / 3600);
    return `${minutes} min ${seconds} sec`
  };
  const callType = (myClass) => {
    if (myClass === 'missed') {
      return 'miss';
    }
    else if (myClass === 'voicemail') {
      return 'voice';
    }
    else {
      return 'ans';
    }
  };
  //pop
  const [open, setOpen] = React.useState(false);
  const [fetchRow, setfetchRow] = React.useState({
    id: '',
    call_type: '',
    duration: '',
    from: '',
    to: '',
    via: '',
    notes: ''
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = (rowData) => {
    setOpen(true);
    setfetchRow(rowData);


  }
  return (<>

    <div className='popup'>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Note <div className='popupId'>{fetchRow.id}</div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="popupHead">Call Type: <span className='popupCalltype papupData'>{fetchRow.call_type}</span> </div>
          <div className="popupHead">Duration: <span className='papupData'>{timeDuration(fetchRow.duration)}</span> </div>
          <div className="popupHead">From: <span className='papupData'>{fetchRow.from}</span> </div>
          <div className="popupHead">To: <span className='papupData'>{fetchRow.to}</span> </div>
          <div className="popupHead">Via: <span className='papupData'>{fetchRow.via}</span> </div>

          <textarea id="notes" rows="4" cols="40" placeholder='Notes'>

          </textarea>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} fullWidth variant="contained" color='primary'>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>

    <Box sx={{ minWidth: 120 }}>
      <span className='filter'>
        <em> Filter by:</em>
      </span>
      <FormControl>

        <NativeSelect
          className='option'
          value={status}
          onChange={(e) => setStatus(e.target.value)}

        >
          <option value={"all"}>All</option>
          <option value={"archive"}>Archive</option>
          <option value={"unarchive"}>Unarchive</option>
        </NativeSelect>
      </FormControl>
    </Box>
    <TableContainer component={Paper} className='mytable'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow className='myhead'>
            <TableCell>CALL TYPE</TableCell>
            <TableCell align="right">DIRECTION</TableCell>
            <TableCell align="right">DURATION</TableCell>
            <TableCell align="right">FROM</TableCell>
            <TableCell align="right">TO</TableCell>
            <TableCell align="right">VIA</TableCell>
            <TableCell align="right">CREATED AT</TableCell>
            <TableCell align="right">STATUS</TableCell>
            <TableCell align="right">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {

            filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" className={callType(row.call_type)}>
                  {row.call_type}

                  {/*if(row.call_type)==='missed'<div className='mis'>Missed</div>  <div className='ans'>Answeres</div>*/}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right" className='direction'>
                  {row.direction}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {timeDuration(row.duration)}
                  <div className='duration'>({row.duration} seconds)</div>


                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.from}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.to}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.via}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {(row.created_at).slice(0, 10).split('-').reverse().join().replace(/,/g, "-")}


                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {(row.is_archived === true) ? <div className='arch'>Archived</div> : <div className='unarch'>Unarchive</div>}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button
                  className='myBtn'
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleAction(row);
                    }}
                  >
                    Add note
                  </Button>
                </TableCell>
              </TableRow>
            ))}


        </TableBody>
        <TableFooter className='myFooter'>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            // component=""
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </TableFooter>
      </Table>
    </TableContainer>
  </>
  );
}
