import { create } from "zustand";
import axios from "axios";
import { immer } from "zustand/middleware/immer";

const useTodo = create(
  immer((set, get) => ({
    todos: [],
    setTodos: (data) => {
      set({ todos: data });
    },
    handlePut: (id, update, setIsEditing, isEditing) => {
      axios
        .put(`http://localhost:5000/todo/${id}`, { todo_item: update })
        .then((response) => {
          const index = get().todos.findIndex((item) => item.id === id);
          set((state) => {
            state.todos[index].todo_item = update;
          });
          setIsEditing(!isEditing);
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    handleDelete: (id) => {
      axios
        .delete(`http://localhost:5000/todo/${id}`)
        .then(() => {
          set({ todos: get().todos.filter((item) => item.id !== id) });
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    handlePost: (item, setItem_value) => {
      axios
        .post(`http://localhost:5000/todos`, { todo_item: item })
        .then((response) => {
          set({ todos: [...get().todos, response.data[0]] });
          setItem_value("");
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
  }))
);

export default useTodo;
