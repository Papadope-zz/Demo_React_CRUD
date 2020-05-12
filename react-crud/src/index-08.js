import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const URL = "http://localhost:3001/posts/";
// State Management: Context API (React), Redux (Third-party), MobX, etc.

// <Post></Post>
function Post( props ){
    const handleEdit = (e)=>{ console.log("Edit"); }
    const handleDelete = (e)=>{
        // HTTP DELETE -> /posts/{ID}
        const ID = props.post.id;
        fetch( URL + ID, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( data => {
            console.log( data );
            props.del( ID );
        });

    }
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
const postSchema = { title: "", author: "", content: "" };
// <App></App>
function App(){

    const [ posts, setPosts ] = useState([]);
    const [ data, setData ] = useState(postSchema);
    const handleDelete = ( id )=>{
        console.log( id ); // <-- ID of deleted POST, coming from <Post/>
        const updatedPosts = posts.filter( (post)=> post.id !== id );
        setPosts( updatedPosts );
    }

    useEffect(()=>{
        fetch( URL )
        .then( res => res.json() )
        .then( data => setPosts(data) );
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        // REF: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_JSON_data
        fetch( URL, {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {
                'Content-Type': 'application/json' // MIME TYPE for JSON Files
            }
        })
        .then( res => res.json() )
        .then( post => {
            console.log(post);
            setData(postSchema);
             // Update posts state so that the view updates:
            setPosts([ ...posts, post ]);
        });
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
            { posts.map( post => <Post key={post.id} post={post} del={handleDelete} /> )}
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );