import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Api from '../_helpers/Api';

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

const typeValue = {
  1: "CD",
  2: "DVD",
  3: "Media"
}

export default function DataTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = (id) => {
    props.handleModalOpen(id);
  }

  const handleDelete = (id) => {
    const result = window.confirm('Do you really want to delete this item?')
    if (result) {
      Api.post(`/delete-audio-tech`, {
        id: id
      }).then(() => {
        fetchData();
      }).catch(() => alert('Something went wrong!'))
    }
  }

  const fetchData = () => {
    setLoading(true);
    Api.get('/get-audio-tech')
      .then(response => {
        setLoading(false);
        setData(response.data);
      }).catch(error => {
        setLoading(false)
        console.error('ERROR!');
      })
  };

  useEffect(() => {
    fetchData();
  }, [props.refresh])

  const typeParser = (type) => {
    //1,2,3 => CD, DVD, MEDIA
    return typeValue[type];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Power</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        {!loading ? <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{typeParser(row.type)}</TableCell>
              <TableCell>{row.power} W</TableCell>
              <TableCell>{row.price} $</TableCell>
              <TableCell>
                <Button variant="outlined" color="warning" onClick={() => handleEdit(row.id)} size="small">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> :
          <>Loading...</>}
      </Table>
    </TableContainer>
  );
};