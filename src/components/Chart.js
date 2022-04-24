import {Bar, Line, Pine} from 'react-chartjs-2'

function BarChart() {



  return (
    <div className='chart'>
      <Bar 
        data={{}}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}

export default BarChart;