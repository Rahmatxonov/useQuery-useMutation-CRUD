import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios.get("http://localhost:3000/todos").then((res) => res.data),
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/todos/${id}`),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="container">
      <button
        className="add-card bg-blue-400 rounded-lg w-[150px] h-[50px] hover:bg-blue-500 text-white"
        onClick={() => navigate("/add")}
      >
        Add Card
      </button>
      <div className="flex gap-5 flex-wrap mt-[50px]">
        {data.map((item) => (
          <div key={item.id} className="card">
            {console.log(item)}
            <img
              src={item.image[0]}
              alt="image"
              onError={(e) => {
                e.target.src = "default-image.jpg";
              }}
            />
            <div className="card__content text-center">
              <p className="card__title font-semibold text-[20px] ">
                Username: {item.username}
              </p>
              <p className="card__description pb-5 pt-5 font-semibold text-[20px]">
                Password: {item.password}
              </p>
              <span className="space-x-3">
                <button
                  onClick={() => navigate(`update/${item.id}`)}
                  className="card__button bg-green-400 p-4 rounded-lg hover:bg-green-500 text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => mutate(item.id)}
                  className="card__button secondary bg-red-400 p-4 rounded-lg hover:bg-red-500 text-white"
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
