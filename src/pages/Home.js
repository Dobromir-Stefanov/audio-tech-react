import { useState, useRef } from "react";
import CreateEdit from "../components/CreateEdit";
import DataTable from "../components/Table";
import { Button } from "@mui/material";
import styled from "styled-components";

const CreateButton = styled(Button)`
  margin-bottom: 10px !important;
`;

export default function Home() {
  const [refresh, setRefresh] = useState(false)
  const createEditRef = useRef(null)

  const handleModalOpen = (id) => {
    createEditRef.current.open(id)
  };

  const handleRefreshData = () => {
    setRefresh(new Date());
  }

  return (
    <>
      <CreateButton type='submit' variant="outlined" color="primary" onClick={() => handleModalOpen()}>
        Create Audio Tech
      </CreateButton>
      <CreateEdit ref={createEditRef} handleRefreshData={handleRefreshData} />
      <DataTable refresh={refresh} handleModalOpen={handleModalOpen} />
    </>
  )
}