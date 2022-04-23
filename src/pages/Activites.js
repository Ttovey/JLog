import AddActivityModal from "../components/AddActivityModal";
import { useEffect, useState } from "react";
import JLogAPI from "../api/JLogAPI";


function Activities() {

  const [jiuJitsu, setJiuJitsu] = useState([])

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      console.log(data)
      setJiuJitsu(data)
    }
  }

  const renderJiuJitsu = () => {
    if (jiuJitsu !== []) {
      return jiuJitsu.map((jitz, index) => {
        return <div key={index}>
          <h2>{jitz.name}</h2>
          <p>{jitz.description}</p>
        </div>
      })
    }
  }

  return (
    <div>
     <AddActivityModal jiuJitsu={jiuJitsu} setJiuJitsu={setJiuJitsu}/>
     { renderJiuJitsu() }
    </div>
  )
}

export default Activities;