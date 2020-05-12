import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const URL = "http://localhost:3001/posts/";

// <Post></Post>
function Post( props ){
    console.log( props );
    return (
        <div className="border border-dark shadow p-2">
            <p>Title: <strong>{ props.post.title }</strong> | #{ props.post.id }</p>
            <p>Author: <strong>{ props.post.author }</strong></p>
            <p>{ props.post.content }</p>
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

    return (
        <>
            { posts.map( post => <Post key={post.id} post={post} /> )}
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );