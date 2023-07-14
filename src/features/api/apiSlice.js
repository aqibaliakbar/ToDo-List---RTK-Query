// In this we will create methods to interact with the api it essentially replaces axios and pulls that code out of component logic in this apiSlice which kinda same how we name things in Redux.

// We kept all of this api logic out of the components in our separate apiSlice. 

// Results are getting cached invalidating the previous cache so its not updating to show the new changes whether its delete, update or posting newTodo it is because we ares still seeing the cached version of the data we need to do is to assign a tag to the cache and then let it know which mutations invalidate the cache and then it will automatically refetch that data for us. 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // this import is specific to react but we can use redux toolkit and rtk query without using react. But thi import tools specific for the react

export const apiSlice = createApi({
  // in createApi({}) there is a object
  reducerPath: "api", // first think to do is define the reducer path. here api is default path its okay if we do not write it but if you have another name you must give that in the path
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }), // this has baseQuery which uses the fetchBaseQuery which we uses . It has a baseUrl it is familiar if you use axios as we can define baseUrl with axios
  tagTypes: ["Todos"], // Results are getting cached invalidating the previous cache so its not updating to show the new changes whether its delete, update or posting newTodo it is because we ares still seeing the cached version of the data we need to do is to assign a tag to the cache and then let it know which mutations invalidate the cache and then it will automatically refetch that data for us. So the first thing we do after baseQuery is to put in tag types and we are going to name it todos.
  endpoints: (builder) => ({
    // here we are defining endpoints for the api to interact with. Here we are passing builder then we are defining methods to interact with the api
    getTodos: builder.query({
      // so we will get all the todos
      query: () => "/todos", // here is the query method which has the anonymous function that passes the "/todos" that would be attached to the base url its going to request  all of the todos with http get method
      transformResponse: (res) => res.sort((a, b) => b.id - a.id), // Much like axios RTK query provides transformResponse so in it we can put sort function for sorting in ascending order its a - b but for descending order its b - a as we are sorting it by ids 
      providesTags: ["Todos"], // after giving the tagTypes we will give getTodos the provideTags it will provide tags of todos and then we need to invalidate the todo cache when we use the mutations below whether we are creating new todo creating or updating 
    }),
    addTodo: builder.mutation({
      // here is one change from the above builder.mutation that is because we are changing the data not just requesting or querying the data.
      query: (todo) => ({
        // we still have keyword query here and here todo passed in as it needs new todo
        url: "/todos", // we are specifying the url instead of default query like above
        method: "POST", // there could be different methods but here we are using POST method
        body: todo, // for the body we are passing new todo
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      // it is similar to the addTodo only difference is url
      query: (todo) => ({
        url: `/todos/${todo.id}`, // we can can specify a specific todo with its id that we are going to update
        method: "PATCH", // here we are using PATCH method we can also use PUT but put is used where we want to replace the full record whereas patches we are updating part of record
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        // we only need the id whereas the update not only need the toDo id but todo itself so we are destructuring the id from the todoas its passed in or what ever object we send with the id
        url: `/todos/${id}`, // here we are just passing id we do not need todo
        method: "DELETE",
        body: id, // body only needs the id because thats all it need to delete
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});


// RTK feature to create custom hooks based on the methods we provide it will start use and end with query or mutation 
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
