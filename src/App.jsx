import React from "react"
import { useEffect, useState } from 'react'
import './App.css'

import GetSheetsData from './modules/gs_helper.jsx'

function App() {
    const [pageData, setData] = useState([])

	const getData = async() => {
		const data = await GetSheetsData()

		return data
	}

	useEffect(() => {
		getData().then((res)=> setData([...res]))
	}, [])
    
	const csvOffset = 1
	const loadArticle = (row_data) => {
		document.getElementById('article').innerHTML= pageData[row_data - csvOffset].raw_body
		document.getElementById('articles').style.filter = 'blur(10px)'
		document.getElementById('articleParagraph').style.visibility = 'visible'
		document.querySelector('body').style.overflow ='hidden'
	}
    
	const hideArticle = () => {
		document.getElementById('articles').style.filter = 'blur(0px)'
		document.getElementById('articleParagraph').style.visibility = 'hidden'
		document.querySelector('body').style.overflow ='scroll'
	}
    
    return (
        <div className="App">
            <div className='header'>
                <h1 className='logo'>Tower of God: New World</h1>
            </div>
            <div id='articleParagraph' >
                <p id='article'></p>
                <img src="../close.svg" className='closeIcon' onClick={() => hideArticle()} />
            </div>
            <div className='articlesContainer'>
                <div id='articles'>
                    {
                        pageData.map(
                            (db_row_data)=>(
                                <div className='block' key={db_row_data.id} >
                                    <h1 className='articleTitle' onClick={() => loadArticle(db_row_data.id)}>{db_row_data.name}</h1>
                                    <img src={db_row_data.image_ref} className='image' onClick={() => loadArticle(db_row_data.id)}/>
                                </div>
                            )
                        )
                    }
                </div>
                <div className='footer'>
                    <p className='footerText'>POC</p>
                    <ul>
                        <li>
                            <a href="https://github.com/Y-Tian" target="_blank">GitHub</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/tony-yt/" target="_blank">LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default App