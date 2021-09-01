import React from 'react'
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHeart,
  } from "@fortawesome/free-solid-svg-icons"
  import { userSelector, addToFav,  removeFromFav } from '../../features/User/UserSlice';
import {useDispatch, useSelector } from 'react-redux';

export default function Article() {
    const location = useLocation();
    const article = location.state.params;

    const dispatch = useDispatch();
    const { fav } = useSelector(userSelector);
    console.log(fav);
    const isFavorited = fav.filter(item => item.title === article.title)
    const token =  localStorage.getItem("token")
    const handleClick = () => {
        if(isFavorited.length < 1){
            dispatch(addToFav(article))
        } else {
            dispatch(removeFromFav(article.title))

        }
    }
    return (
        <div classNameName="container mx-auto">
            {article && (
    <div className="container mx-auto flex flex-wrap flex-center ">
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">

            <article className="flex flex-col shadow my-4">
                    <img src={article.urlToImage} className="hover:opacity-75" alt='articleImage' />
                <div className="bg-white flex flex-col justify-start p-6">
                    <p className="text-3xl font-bold hover:text-gray-700 pb-4">{article.title}</p>
                    <p href="#" className="text-sm pb-8">
                        By <span className="font-semibold hover:text-gray-800">{article.author}</span>, Published on {article.publishedAt}
                    </p>
                    <h1 className="text-2xl font-bold pb-3">Content</h1>
                    {article.content}
                </div>
            </article>

            <div className="w-full flex pt-6 bg-white shadow  text-left p-6 ">
                <a href={article.url} className="text-left p-6 flex space-x-1.5">
                    <p className="text-lg text-blue-800 font-bold flex items-center"><i className="fas fa-arrow-left pr-1"></i> Go to article</p>
                    <p className="pt-2">soruce {article.source.name}</p>
                </a>
                {token ? (
                <span onClick={handleClick}  className="text-lg text-blue-800 font-bold flex items-center"> <FontAwesomeIcon icon={faHeart} className="mr-3" /> {isFavorited.length < 1?(<span>add to favorite</span>):(<span>remove to favorite</span>)} </span>)
                
                : null}

            </div>

            <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                    <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" alt='avatar' className="rounded-full shadow h-32 w-32" />
                </div>
                <div className="flex-1 flex flex-col justify-center md:justify-start">
                    <p className="font-semibold text-2xl">{article.author}</p>
                </div>
            </div>

        </section>

    </div>

            )}
    </div>
    )
}
