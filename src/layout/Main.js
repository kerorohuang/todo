import React, { useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import TodoRow from "../components/TodoRow";
import { v4 as uuidv4 } from "uuid";

const initRows = [
  //   {
  //     id: "1e609284-04e0-45b2-825e-edfd2d596d503",
  //     content: "default",
  //     date: "2022/06/02",
  //   },
  //   {
  //     id: "1e609284-04e0-45b2-825e-edfd2d59s6503",
  //     content: "default01",
  //     date: "2022/06/02",
  //   },
  //   {
  //     id: "1e609284-04e0-45b2-825e-edfd2d5a96503",
  //     content: "default02",
  //     date: "2022/06/02",
  //   },
];

const Main = () => {
  const [rows, setRows] = useState(initRows);
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("2022/00/00");

  // 進入網頁 執行一次
  useEffect(() => {
    const data = localStorage.getItem("data") || JSON.stringify(initRows);
    // console.log(data);
    const localRows = JSON.parse(data);
    setRows(localRows);
    console.log(data);
  }, []);

  //   rows 改變就執行一次
  useEffect(() => {
    //   把字串轉成 JSON = 字串
    const rowsStr = JSON.stringify(rows);
    // 儲存 local 副本
    localStorage.setItem("data", rowsStr);
  }, [rows]);

  return (
    <div>
      {/* icons */}
      <div className="px-3 py-1">
        <div className="flex">
          <input
            type="text"
            className="border w-1/2"
            placeholder="Todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <input
            type="text"
            className="border w-1/2 mx-1"
            placeholder="YYYY/MM/DD"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <AiOutlinePlusCircle
            onClick={() => {
              //   防呆
              if (!todo || !date) return alert("無效輸入");
              if (date.length != 10) return alert("日期長度錯誤");
              if (todo.length > 20) return alert("TODO 最大長度為20");

              // 宣告新的 todo
              const newRow = {
                id: uuidv4(),
                content: todo,
                date: date,
              };
              //   複製 rows
              const newRows = [...rows];
              //   console.log(newRows);
              //   rows 塞入 新的 todo
              newRows.push(newRow);
              //   console.log(newRows);
              // 新的 rows 覆蓋舊的 rows
              setRows(newRows);

              //   //   把字串轉成 JSON = 字串
              //   const newRowsStr = JSON.stringify(newRows);
              //   // 儲存 local 副本
              //   localStorage.setItem("data", newRowsStr);

              //   把 input 歸零
              setDate("");
              setTodo("");
              //   console.log(newRow);
            }}
            className="ml-auto w-6 h-6 hover:text-slate-500"
          />
        </div>
      </div>
      {rows.map((row) => {
        return <TodoRow key={row.id} row={row} rows={rows} setRows={setRows} />;
      })}
    </div>
  );
};

export default Main;
