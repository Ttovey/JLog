import { useState, useEffect } from 'react'
import JLogAPI from '../api/JLogAPI'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar, Line } from 'react-chartjs-2'

function BarChart() {

  const [jiuJitsu, setJiuJitsu] = useState(null)

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      setJiuJitsu(data)
    }
  }

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
        // borderColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(255, 159, 64)',
        //   'rgb(255, 205, 86)',
        //   'rgb(75, 192, 192)',
        //   'rgb(54, 162, 235)',
        //   'rgb(153, 102, 255)',
        //   'rgb(201, 203, 207)'
        // ],
        borderWidth: 1
      }]
    }
  
    const subs = {}
    for (let i = 0; i < jiuJitsu.length; i++) {
      for(let sub of jiuJitsu[i].submissions) {
        if(sub.name in subs){
          subs[sub.name] += sub.count
        } else {
          subs[sub.name] = sub.count
        }
      }
    }
    for (let sub of Object.entries(subs)) {
      console.log(sub)
      data.labels.push(sub[0])
      data.datasets[0].data.push(sub[1])
      data.datasets[0].backgroundColor.push(getRandomColor())
    }

  return data
  }

  return (
    <div className='chart'>
      {
        jiuJitsu &&
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