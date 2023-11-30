import React from 'react'

const MyTable = ({data}) => {
    if(!data || data.length === 0){
        return null;
    }
    
    // Using the first item in the array, but any item will work since they have the same structure
    const keys = Object.keys(data[0]);

    // Find the start and end indexes
    const startIndex = keys.indexOf("Create an event");
    const endIndex = keys.indexOf("Free period");

    // Slice the array to get the required keys
    const extractedKeys = keys.slice(startIndex, endIndex + 1);

    // const featureKeys = Object.keys(data[0].slice(3))

    console.log("SUP",extractedKeys)

    const featureKeys = Object.keys(data[0]).filter(
        (key) => key !== "id" && key !== "name" && key !== "price"
      );

    

    const columnNames = Object.keys(data);
    console.log("DATA IN TABLE",data[0].name)
    return (
        <table className="subTable">
            <thead className="subTableHead">
                <tr>
                    <th className='potato'><span></span></th>
                    {data.map((columnName) => (
                        
                        <th key={columnName}>{columnName.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='subTableBody'>
                
            {featureKeys.map((feature) => (
          <tr key={feature}>
            <td>{feature}</td>
            {data.map((plan) => (
              <td key={plan.id}>{String(plan[feature])}</td>
            ))}
          </tr>
        ))}
                   
              


            </tbody>
        </table>
    )
}

export default MyTable