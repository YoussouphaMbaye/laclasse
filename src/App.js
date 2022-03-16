import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Select from 'react-select'
import FieldsOption from './components/fieldsOption';

function App() {
  const [questionName,setQuestionName]=useState();
  //const [nbOption,setNbOption]=useState(1);
  const [questionNameAdd,setQuestionNameAdd]=useState();
  const [clickSelect,setClickSelect]=useState(false);
  const [optionName,setOptionName]=useState();
  const [qType,setQtype]=useState("radio")
  const [selectedQuestion,setSelectedQuestion]=useState()
  const [questions,setQuestions]=useState([{id:1,question:'Question'+1,optionType:'radio',options:[{id:1,option:'option1',idQestion:1}]}]);
  const addQuestion=()=>{
    setSelectedQuestion(questions.length+1);
    setQuestions([...questions,{id:questions.length+1,question:questionNameAdd,optionType:qType,options:[{id:1,option:'option1',idQestion:questions.length+1}]}])
    setQuestionName(questionNameAdd)
    setQuestionNameAdd('Nouvel question')
    
  }
  
  
  const options = [
    { value: 'choix', label: 'Choix' },
    { value: 'choixS', label: 'Choix Multiple' },
    { value: 'question', label: 'Question' }
  ]
  const setOptionType=(e,i)=>{
    setQtype(e.target.value)
    console.log(qType)
    console.log(e.target.value)
    console.log(i)
    let q=questions.slice()
    q[i].optionType=e.target.value
   
    setQuestions(q);

  }
  const updateQuestion=(id)=>{
    
    let qq=questions.slice();
    let index=qq.findIndex(q=>q.id==id)

    
    qq[index].question=questionName
    setQuestions(qq)
    setClickSelect(false)
  }
  const addOption=(i)=>{
    let qq=questions.slice();
    let index=qq.findIndex(q=>q.id==i)
    
    qq[index].options.push({id:qq[index].options.length+1,option:optionName,idQestion:qq[index].id})
    setQuestions(qq)
    
    console.log(questions)
  }
  const setTypeOp=(e)=>{
    setQtype(e.label)
  }
  const selection=(id)=>{
    setSelectedQuestion(id);
    setClickSelect(true);
    let index=questions.findIndex(q=>q.id==id)
    setQuestionName(questions[index].question)

  }
  return (
    <div className="App">
      
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {
          questions.map((q,i)=>
              
            
              <div key={i} onClick={()=>selection(q.id)} className={selectedQuestion==q.id && clickSelect?"selectQuestion":"question"} >
                
                
                {selectedQuestion==q.id && clickSelect?
                <>
                  <input type="text" name={"Question"+q.id} value={questionName} onChange={(e)=>setQuestionName(e.target.value)}/>
                  <button onClick={()=>updateQuestion(q.id)}>Update question</button>
                </>
                :<h1>{q.question}?</h1>}
                <select name='qtype' onChange={e=>setOptionType(e,i)} >
                  <option value='radio' >Choix</option>
                  <option  value='text' >Question</option>
                  <option value='checkbox'>Choix Multiple</option>
                </select>
                
                {/* <Select options={options} onChange={setTypeOp}/> */}
                
                { 
                  q.options.map((o,i)=>{
                    return <FieldsOption  infoInput={{type:q.optionType,idd:o.id,optionName:o.option,idQestion:o.idQestion}}/>;
                    //  (q.optionType==="choixS"?<input key={i} type='radio' value={o.option}/>:<h2>{o.option}</h2>)
                  })
                }
                
                <input type="text" name="optionName" value={selectedQuestion==q.id? optionName:""} onChange={(e)=>setOptionName(e.target.value)}/>
                <button onClick={()=>addOption(q.id)}>Add option</button>
                {qType}
                
              </div>
               
            )
            
        }
        <input type="text" name="QuestionName" value={questionNameAdd} onChange={(e)=>setQuestionNameAdd(e.target.value)}/>
        <button onClick={()=>addQuestion()}>add question</button>
      
    </div>
  );
}

export default App;
