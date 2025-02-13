import { useEffect, useState } from 'react'
import Main from "./components/Main.jsx"
import SideBar from "./components/SideBar.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }
  
  useEffect(() => {

    async function fetchAPIData() {
      const url = "https://api.nasa.gov/planetary/apod" +
      `?api_key=KYbufYqVvHR3AhrlbfIi28eptGfY31SImla7PqXv`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log("Fetched from cache today")
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("Fetched from api today")
        console.log("DATA\n", apiData)
      } catch (err) {
        console.log(err.message)
      }

    }
    fetchAPIData()
  }, {})

  return (
    <>
      {data ? (<Main data={data}/>) : (
        <div className="loading-state">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
  
      { data && (
      <Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
