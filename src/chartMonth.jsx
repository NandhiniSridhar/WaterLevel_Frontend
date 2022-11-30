import React, { useEffect, useState } from "react";
import './App.css'
import {sendGetRequest} from './AJAX.jsx'
import {sendPostRequest} from './AJAX.jsx'
import { Bar } from "react-chartjs-2";
import MonthYearPicker from "react-month-year-picker";
//import { Chart as ChartJS } from "chart.js/auto";

import Chart from 'chart.js/auto';
//import {sendGetRequest} from 'ajax.jsx';

//parent of RevealChartMonth
//<RevealChartMonth update={updateReveal}/>

//Reservoirs (name-id-total capacity):
//Shasta-SHA-4552000, Oroville-ORO-3537577, Trinity Lake-CLE-2447650, 
//New Melones-NML-2400000, San Luis-SNL?-2041000, 
//Don Pedro-DNP-2030000, Berryessa-BER-1602000
//total capacity and current storage level

var values =[1624581,1640529,762939,992336,905246,1139440,1031331];



function WaterChart(props){
 
  
  const nicknames = new Map();
  nicknames.set(0, 'Shasta');
  nicknames.set(1, 'Oroville');
  nicknames.set(2, 'Trinity Lake');
  nicknames.set(3, 'New Melones');
  nicknames.set(4, 'San Luis');
  nicknames.set(5, 'Don Pedro');
  nicknames.set(6, 'Berryessa');
  
  let n =7;
  

    // objects containing row values
    
    let canContain = {label: "", data: [], backgroundColor: ["blue"]};
  
    let labels = [];
  
  
  
  canContain.data.push(4552000);
  canContain.data.push(3537577);
  canContain.data.push(2447650);
  canContain.data.push(2400000);
  canContain.data.push(2041000);
  canContain.data.push(2030000);
  canContain.data.push(1602000);
  
  
    for (let i=0; i<n; i++) {
      
      labels.push(nicknames.get(i));
    }


  let contains = {label: "", data: [], backgroundColor: ["red"]};
  
    let labels2 = [];

  
  contains.data.push(props.storage[0].value);
  contains.data.push(props.storage[1].value);
  contains.data.push(props.storage[2].value);
  contains.data.push(props.storage[3].value);
  contains.data.push(props.storage[4].value);
  contains.data.push(props.storage[5].value);
  contains.data.push(props.storage[6].value);
  
  
  
    for (let i=0; i<n; i++) {
      
      labels2.push(nicknames.get(i));
    }
  


  const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: contains.data,
      backgroundColor: 'rgb(66,145, 152)',
      borderWidth: 1,
      categoryPercentage: .5,
    },
    {
      label: 'Dataset 2',
      data: canContain.data,
      backgroundColor: 'rgb(120, 199, 297)',
      borderWidth: 1,
      categoryPercentage: .5,
    },
    
  ]
  };

  let userData = {};
  userData.labels = labels;
  userData.datasets = [canContain];
  

console.log(userData);
let options = {
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
     
      grid: {
        display: false
      },
      stacked: true,
    },
    y: {
     
      beginAtZero: true,
      grid: {
        display: false
      
      }
    }
  }
};
  
  return (
    <div id="chart-container">
      <Bar options={options} data={data}/>
    </div>
  )

}


function ChartMonth(props){
  


  let storage2 = [
    {'value': 1624581},
    {'value': 1640529},
    {'value': 762939},
    {'value': 992336},
    {'value': 905246},
    {'value': 1139440},
    {'value': 1031331},
   ]
  
   const [month, setMonth] = useState(2); //1 = Jan
   const [year, setYear] = useState(2022);
   const [storage, setStorage] =useState(storage2);
   const [wordMonth, updateWord]=useState("February")
   const [showMore, setShowMore] = useState(false);
     

   console.log("in chartMonth");
   console.log(month);
  
   useEffect(initialize,[]);
   
   //useEffect(sendMonthYear, month);
   
  
function initialize () {
    (async function () {
      
      console.log("Doing AJAX request")
      //input_obj = {"month":5, "year":2022};
      let newChart = await sendGetRequest("query/getChart")
      .then(function(data){
        console.log(JSON.stringify(data));
        setStorage(data);
       
      })
      .catch(function(error){
        alert("error in newchart: " + error);
      })
 
      setStorage(newChart[0]);
    }) ();
  
}

  
  
async function sendMonthYear(month){
  
  setMonth(month)
  setYear(year);
  
  if(month == 1){updateWord("January")}
  else if(month == 2){updateWord("February")}
  else if(month == 3){updateWord("March")}
  else if(month == 4){updateWord("April")}
  else if(month == 5){updateWord("May")}
  else if(month == 6){updateWord("June")}
  else if(month == 7){updateWord("July")}
  else if(month == 8){updateWord("August")}
  else if(month == 9){updateWord("September")}
  else if(month == 10){updateWord("October")}
  else if(month == 11){updateWord("November")}
  else if(month == 12){updateWord("December")}
  
  let obj = {
    "sendMonth": month,
    "sendYear": year
  }
  
  async function sendReq(obj){
  
    //alert("in send req")
    let newData = await sendPostRequest("/query/postChart", obj);
    
    return newData;
    
  }
  
  let monthData = await sendReq(obj)
  
  return monthData;
}   //end of sendMonthYear


const [visible, setVisible] = useState(false);

return(
    <div>  
      <div className="chart_month">

        <div id="chart_left">
          <div id ="wrap">
            <WaterChart storage={storage}/>
          </div>
          
          <h1></h1>
        </div>
        

        <div id="month_right">
            <p class = "bodyText">
  Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
          <p class = "changeMonth">Change Month:</p>
          
          <button id="wordmonth" onClick={() => {
      setShowMore(!showMore);
    }
          }>
            {wordMonth} {year}
          </button>  

           <div id="calendar">
          {showMore ? <MonthYearPicker
            id="monthYearPicker"
            selectedMonth={month}
            selectedYear={year}
            minYear={2000}
            maxYear={2022}
            
            onChangeYear={(year) => setYear(year)}
            onChangeMonth={(month) => {
              sendMonthYear(month)
                .then(function (data){
                  //alert("data" + data[0].value);
                  setStorage(data);});}}  
          />  : <p></p>}  
         </div> 
        
      
          
        </div>
        
        
      </div>
      
    </div>  
  );
  
}
export default ChartMonth;