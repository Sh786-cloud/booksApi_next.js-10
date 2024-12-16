"use client"
import { headers } from "next/headers";
import { useState, useEffect, use } from "react"

type Book = {
  id : number;
  title : string;
  author : string;
  year : number
};

export default function Home () {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({id: 0, title: "", author: "", year: 0});

  useEffect(() => {
    async function fetchbooks () {
      const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
    }
    fetchbooks()
  }, []);

  const handleSubmit = async () => {
    const method = form.id? "PUT" : "POST" ;
    const res = await fetch("/api/books", {
      method,
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setBooks(data);
    setForm({id:0, title:"", author:"", year:0})
  };

  const handleDelete = async (id:number) => {
    const res = await fetch('/api/books', {
      method : 'DELETE',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({id})
    });
    const data = await res.json();
    setBooks(data);
  };


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading Books API ...</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
      <h1 className="text-3xl font-bold mb-4 text-center">BOOKS API</h1>
      <div>
        <input 
        type="text" 
        placeholder="Title" 
        value={form.title}
        onChange={(e)=> setForm({...form, title: e.target.value})}
        className="border border-orange-400 mr-2 p-2 rounded-md"
        />
        <input 
        type="text" 
        placeholder="Author" 
        value={form.author}
        onChange={(e)=> setForm({...form, author: e.target.value})}
        className="border border-orange-400 mr-2 p-2 rounded-md"
        />
        <input 
        type="number" 
        placeholder="Year" 
        value={form.year}
        onChange={(e)=> setForm({...form, year:parseInt(e.target.value)})}
        className="border border-orange-400 mr-2 p-2 rounded-md"
        />
        <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
        onClick={handleSubmit}
        >
          {form.id? "Update" : "Add"}
        </button>
      </div>
      {/* Books List */}
      <ul className="space-y-4">
        {books?.map((book) => (
          <li key={book.id}
          className="px-4 mt-3 rounded shadow hover:shadow-lg border border-orange-600">
            <h2 className="text-xl font-semibold mt-1">{book.title}</h2>
            <p>Author : {book.author}</p>
            <p>Year : {book.year}</p>
            <button
            onClick={()=> setForm(book)}
            className="text-blue-500 hover:text-blue-800 hover:bg-yellow-300 py-1 px-2 mr-4 mb-1 bg-yellow-100 border-red-100 rounded-md"
            >
              Edit
            </button>
            <button
            onClick={()=> handleDelete(book.id)}
            className="text-red-500 hover:text-red-800 bg-yellow-100 border-red-300 hover:bg-yellow-300 py-1 px-2 rounded-md"
            >
              Delete
            </button>
          </li>
        )) || <p>No Books Available</p>}
      </ul>
      </div>
    </div>
  )
}