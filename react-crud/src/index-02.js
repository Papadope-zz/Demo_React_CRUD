import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const URL = "http://localhost:3001/posts/";

// <Post></Post>
function Post(){
    return (
        <div>Post</div>
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
            { posts.map( (post)=>{
                return <Post key={post.id} />;
            } )}
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );