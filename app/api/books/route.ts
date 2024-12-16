import { NextRequest, NextResponse } from "next/server";

type Book = {
    id : number;
    title : string;
    author : string;
    year : number
}

let Books : Book[] = [{
    id : 1,
    title : "1984",
    author : "George Orwell",
    year : 1949
},
{
    id : 2,
    title : "To Kill a MockingBird",
    author : "Harper Lee",
    year : 1960
},
{
    id : 3,
    title : "The Great Gatsby",
    author : "F. Scott Fitzgerald",
    year : 1925
}];
// Fetch all books
export async function GET() {
    return NextResponse.json(Books)
};
// Add a new book
export async function POST(request: NextRequest) {
    const newbook : Book = await request.json();
    Books.push({...newbook, id : Books.length + 1})
    return NextResponse.json({message : "Book added successfully.", Books})
};
// Update a book
export async function PUT(request:NextRequest) {
    const updatedBook : Book = await request.json();
    Books = Books.map((book) =>
    (book.id === updatedBook.id? updatedBook : book));
    return NextResponse.json({message : "Book updated successfully.", Books})
};
// Delete a book
export async function DELETE(request: NextRequest) {
    const {id} = await request.json();
    Books = Books.filter((book) => book.id !== id);
    return NextResponse.json({message : "Book deleted successfully.", Books})
}