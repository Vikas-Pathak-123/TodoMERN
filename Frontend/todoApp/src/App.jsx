import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
// import Todo from './todo';
import Todomdb from './Todomdb';

function App() {
  return (
   <>
   {/* <h4>Connected With Local Database</h4>
    <Todo/> */}
    <br/>
    <h4>Connected With Mongo Database</h4>
    <Todomdb/>
   </>
  );
}

export default App;
