import React, { useEffect, useState } from 'react'
import './LineChart.css'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

  const [data, setData] = useState([["Date","Prices"]])

  useEffect(()=>{
    let dataCopy = [["Date","Prices"]];
    if (historicalData.prices){
      historicalData.prices.map((item)=>{
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
      })
      setData(dataCopy);
    }
  },[historicalData])

  const options = {
    colors: ['#1678c9'], // Red line color
    backgroundColor: '#000000', // Black background
    legend: { position: 'side', textStyle: { color: '#727171' } }, // Red legend text
    hAxis: {
      textStyle: { color: '#fff' }, // Red x-axis labels
      titleTextStyle: { color: '#FF0000' }, // Red x-axis title
    },
    vAxis: {
      textStyle: { color: '#fff' }, // Red y-axis labels
      titleTextStyle: { color: '#FF0000' }, // Red y-axis title
    },
    chartArea: {
      backgroundColor: '#000000' // Black chart area background
    },
  };

  return (
    <Chart 
      chartType='LineChart'
      data={data}
      height="100%"
      width="100%"
      options={options}
      legendToggle
    />
  )
}

export default LineChart