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

  const createLineChartData = () => {
    const data = {
      labels: [],
      datasets: []
    }

    if (props.workout) {
      const exercise = {}
      exercise.data = []
      exercise.label = props.workout
      exercise.borderColor = getRandomColor()
      exercise.fill = false
      datasets.push(exercise)

      props.data.forEach(())
    }

    console.log(props.data)
    console.log(props.workout)

    return data
  }

  createLineChartData()

  return (
    <div>
      {/* <Line data={createLineChartData()}/> */}
    </div>
  )
}

export default LineChart;