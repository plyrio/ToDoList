import { useState, useEffect } from "react";


function App() {
  const [todoList, setTodoList] = useState<any>([]);
  const [todo, setTodo] = useState<any>({});
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    obterTodo();
  }, []);

  async function obterTodo() {
    const response = await fetch(`${API_URL}`);
    const todoList = await response.json();
    setTodoList(todoList);
  }

  async function criarTodo() {
    await fetch(`${API_URL}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodo({});
    await obterTodo();
  }

  async function alterarTodo() {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodo({});
    await obterTodo();
  }

  async function obterTodoPorId(id: string) {
    const resp = await fetch(
      `${API_URL}/${id}`,
    );
    const todo = await resp.json();
    setTodo(todo);
  }

  async function excluirTodo(id: string) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await obterTodo();
  }
  
function renderizarFormTodo() {
    return (
      <div  className="backdrop-blur-md bg-gray/30 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Formulário de Tarefa</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="titulo" className="text-gray-700">Título</label>
            <input
              id="titulo"
              type="text"
              value={todo.titulo ?? ""}
              onChange={(e) => setTodo({ ...todo, titulo: e.target.value })}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="descricao" className="text-gray-700">Descrição</label>
            <input
              id="descricao"
              type="text"
              value={todo.descricao ?? ""}
              onChange={(e) => setTodo({ ...todo, descricao: e.target.value })}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status" className="text-gray-700">Status</label>
            <select
              id="status"
              value={todo.status ?? "Pendente"}
              onChange={(e) => setTodo({ ...todo, status: e.target.value })}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
          <div>
            {todo.id ? (
              <button onClick={alterarTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Alterar Tarefa
              </button>
            ) : (
              <button onClick={criarTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Criar Tarefa
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderizarTodo() {
    return (
      <div className="backdrop-blur-md bg-gray/30 p-4 rounded-lg shadow-lg mt-4">
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-screen">
          {todoList.map((todo: any) => (
            <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{todo.titulo}</h3>
              <p className="text-gray-700 mt-1 mb-2 break-words">{todo.descricao}</p>
              <p className="text-sm text-gray-500">Status: {todo.status}</p>
              <p className="text-sm text-gray-500">Criado em: {new Date(todo.createdAt).toLocaleDateString('pt-BR')} {new Date(todo.createdAt).toLocaleTimeString('pt-BR')}</p>
              <p className="text-sm text-gray-500">Atualizado em: {new Date(todo.updatedAt).toLocaleDateString('pt-BR')} {new Date(todo.updatedAt).toLocaleTimeString('pt-BR')}</p>
              <div className="mt-2 flex justify-between">
                <button onClick={() => obterTodoPorId(todo.id)} className="bg-green-500 text-white px-2 py-1 rounded-md">Alterar</button>
                <button onClick={() => excluirTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.stockcake.com/public/6/c/4/6c4e7744-99ed-4b72-a9b7-e8367dac5c4f_large/focused-task-management-stockcake.jpg')" }}
    >
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Tarefas</h1>
        <div className="flex flex-col space-y-4 w-full max-w-4xl">
          {renderizarFormTodo()}
          {renderizarTodo()}
        </div>
      </div>
    </div>
  );
}

export default App;
