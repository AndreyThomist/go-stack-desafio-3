import React,{useState,useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([])
  async function handleAddRepository() {
    const response =  await api.post('/repositories',{
      title:new Date().getTime() + 'React',
      url:'www.google.com',
      techs:['vue','react']
    })
    setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
     const response = await api.delete(`/repositories/${id}`)
     const filteredRepositories = repositories.filter(repository => repository.id !== id);
     setRepositories([...filteredRepositories]);
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
 })

  return (
    <div>
      <ul>
         {repositories.map(repository => {
          return <li  key={repository.id}>
           {repository.title}
           <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
           </button>
         </li>
         })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
