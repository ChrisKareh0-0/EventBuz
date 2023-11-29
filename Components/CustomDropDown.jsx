import { useState } from "react"

const CustomDropDown = ({title, options, value, setValue}) => {
    const [selectedOption, setSelectedOption] = useState('')

    return (
    <>
        <div className="sec-center"> 	
            <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
            <label className="for-dropdown" htmlFor="dropdown">{title}  {selectedOption}<i className="uil uil-arrow-down"></i></label>
                <div className="section-dropdown"> 
                    {options.map((option, index) => (
                        <a
                            key={index}
                            className="textInDropDown"
                            onClick={()=>setSelectedOption(option)}>
                                {option}
                            </a>
                    ))}
                    
                </div>
        </div>
    </>
    )
  }

  export default CustomDropDown