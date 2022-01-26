import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const UpdateForm = (props) => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/book/' + id)
      .then((res) => res.json())
      .then((res) => {
        setBook(res); // res는 계속 새로 만드는거라서 ...을 안붙여도됨
      });
  }, []); //빈 배열 == 한번만 실행해라 의미

  const chanageValue = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitBook = (e) => {
    e.preventDefault(); // submit action을 안타고 자기 할일을 그만함.
    fetch('http://localhost:8080/book/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error('수정실패');
        }
      })
      .then((res) => {
        if (res !== null) {
          navigate('/book/' + id);
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
            value={book.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author"
            onChange={chanageValue}
            name="author"
            value={book.author}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
