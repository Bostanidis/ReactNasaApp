import React from 'react'

export default function Main(props) {

  const { data } = props


  return (
    <div className="image-container">
      <img className="background-image" src={data.hdurl} alt="YouTube Thumbnail"></img>
    </div>
  )
}
