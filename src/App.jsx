import { useState } from "react"
import Header from "./components/Header"
import UserInput from "./components/UserInput"
import InvestmentResults from "./components/InvestmentResults"


const INITIAL_INVETMENTS = {
  initialInvestment: 10000,
  annualInvestment: 500,
  expectedReturn: 8,
  duration: 10
};

function App() {
  const [investment, setInvestment] = useState(INITIAL_INVETMENTS);

  const changeHandler = (key, value) => {
    setInvestment(prevState => {
        return { 
          ...prevState,
          [key]: +value,
        }
    });
  }

  const inputIsValid = investment.duration >= 1;
  
  // console.log(calcInvetments);

  return (
    <>
      <Header />
      <UserInput onChangeInput={(key, value) => changeHandler(key, value)} value={investment} />
      {inputIsValid && <InvestmentResults results={investment} />}
      {!inputIsValid && <p className="center">Please enter duration greater than zero.</p>}
    </>
  )
}

export default App
