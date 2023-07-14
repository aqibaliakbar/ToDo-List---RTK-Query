// add imports // we dont have any integration with RTK query yet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice'

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos, // we are getting the data from the hook and we are renaming it as todos then we have isLoading, is Success, isError, Error || this looks a lot like custom use axios hook
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation(); // we are just getting the functions from these hooks we do not need to wait for isLoading, isSuccess, isError, and all those things that we get from query when we are reading the data, this is something we are doing to data instead of reading it
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false }); // we put added to do function to work
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <article key={todo.id}> {/** Each article will have the key which matches the todo.id  */}
          <div className="todo"> {/* we have dive that holds the input and then is a checkbox and it also holds the label and which is the description and that label has the htmlFor={todo.id} which we also assigning to the id of input so they are linked */}
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed }) // when we change we are calling the updateTodo there we are ...todo spreading the todo and overwriting the completed state because this change is for the checkbox and so that set the completed state to false if it was true and true if it was false
              } 
            />
            <label htmlFor={todo.id}>{todo.title}</label> {/* Using label here instead of paragraph or span really helps with accessibility as well as it is linked to the checkbox  */}
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}> {/* It calls the deleteTodo we are passing in the object with id so we got the id and then todo.id  */}
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;