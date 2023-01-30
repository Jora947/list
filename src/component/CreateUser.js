import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { getAllPeople, postUser } from '../api/listPeople';
import { useFetch } from '../hooks/useFetch';





const PostUser = ({show, onHide, people, setPeople}) => {
  const [value, setValue] = useState("");

  const [fetchPeople, isGenresPeople, PeopleError] = useFetch(async () => {
    const response = await getAllPeople()
    setPeople(response.data)
  })

  const [fetchPostUser, isPostUser, PostUserError] = useFetch(async () => {
    const response = await postUser(value, max_quene+1, current_date.toLocaleString()).then(data => {
      setValue('')
      onHide()
      fetchPeople()
    })
  })
  
  let quene = []
  people.map(people =>quene.push(people.queue_number))
  let max_quene = Math.max(...quene);
  let current_date = new Date();
  
  const addUser = () =>{
    fetchPostUser()
    console.log(value)
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
                placeholder={"Введите ваше имя"}
            />
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "outline-danger" onClick={onHide}>Закрыть</Button>
      <Button variant = "outline-success" onClick={addUser}>Добавить</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default PostUser