import React from 'react';
import ReactDOM from 'react-dom';

// <Post></Post>
function Post(){
    return (
        <div>Post</div>
    );
}

// <App></App>
function App(){
    return (
        <>
            <div>App</div>
            <Post/>
            <Post/>
            <Post/>
        </>
    );
}

ReactDOM.render( <App/>, document.getElementById("root") );