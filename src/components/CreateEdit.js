import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Api from '../_helpers/Api';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 4px;
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 18px;
    color: #333;
    display: flex;
    justify-content: space-between;
    margin: 0;
`;

const ModalWrapper = styled(Modal)`
    width: 800px;
    margin: 0 auto;
    top: 25% !important;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    button:nth-child(1){
        margin-right: 10px;
    }
`;

const Col = styled.div`
    display: flex;
    justify-content: space-between;
    > div { 
      width: 100%
    }

    > div:nth-child(2){ 
      margin-left: 10px;
    }
`;

const theme = createTheme();

const initialState = {
  id: null,
  title: '',
  description: '',
  type: 1,
  power: '',
  price: 0,
}

const CreateEdit = (props, ref) => {
  const [data, setData] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    open: id => handleOpen(id),
    close: () => handleClose(),
  }))

  const handleOpen = (id) => {
    if (id) {
      setLoading(true)
      Api.get(`/edit-audio-tech?id=${id}`)
        .then((response) => {
          setLoading(false)
          setData(response.data);
        }).catch(() => {
          alert('Something went wrong!')
        })
    }

    setOpen(true);
  }

  const handleClose = () => {
    setData(initialState);
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (data.id) {
      formData.append('id', data.id);
    }

    const url = data.id ? '/update-audio-tech' : '/create-audio-tech'
    Api.post(url, formData)
      .then(() => {
        handleClose()
        props.handleRefreshData();

        data.id ? alert('Successfully updated!') : alert('Successfully created!');

      }).catch(() => alert('Something went wrong!'))
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalWrapper open={open}>
        <FormContainer method="POST" onSubmit={handleSubmit} >
          {loading ? <>Loading...</> :
            <>
              <Title>{data.id ? 'Update' : 'Create'} Audio Tech</Title>
              <Col>
                <TextField
                  label="Title"
                  name="title"
                  value={data.title}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={data.description}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <FormControl fullWidth>
                <InputLabel id="create-edit-form-select-type-label">Type</InputLabel>
                <Select
                  labelId="create-edit-form-select-type-label"
                  id="create-edit-form-select-type"
                  value={data.type}
                  name="type"
                  label="Type"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={1}>CD</MenuItem>
                  <MenuItem value={2}>DVD</MenuItem>
                  <MenuItem value={3}>Media</MenuItem>
                </Select>
              </FormControl>
              <Col>
                <TextField
                  label="Power"
                  name="power"
                  value={data.power}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  min="0.1"
                  value={data.price}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <ButtonWrapper>
                <Button type='submit' variant="outlined" color="primary">
                  {data.id ? 'Update' : 'Create'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonWrapper>
            </>}
        </FormContainer>
      </ModalWrapper>
    </ThemeProvider>
  );
};

export default forwardRef(CreateEdit);
