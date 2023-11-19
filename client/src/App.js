import React, { useEffect, useState } from "react"


function App() {

  const [languages, setLanguages] = useState([])

  useEffect(() => {
    fetch('/speech')
    .then(response => response.json())
    .then(data => setLanguages(data))
  },[])

  const languageList = languages.map(language => <h2 style={{color: 'red'}}>{language.name} - {language.rating}</h2>)

  return (

    <div style={{textAlign: 'center'}}>
      <h1>Sample App</h1>  
      <hr/> 
      {languageList}
    </div>

  )
  
}
export default App;
