import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function LineChart(props) {

  console.log(props.data)

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // helper func for creating line chart data
  const checkDatasetLabels = (data, label) => {
    for(let i = 0; i < data.length; i++) {
      if (data[i].label === 'label') {
        return true
      }
    }
    return false
  }

  const createLineChartData = () => {
    const data = {
      labels: [],
      datasets: []
    }
    
    props.data.forEach((training) => {
      data.labels.push(training.date.slice(0, 10))
      const setDic = {}
      training.sets.forEach((set) => {
        if (set.name in setDic) {
          setDic[set.name] += set.count * set.reps * set.weight
        } else {
          setDic[set.name] = set.count * set.reps * set.weight
        }
      })
      // insert helper func here to build datasets
    })
  }

  createLineChartData()

  return (
    <div>

    </div>
  )
}

export default LineChart;