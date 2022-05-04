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
    
    const datasetLabels = []

    props.data.forEach((training) => {
      const setData = {}
      training.sets.forEach((set) => {
        if (!datasetLabels.includes(set.name)) {
          datasetLabels.push(set.name)
        }
        if (set.name in setData) {
          setData[set.name] += set.count * set.reps * set.weight
        } else {
          setData[set.name] = set.count * set.reps * set.weight
        }
      })
      console.log(setData)
    })

  }

  createLineChartData()

  return (
    <div>
      {/* <Line data={createLineChartData()}/> */}
    </div>
  )
}

export default LineChart;