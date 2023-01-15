import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import {Textarea} from '@mui/joy/Textarea';
import './table.css'
import { Label } from '@mui/icons-material';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
          
          <textarea id="notes" rows="4" cols="50" placeholder='Notes'>

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
            // (rowsPerPage > 0
            //   ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            //   : rows
            // )
            filterData.map((row) => (
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

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />

          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </>
  );
}
