import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const URL = "http://localhost:3001/posts/";

// <Post></Post>
function Post( props ){
    const handleDelete = (e)=>{ console.log("Delete"); }
    const handleEdit = (e)=>{ console.log("Edit"); }
    return (
        <div className="border border-dark shadow p-2">
            <p>Title: <strong>{ props.post.title }</strong> | #{ props.post.id }</p>
            <p>Author: <strong>{ props.post.author }</strong></p>
            <p>{ props.post.content }</p>
            <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
            <button onClick={handleEdit} className="btn btn-primary btn-sm ml-2">Edit</button>
        </div>
    );
}

// <App></App>
function App(){

    const [ posts, setPosts ] = useState([]);

    useEffect(()=>{
        fetch( URL )
        .then( res => res.json() )
        .then( data => setPosts(data) );
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border border-dark shadow p-4 mb-4">
                <input type="text" id="title" placeholder="Title" />
                <input type="text" id="author" placeholder="Author" />
                <input type="text" id="content" placeholder="Content" /> {/* Use <textarea> */}
                <br/><button className="btn btn-success btn-sm mt-2">Submit</button>
            </form>
            { posts.map( post => <Post key={post.id} post={post} /> )}
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );