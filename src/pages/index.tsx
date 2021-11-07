import {useState} from "react"
import api from "../../utils/api"
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {data: todos} = await api.get("/getTodos")
  return {
    props: {
      ...todos
    }
  }
}

interface Todo {
  id?: string;
  task: string;
  createdAt: Date;
  status : boolean;
}

interface PageProps {
  todos: Todo[]
}

export default function Home({todos : severTodos}) {
  const [todos, setTodos] = useState<Todo[]>(severTodos)
  const [inputTodo, setInputTodo]  = useState("")
  
  const handleInputChange = (event) => {
   setInputTodo(event.target.value) 
  }

  const handleCreateTodo = async () => {
    const currentTodos = [...todos]
    const newTodo = {
      task : inputTodo,
      createdAt : new Date(),
      status: false
    }

    await api.post("/createTodo", newTodo)
    setInputTodo("")
    currentTodos.push(newTodo)
    setTodos(currentTodos)
  }


  const handleUpdateTodo = async (id: string) => {
    const updatedTodos = todos.map((todo) =>
     todo.id === id ? {...todo, status: !todo.status} : todo
    )
    const currentTodo = updatedTodos.find((todo) => todo.id === id)
    await api.post("/updateTodo", {id,status: currentTodo.status})
    setTodos(updatedTodos)
  }


  const handleDeleteTOdo = async (id: string) => {
   const currentTodos = todos.filter((todo) => todo.id !== id)
   await api.post("/deleteTodo", {id})
   setTodos(currentTodos)
  }

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
        <h1 className="font-mono text-xl code">
          Bem vindo ao <span className="text-purple-700">Gerenciador de Tarefas </span> do <span className="text-indigo-700">Noah</span> <span className="text-gray-700">Ibraim</span>
        </h1>


        <h2>Criar Tarefas</h2>
        <input type="text" onChange={handleInputChange}  className="px-3 font-medium transition-colors duration-75 cursor-pointer border-2" value={inputTodo} />
        <button onClick={handleCreateTodo}  className="px-3 font-medium transition-colors duration-75 cursor-pointer border-2 bg-indigo-500">Criar</button>  
          <ul className="mt-8">
            {todos.map((todo) => 
              <li   className="px-3 font-medium transition-colors duration-75 cursor-pointer border-2"
              key={todo.id || todo.task}
              onClick={() => handleUpdateTodo(todo.id)}
              >
                <p className={todo.status && 'line-through'}>
                 {todo.task}
                 </p>
                 <button onClick={() => handleDeleteTOdo(todo.id)}  className="px-3 font-medium transition-colors duration-75 cursor-pointer border-2 bg-red-500">Remover</button>  
              </li>
            )}
          </ul>
      </main>
    </div>
  )
}
