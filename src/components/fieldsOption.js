import React, { useState } from 'react';
function FieldsOption(props){

    return (
        <div>
            <input type={props.infoInput.type}  name={props.infoInput.idQestion+"option"+props.infoInput.idd} id={props.infoInput.idd+1}/>
            <label for={props.infoInput.idd+1}>{props.infoInput.optionName}</label>
        </div>
        
      
    );
}
export default FieldsOption;