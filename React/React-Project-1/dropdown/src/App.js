import React, {useState} from 'react';

import './App.css'; // Import your stylesheet for custom styling

function App() {

  const [isopen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Yes','Probably Not'];

  const handleOptionClick = option => {

    setSelectedOption(option);
    setIsOpen(false);// Close the dropdown after selecting an option
  };
  return(

  <div className='dropdown-container'> 

  {/* In this case, the variable is called `selectedOption` and it is either a string or undefined. If `selectedOption` is a string, then the code will output the value of `selectedOption`. If `selectedOption` is undefined, then the code will output the string `'Select an option'`. */}
  <button className='dropdown-button ' onClick={()=> setIsOpen(!isopen)}>
    {selectedOption ? selectedOption :'Should use a dropdown ?'}
  </button>

  {isopen &&(

    <div>

      {options.map(option =>(
        <button key={option} className='option-button' onClick={() => handleOptionClick(option)}>
          {option}
        </button>
      ))}

    </div>
  )}

  </div>

  );
}


export default App;
