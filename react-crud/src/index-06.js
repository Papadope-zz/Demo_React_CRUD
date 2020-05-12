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
    const [ data, setData ] = useState({ title: "", author: "", content: "" });

    useEffect(()=>{
        fetch( URL )
        .then( res => res.json() )
        .then( data => setPosts(data) );
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log( data );
    }
    const handleChange = (e)=>{
        const val = e.target.value;
        const id = e.target.getAttribute("id");
        setData({
            ...data,  // => title: prev_val, author: prev_val, ...
            [id]: val // => title: current value..., author: current value
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border border-dark shadow p-4 mb-4">
                <input value={data.title} onChange={handleChange} type="text" id="title" placeholder="Title" />
                <input value={data.author} onChange={handleChange} type="text" id="author" placeholder="Author" />
                <input value={data.content} onChange={handleChange} type="text" id="content" placeholder="Content" /> {/* Use <textarea> */}
                <br/><button className="btn btn-success btn-sm mt-2">Submit</button>
            </form>
            { posts.map( post => <Post key={post.id} post={post} /> )}
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );