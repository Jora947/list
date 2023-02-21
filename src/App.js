import { getAllPeople } from './api/listPeople';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useFetch } from './hooks/useFetch';
import "./grid.css"
import { Button, Card, Container, Row } from 'react-bootstrap';
import CreateUser from "./component/CreateUser"
import PutUser from './component/PutUser';
import AppWs from './deelte';



function App() {
  const [putVisible, setPutVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [people, setPeople] = useState([]);
  const ws = useRef(null);
  const [fetchPeople, isGenresPeople, PeopleError] = useFetch(async () => {
    const response = await getAllPeople()
    setPeople(response.data)
  })

  useEffect(() => {
        ws.current = new WebSocket("wss://ws.kraken.com/"); 
        gettingData()
    return () => ws.current.close(); 
}, [ws]);

const gettingData = useCallback(() => {
  if (!ws.current) return;

  ws.current.onmessage = e => {              
      
      fetchPeople()
  };
}, []);



  

  return (
    <>
        <div className="containerr">
          <div className="product-grid">
            {
            people.sort((a,b)=>
            a.queue_number > b.queue_number ? -1 : 1)
            .map(people => 
           <div className="card stacked" key={people.id}>
                <img key={people.id} src={people.avatar} className="card__img"/>
                  <h2 className="card__title">{people.name}</h2>
                  <p className="card__price">{people.date_of_issue}</p>
                  <p className="card__description">Номер в очереди {people.queue_number}</p>
            </div>)
            }
          </div>
        </div>
        <div className='buttons'>
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
    </>
  );
}

export default App;
