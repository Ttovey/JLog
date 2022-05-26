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

      console.log(props.workout)
      props.data.forEach((workout) => {
        let workingLoad = 0
        workout.sets.forEach((set) => {
          if (set.name == props.workout) {
            workingLoad += set.count * set.reps * set.weight
          }
        })
        console.log(workout)
        console.log('working Load')
        console.log(workingLoad)
        if (workingLoad > 0) {
          data.labels.push(workout.date.slice(0, 10))
          exercise.data.push(workingLoad)
          
        }
      })
      data.datasets.push(exercise)
    }
    
    return data
  }

  return (
    <div className='chart mt-1'>
      {props.workout && <Line data={createLineChartData()} options={{
          maintainAspectRatio: false
        }}/>}
    </div>
  )
}

export default LineChart;