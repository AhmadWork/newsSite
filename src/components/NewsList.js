import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"


export default function  NewsList({data}) {
    const history = useHistory();

  return (
    <div>
      <h5>News List</h5>
      <div className="mt-2 border-t border-gray-300">
          {data && data.articles.map(item => (
        <div className="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline" onClick={() => history.push('/article',{params: item}) }>
          <div className="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
            <p className="font-medium">{item.title}</p>
            <p className="">By {item.author}</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-blue-400 hidden sm:inline-block"
          />
        </div>  
          ))}
        </div>
    </div>
  )
}
