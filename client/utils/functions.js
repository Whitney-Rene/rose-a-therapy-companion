
//my intent is to use this function in the homepage comp of app.jsx, I'd like to house it here to make my code cleaner
//I want to learn how to possibly resue line 8? can the http be saved as a variable and I add diff endpoints based my server?
const [backEndMessage, setBackEndMessage] = useState("");

const callBackEnd = async () => {
  try{
    const response = await fetch('http://localhost:8888');
    if(!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    setBackEndMessage(data);
  } catch{
    console.error('An error occured:', error);
  }
}

useEffect(() => {
  callBackEnd();
}, []);

