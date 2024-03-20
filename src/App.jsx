import { useState } from 'react'
import './App.css'
import Picture from './components/Picture'

function App() {
  const [word,setWord]= useState("")
 // const key="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmNkMTk3NmIxNTg0NzM2NjM5NTg5N2FiOTY5MWEzNTU4ZGU4ZDU0ZjcwMzI3MDRjMDA2Yzc5YzYwMjQwMDgxNTg2NzRkYTQ0MmE5ZWMwMzYiLCJpYXQiOjE3MTA5MTcwMDQsIm5iZiI6MTcxMDkxNzAwNCwiZXhwIjoxNzQyNDUzMDA0LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.Eyn6J-831J9bV2MJjOdGFY8GVifOLj60TvlI57EZ8AiuB-rKnZ5PBfG_12hvhSmdfUECsVX4zpcj65U5-wOKNwDFuVUSe3jkV7HwgsOpcerlI8XS4GE1i3hMtMbwuNWuO8dOAnnyNmvOZLLggDOP9pqlnAI2RsG6F4pUPkh1wUbtLfVmYwOI7g5muSaNkI4Cn3H1ToIIPpNJrQscVwy1tRzLR2zPNDEpaCkcIX-PT-7MULy2ccfOVTm9HndAepg7eg85zIDSB2DRZIETrmDt1vMVno1F2JaZDKEbSTKb79hAYDwCS-4z5w1nZZuicYVxVRA0RXOpLZGMpCmhXQmFsAdSNK4QVn0zoY5Q7wnZJ9zwMSOb4FCGlbUwFnvHEOKNAnWrh3WqMtyLirzdBS3rvKnxn13cs0knLBUduTwQL-xliFi_w4t3LqT2YeXUDbkWTRz90powEJrdIcy0Iz7eA4xIRDN7cyjIEed7ZLyyo12ol_RiFUiYLptM4FhSQBT8zMVQtsukqDa2ueKBjyyBovpJa7Ci63bdS9ijX_cTnh0U_28CtHMeirCMAhZmCfP9aKwLWRKykIDQj3yzAg1uvFOJr_ly2FygxiLJrk4NDG-uf4-V5WWaRzgyIiYZKH4Tn5vUbyo1qUJTr-KLILWem46w_1W0X7FsYzv2LBRGaTI"
 const [photos,setPhotos] = useState([]) 

  function searchImage(e){
    e.preventDefault()
    if(!word){
      alert("กรุณาป้อนเลขประจำตัวพนักงานด้วยนะครับ")
    }else{
      //เรียกใช้งาน API
      fetchImageFromAPI()
    }
  }
  async function fetchImageFromAPI(){
    const url=`${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`
    //const url=`https://hrapi.egat.co.th/api/images?page=1&query=${word}&client_id=${key}`
    const res = await fetch(url)
    const data= await res.json()
    const result = data.results
    if(result.length==0){
      alert("ไม่มีข้อมูลรูปภาพดังกล่าว")
      setWord("")
    }else{
      //แสดงข้อมูลรูปภาพ
      setPhotos(result)
    }
  }
    return (
    <>
        <h1>ระบบค้นหารูปภาพพนักงานกฟผ.ด้วย API</h1>
        <form onSubmit={searchImage}>
          <input type="text" placeholder='ป้อนเลขประจำตัวของพนักงาน กฟผ.'
          value={word}
          onChange={(e)=>setWord(e.target.value)}
          />
          <button type ='submit'>ค้นหา</button>
        </form>
        {/* แสดงข้อมูลรูปภาพ */}
        <div className='search-result'>
            {photos.map((data,index)=>{
                return <Picture {...data} key={index}/>
            })}
        </div>
    </>
  )
}

export default App
