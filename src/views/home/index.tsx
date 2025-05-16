import React from "react";
import { useHomeHooks } from "./useAppHooks";
import TextStyle from "../../components/TextStyle";
import ReusableTable from "../../components/CustomTable";

const HomePage: React.FC = () => {
  const {
    getSlicedJson,
    handlePageChange,
    rowsPerPage,
    page,
    jsonDatas,
    column,
  } = useHomeHooks();

  return (
    <>
      <TextStyle variant="h3">List of Json</TextStyle>
      <ReusableTable
        columns={column}
        data={getSlicedJson()}
        total={jsonDatas.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[10]}
      />
    </>
  );
};

export default HomePage;
