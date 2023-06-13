import { createSlice } from "@reduxjs/toolkit";

//slice Object

export const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    //insert task
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    //delete completed task
    deleteTodo: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

//export actions
export let { addTodo, deleteTodo } = todoSlice.actions;

//export reducers
export default todoSlice.reducer;
