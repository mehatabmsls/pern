import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { GoCheckCircle } from "react-icons/go";
import useTodo from "../State/todo";

function Todos({ item, index }) {
  const { handleDelete, handlePut } = useTodo();
  const [completed, setCompleted] = useState(false);
  const [update, setUpdate] = useState(item.todo_item);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className=" flex justify-center gap-6 items-center  font-spline">
      <div className="flex items-center bg-[#e6f3cc]">
        {isEditing ? (
          <div className="flex px-3 py-2 w-[345px] text-lg break-all">
            <span className="mr-2">{index + 1 + "."}</span> &nbsp;
            <input
              type="text"
              placeholder="Enter todo"
              className="text-black outline-none px-2 rounded-lg "
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
            ></input>
          </div>
        ) : (
          <div
            className={`flex px-3 py-2 w-80 text-lg break-all  ${
              completed ? "line-through" : ""
            }`}
          >
            <span className="mr-2">{index + 1 + "."}</span> &nbsp;
            {item.todo_item}
          </div>
        )}

        <div className="px-2 flex items-center justify-center">
          {isEditing ? (
            <button
              className="pr-[30px]"
              onClick={() =>
                handlePut(item.id, update, setIsEditing, isEditing)
              }
            >
              <GoCheckCircle size={20}></GoCheckCircle>
            </button>
          ) : (
            <>
              <button>
                <AiOutlineFileDone
                  size={21}
                  onClick={() => setCompleted(!completed)}
                ></AiOutlineFileDone>
              </button>
              <button className=" rounded-md p-2">
                <FiEdit
                  onClick={() => setIsEditing(!isEditing)}
                  size={18}
                ></FiEdit>
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <FiTrash2 size={20}></FiTrash2>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
