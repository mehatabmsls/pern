import axios from "axios";
import { useEffect, useState } from "react";
import useTodo from "./State/todo";
import { GoListOrdered } from "react-icons/go";
import Todos from "./Components/Todos";

function App() {
  const { setTodos, todos, handlePost } = useTodo();
  const [item_value, setItem_value] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        let data = response.data;
        const compareById = (a, b) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        };
        setTodos(data.sort(compareById));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="bg-[#fefefe]  flex-col justify-center items-center w-100vw h-bh font-spline">
      <h1 className="flex items-center gap-2 justify-center text-xl p-4 mb-14">
        Todo list
        <span>
          <GoListOrdered></GoListOrdered>
        </span>
      </h1>
      <section className=" ">
        {todos &&
          todos.map((item, index) => (
            <Todos key={item.id} item={item} index={index}></Todos>
          ))}
      </section>
      <div className="flex justify-center p-4 gap-2 mt-14">
        <input
          type="text"
          placeholder="Enter todo"
          className="text-[#e6f3cc] bg-black outline-none px-2 py-2 rounded-lg"
          value={item_value}
          onChange={(e) => setItem_value(e.target.value)}
        ></input>
        <button
          className="text-lg"
          onClick={() => handlePost(item_value, setItem_value)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
