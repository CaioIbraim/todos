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


        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="mb-16 text-4xl font-bold text-gray-800">To-do</h1>
			<h2 className="mb-8 text-2xl font-medium text-gray-800">Criar to-do</h2>
			<div className="flex">
				<input
					className="px-2 font-medium transition-colors duration-100 border-2 border-blue-400 rounded-lg outline-none focus:border-green-500"
					type="text"
					onChange={handleInputChange}
					value={inputTodo}
				/>
				<button
					className="px-4 mx-2 text-lg font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg duration-20transition-colors hover:bg-blue-700"
					onClick={handleCreateTodo}>
					Criar
				</button>
			</div>
			<ul className="mt-8">
				{todos.map((todo) => (
					<li
						className="px-3 font-medium transition-colors duration-150 bg-white border-2 border-blue-400 rounded-lg cursor-pointer hover:bg-blue-100"
						key={todo.id || todo.task}
						onClick={() => handleUpdateTodo(todo.id)}>
						<p className={`${todo.status && "line-through"}`}>{todo.task}</p>
					</li>
				))}
			</ul>
		</div>

        
      </main>
    </div>
  )
}
