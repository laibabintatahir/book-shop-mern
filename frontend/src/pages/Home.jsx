import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Book Shop</h1>
        <Link to="/books/create" className="flex items-center justify-center">
          <span className="mr-2 text-2 font-bold">Create Book</span>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">No</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Author</th>
              <th className="border border-gray-400 px-4 py-2">Publish Year</th>
              <th className="border border-gray-400 px-4 py-2">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{book.title}</td>
                <td className="border border-gray-400 px-4 py-2">{book.author}</td>
                <td className="border border-gray-400 px-4 py-2">{book.publishedYear}</td>
                <td className="border border-gray-400 px-4 py-2 flex justify-center items-center">
                  <Link to={`/books/details/${book._id}`} className="mr-2">
                    <BsInfoCircle className="text-green-800 text-xl" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="mr-2">
                    <AiOutlineEdit className="text-yellow-600 text-xl" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-red-600 text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
