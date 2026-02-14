import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  const testCodeEditor = () => {
    navigate("/editor/1");
  }
  return (
    <div>
      <div>This is home page......</div>
      {console.log("entered home page ____________")}
      <button onClick={testCodeEditor}>test</button>
    </div>
  )
}
