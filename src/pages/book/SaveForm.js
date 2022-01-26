import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const SaveForm = (props) => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const chanageValue = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitBook = (e) => {
    e.preventDefault(); // submit action을 안타고 자기 할일을 그만함.
    fetch('http://localhost:8080/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw Error('저장실패');
        }
      })
      .then((res) => {
        if (res !== null) {
          navigate(-1);
        } else {
          alert('책 등록에 실패하였습니다.');
        }
      })
      .catch((error) => {
        // catch의 경우 then에서 실행에러가 발생한 경우 작동됨
        console.log('error', error);
      });
  };

  return (
    <div>
      <Form onSubmit={submitBook}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={chanageValue}
            name="title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author"
            onChange={chanageValue}
            name="author"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SaveForm;
