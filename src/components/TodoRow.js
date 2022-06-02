import React, { useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiFillEdit,
  AiFillDelete,
  AiOutlineSend,
} from "react-icons/ai";

// 假設 props 的樣子
// props = {todo:{content, date}}

// const props = {
//     row:{
//         content: "練習 React",
//         date: "2022/06/04"
//     }
// }

const TodoRow = (props) => {
  const { row, rows, setRows } = props;
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* row */}
      <>
        <div className="border flex justify-around">
          <div className="w-1/2 border-r">{row.content}</div>
          <div>{row.date}</div>
          {/* row_btn */}
          <div className="flex">
            <AiFillEdit
              className="w-5 h-5 hover:text-slate-500"
              onClick={() => {
                setOpen(!open);
              }}
            />
            <AiFillDelete
              onClick={() => {
                // TODO 設計防呆
                //   console.log(row.id);
                //   抓取目前 row id
                const { id } = row;
                //   複製 todo 清單
                const newRows = [...rows];
                //   篩選出跟目前 id 不同的項目
                const result = newRows.filter((row) => {
                  return row.id !== id;
                });
                //   console.log(result);
                //   覆蓋舊的 todo 清單
                setRows(result);
                // // 儲存副本到 local
                // const newResultStr = JSON.stringify(newRows);
                // localStorage.setItem("data", newResultStr);
              }}
              className="w-5 h-5  hover:text-slate-500"
            />
          </div>
        </div>

        {open ? (
          <div className="flex">
            {/* TODO 預設值要等於欄位文字 */}
            {/* TODO 加強驗證 */}
            <input
              type="text"
              className="border w-1/2"
              placeholder="Todo"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
                //   console.log(e.target.value);
              }}
            />
            <input
              type="text"
              className="border w-1/2"
              placeholder="YYYY/MM/DD"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <AiOutlineSend
              onClick={() => {
                const msg = `todo:${todo}\ndate:${date}, `;
                if (!window.confirm(`確定修改?\n${msg}`)) return;
                //   抓取目前 row id
                const { id } = row;
                //   複製 todo 清單
                const newRows = [...rows];
                //   篩選出跟目前 id 相同的項目
                const targetIdx = newRows.findIndex((row) => {
                  return row.id === id;
                });
                //   console.log(targetIdx);
                newRows[targetIdx] = {
                  content: todo,
                  date: date,
                };
                setRows(newRows);
                console.log(newRows);
                // // 儲存副本到 local
                // const newRowsStr = JSON.stringify(newRows);
                // localStorage.setItem("data", newRowsStr);
              }}
              className="w-5 h-5"
            />
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default TodoRow;
