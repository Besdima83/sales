import './App.css';
import ButtonAppBar from "./components/AppBar";
import AddCustomerForm from "./components/AddCustomerForm";
import DataGridDemo from "./components/CustomerTable";


function App() {
  return (
    <div>
        <ButtonAppBar />
        <AddCustomerForm />
        <DataGridDemo />
    </div>
  );
}

export default App;
