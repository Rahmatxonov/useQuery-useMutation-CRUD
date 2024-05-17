import React, { useEffect, useState } from "react";
import "./AddTodo.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddTodo() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const { mutate: updateMutate } = useMutation({
    mutationFn: (body) =>
      axios.put(`http://localhost:3000/todos/${body.id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate(-1);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (body) => axios.post(`http://localhost:3000/todos`, body),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleClick = () => {
    if (id) {
      updateMutate({ id, username, password, image: selectedImage });
    } else {
      mutate({ username, password, image: selectedImage });
    }
  };

  const { data = {} } = useQuery({
    queryKey: ["singleData"],
    queryFn: () =>
      axios
        .get(`http://localhost:3000/todos/${id ? id : ""}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (id && data.username) setUsername(data.username);
  }, [id, data]);

  return (
    <div className="container">
      <div className="mt-[100px]">
        <form className="form">
          <p className="title">{id ? "Update Form" : "Login Form"}</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            className="username input"
            type="text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="password input"
            type="password"
          />
          <button onClick={handleClick} className="btn mb-10" type="button">
            {id ? "Update" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
