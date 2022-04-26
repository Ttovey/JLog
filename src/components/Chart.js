import { useState, useEffect } from 'react'
import JLogAPI from '../api/JLogAPI'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar, Line } from 'react-chartjs-2'

function BarChart(props) {

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  const createSubChartData = () => {
    const labels = []
    const data = {
      labels: labels,
      datasets:[{
        label: 'Submission Data',
        data: [],
        backgroundColor: [],
        borderWidth: 1
      }]
    }
  
    const subs = {}
    for (let i = 0; i < props.jiuJitsu.length; i++) {
      for(let sub of props.jiuJitsu[i].submissions) {
        if(sub.name in subs){
          subs[sub.name] += sub.count
        } else {
          subs[sub.name] = sub.count
        }
      }
    }
    for (let sub of Object.entries(subs)) {
      data.labels.push(sub[0])
      data.datasets[0].data.push(sub[1])
      data.datasets[0].backgroundColor.push(getRandomColor())
    }

  return data
  }

  return (
    <div className='chart mt-1'>
      {
        props.jiuJitsu &&
        <Bar 
        data={createSubChartData()}
        options={{
          maintainAspectRatio: false
        }}
      />
      }
    </div>
  )
}

export default BarChart;