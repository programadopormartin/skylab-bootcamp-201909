import React from 'react'
import PostItem from '../Post-Item'
import './index.sass'

export default function({posts}){
    return  <section className="posts">  
        <ul >
        {posts.map(post => <li className="post-list__item" key={post.post.id}> <PostItem post={post}  /></li>)}
        </ul>
        </section>
}
           
/* {posts.map(post => onPostRender(post) )}
 */