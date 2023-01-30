import { hot } from 'react-hot-loader/root';
import { getAllPeople } from './api/listPeople';
import { useEffect, useRef, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import './index.css';
import { Button, Card, Container, Row } from 'react-bootstrap';
import CreateUser from "./component/CreateUser"
import PutUser from './component/PutUser';


function App() {
  const [putVisible, setPutVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [people, setPeople] = useState([]);
  const [fetchPeople, isGenresPeople, PeopleError] = useFetch(async () => {
    const response = await getAllPeople()
    setPeople(response.data)
  })

  useEffect(()=>{
    fetchPeople()
  },[])

  

  return (
    <div className="App">
        <div className='flex'>
          {people.sort((a,b)=>
           a.queue_number > b.queue_number ? -1 : 1)
           .map(people => 
           <div key={people.id}>
            {[people.name, 
            <img key={people.id} src={people.avatar}/>,people.date_of_issue, people.queue_number]}
            </div>)}
        </div>
        <Button onClick={() => setPostVisible(true)} variant="outline-dark" className="mt-4 p-2">Встать в очередь</Button>
        <Button onClick={() => setPutVisible(true)} variant="outline-dark" className="mt-4 p-2">Обновиться в очереди</Button>
        <CreateUser 
          show={postVisible} 
          onHide={()=>setPostVisible(false)} 
          people={people} 
          setPeople={setPeople}
        />
        <PutUser 
          show={putVisible} 
          onHide={()=>setPutVisible(false)} 
          people={people} 
          setPeople={setPeople}
        />
    </div>
  );
}

export default hot(App);
