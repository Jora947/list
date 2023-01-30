import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { getAllPeople, putUser } from '../api/listPeople';
import { useFetch } from '../hooks/useFetch';





const PutUser = ({show, onHide, people, setPeople}) => {
  const [fetchPeople, isGenresPeople, PeopleError] = useFetch(async () => {
    const response = await getAllPeople()
    setPeople(response.data)
  })

  let quene = []
  people.map(people =>quene.push(people.queue_number))
  let max_quene = Math.max(...quene);
  let current_date = new Date();
  const [value, setValue] = useState("");
  const addType = () =>{
      putUser(value, max_quene+1,current_date.toLocaleString()).then(data => {
          setValue('')
          onHide()
          fetchPeople()
      })
  }
  return (
    <Modal
    show = {show}
    onHide = {onHide}
    size="lg"
    centered
  >
    <Modal.Header closeButton>
      
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите id"}
            />
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "outline-danger" onClick={onHide}>Закрыть</Button>
      <Button variant = "outline-success" onClick={addType}>Обновить</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default PutUser