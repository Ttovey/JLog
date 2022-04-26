function Paginate({ activitiesPerPage, totalActivities, paginate }) {
  console.log(totalActivities)
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalActivities / activitiesPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log(pageNumbers)

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return (
          <li key={number} className='page-item'>
          <a onClick={() => paginate(number)} className="page-link">
            {number}
          </a>
        </li>
        )
        })}
      </ul>
    </nav>
  )

}

export default Paginate;