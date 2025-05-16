import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllJson, selectHomeState } from "./homeSlice";
import type { Column } from "../../components/CustomTable";
import type { PerJsonData } from "../../api/homeService/responseModel";
import TextStyle from "../../components/TextStyle";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const useHomeHooks = () => {
  const dispatch = useAppDispatch();
  const { jsonDatas } = useAppSelector(selectHomeState);
  const rowsPerPage = 10;

  //!! -- useStates --
  const [page, setPage] = useState<number>(0);

  // !! -- functions --

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getSlicedJson = () => {
    return jsonDatas.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  // !! -- CONSTANT --
  const column: Column[] = [
    {
      key: "id",
      label: "No.",
      cellStyle: {
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        textAlign: "center" as const,
      },
      render: (_: PerJsonData, index: number) => (
        <TextStyle
          // sx={{
          //   minWidth: "40px",
          //   maxWidth: "40px",
          //   textAlign: "center",
          // }}
          variant="body1"
        >
          {page * rowsPerPage + index + 1}
        </TextStyle>
      ),
    },
    {
      key: "title",
      label: "Title",
      cellStyle: {
        maxWidth: 100,
      },
      render: (row: PerJsonData) => (
        <TextStyle
          sx={{
            maxWidth: "100px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.title}
        </TextStyle>
      ),
    },
    {
      key: "completed",
      label: "Status",
      cellStyle: {
        width: 200
      },
      render: (row: PerJsonData) =>
        row.completed ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          <CancelIcon sx={{ color: "red" }} />
        ),
    },
  ];

  // !! -- useEffects --
  useEffect(() => {
    dispatch(getAllJson(null));
  }, []);

  return {
    getSlicedJson,
    handlePageChange,
    rowsPerPage,
    page,
    jsonDatas,
    column,
  };
};
