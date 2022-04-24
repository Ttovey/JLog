import BarChart from "../components/Chart";

function DashBoard(props) {
  return (
    <div>
      <p>Welcome { props.username }</p>
      <BarChart />
    </div>
  )
}

export default DashBoard;