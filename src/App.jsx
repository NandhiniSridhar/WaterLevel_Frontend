//yeehaw
import React, {useState} from 'react';
import './App.css';
//import {SendGetRequest} from './ajax.jsx';

import ChartMonth from './chartMonth.jsx';

function App() {

  const [showMore, setShowMore] = useState(false);

  async function chartGetReq(){
    alert("in char get res")
    let res = await sendGetRequest("/query/getChart");
    alert("got res");
  }
  
  return (
    <html>
        <main>
        <div class ="header">
        <h1 id="title">Water storage in California reservoirs</h1>
  </div>
        <div id="container">
        <div id="left">  
          <p class = "bodyText">
          California's reservoirs are part of a <a className="link" href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p><p class = "bodyText">
        California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
          </p>
          <button id="btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </button>  
        </div>
  
        <div id="right_side">
           <div class = "picWrap">
  <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
  "/>
          </div>
   <p class= "caption">
  Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
            </p>

         
        
          
      </div>  
        
   
        </div>
         <div id="chartContainer">
          {showMore ? <ChartMonth/> : <p></p>}  
         </div> 
         
      </main>
    </html>


    
    
  );
}



export default App;

