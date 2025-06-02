import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';




function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)  


  useEffect(() => {
    
   let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

const saveToLS = (params) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

 const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id

    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    //vahi same, id ki index find karo aur uda do

    let newTodos = todos.filter(item => {
      return item.id !== id

    });
    setTodos(newTodos)
     saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
     saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name //name ko target karenge toh id mil jayegi (uuid)
    //ab hum uss id wale todo ko dhundenge
    let index = todos.findIndex(item => {
      //ye uss todo ki index hai jisme vo id hai
      return item.id === id;  //ye function return karta hai vo pehla id jo criteria ko satisfy kare
    })
    //ab ek baar vo index mil gayi hume hum uss index ko change kar denge

    //let newTodos= todos; {ise aise nahi karna}
    let newTodos = [...todos] //ab ye ek naya object hai, kyuki hume ek naya array banana hai
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
     saveToLS()
  }  //hum karte ye hai ki todos me jo bhi todo iss id ka hai (iss id ka means 'e.target.name')us checkbox ko complete kar do


  return (
    < >
      <Navbar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className=" mx-3 md:container md:mx-auto my-8 rounded-xl p-5 bg-[#b9f8b9] min-h-[80vh] md:w-[35%]">
         <h1 className='font-bold text-center text-3xl'>tickTHEtask - Sought your chaos</h1>
        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-2xl font-bold m-5'>Add a Todo</h2>

          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 bg-white'  />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-green-800 mx-2 rounded-full  hover:bg-[#68a968] disabled:bg-[#438443] p-4 py-2 text-sm font-bold text-white'>Save</button>
        </div>
        </div>

       <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/>
         <label className='mx-2' htmlFor="show">Show Finished</label> 
        
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className='text-2xl font-bold'>Your todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
           
           //showfinished--> agar ye true hai toh saare dikhayega finshed not finished dono, agar ye false hai tab tabhi dikhao agar item mera completed na hai, isCompleted false hai 
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""></input>
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-800 hover:bg-[#68a968] p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-green-800 hover:bg-[#68a968] p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
