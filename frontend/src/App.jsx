import axios from "axios";
import { useState } from "react";
function App() {

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [response,setRes]=useState({
      is_success:"",
      user_id: "",
      email: "",
      roll_number: "",
      numbers:"",
      alphabets:"",
      highest_lowercase_alphabet:"",
      is_prime_found:"",
  });
  const [filter,setfilter]=useState("Numbers");

  const handleFilter=(e)=>{
    setfilter(e.target.value);
  }

  const handleChange = (e) => {
      setInput(e.target.value);
      setIsValid(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    try {
        const jsonData = JSON.parse(input);
        setParsedData(jsonData);
        setIsValid(true);
        console.log(parsedData);
        axios.post("http://localhost:5000/bfhl",parsedData)
        .then((res)=>{
          setRes(res.data);
        })
        .catch((error)=>console.log(error));
    } catch (error) {
        setIsValid(false);
        setParsedData(null);
        console.log("submit error");
    }
};

  return (
    <>
      <div className="h-[100vh]">
          <form className=" flex flex-col gap-4 w-[60%] h-[80%] px-[5rem] py-[2rem] border-2 shadow-lg rounded-lg m-auto mt-[5rem] " action="">
                <label htmlFor="api-input">Api Input:</label>
                <textarea className="w-[100%] border" rows="5" name="api-input" id="api-input" onChange={(e)=>handleChange(e)}></textarea>
                <button className="bg-blue-400 rounded-lg p-1 font-semibold" onClick={(e)=>handleSubmit(e)}>submit</button>
                <select className="border" name="file" id="api-input" onChange={(e)=>handleFilter(e)}>
                  <option value="Numbers">Numbers</option>
                  <option value="Alphabets">Alphabets</option>
                  <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                  <option value="All">All</option>
                </select>
                {filter=="All"?<div className="h-[50%] overflow-auto">
                    <p>is_success: {response.is_success.toString()}</p>
                    <p>user_id: {response.user_id}</p>
                    <p>email: {response.email}</p>
                    <p>rollnumber: {response.roll_number}</p>
                    <p>numbers: {response.numbers.toString()}</p>
                    <p>alphabets: {response.alphabets.toString()}</p>
                    <p>higest lowercase alphabates: {response.highest_lowercase_alphabet.toString()}</p>
                    <p>is_prime_found: {response.is_prime_found.toString()}</p>
                  </div>:filter=="Alphabets"?<div className="h-[50%] overflow-auto">
                  <p>alphabets: {response.alphabets.toString()}</p>
                </div>:
                filter=="Numbers"?<div className="h-[50%] overflow-auto">
                <p>numbers: {response.numbers.toString()}</p>
              </div>:
              filter=="Highest lowercase alphabet"?<div className="h-[50%] overflow-auto">
              <p>higest lowercase alphabates: {response.highest_lowercase_alphabet.toString()}</p>
            </div>:""
              }
          </form>
      </div>
    </>
  )
}

export default App
