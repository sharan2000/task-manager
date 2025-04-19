import { Link } from "react-router"

const getPaginationData = (totalPages, currentPage) => {
  let currentThree = []
  if(currentPage !== 1) currentThree.push(currentPage - 1)
  currentThree.push(currentPage)
  if(currentPage !== totalPages) currentThree.push(currentPage + 1)

  let paginationEdges = {}
  let ellipsis = {}
  if(currentThree.at(0) !== 1) {
    paginationEdges.left = 1
    if (currentThree.at(0) - paginationEdges.left > 1) ellipsis.left = true
  }
  if(currentThree.at(-1) !== totalPages) {
    paginationEdges.right = totalPages
    if (totalPages - currentThree.at(-1) > 1) ellipsis.right = true
  }

  return {
    currentThree,
    paginationEdges,
    ellipsis
  }
}


const PaginationBar = ({totalPages, page}) => {

  let { currentThree, paginationEdges, ellipsis } = getPaginationData(totalPages, page)

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        { 
          page !== 1 ? 
          <li className="page-item">
            <Link className="page-link" to={`/tasks?page=${page-1}`}>
              Previous
            </Link>
          </li> 
          :
          <li className="page-item">
            <span className="page-link">
              Previous
            </span>
          </li> 
        }

        { 
          paginationEdges.left ? 
          <li className="page-item">
            <Link className="page-link" to={`/tasks?page=${paginationEdges.left}`}>
              {paginationEdges.left}
            </Link>
          </li> 
          : "" 
        }

        { ellipsis.left ? <li className="page-item"><span className="page-link">...</span></li> : ""}
        
        {
          currentThree.map(pageNumber => 
            <li key={pageNumber} className="page-item">
              <Link className="page-link" to={`/tasks?page=${pageNumber}`}>
                {pageNumber}
              </Link>
            </li>
          )
        }

        { ellipsis.right ? <li className="page-item"><span className="page-link">...</span></li> : ""}

        { 
          paginationEdges.right ? 
          <li className="page-item">
            <Link className="page-link" to={`/tasks?page=${paginationEdges.right}`}>
              {paginationEdges.right}
            </Link>
          </li> 
          : "" 
        }


        { 
          page !== totalPages ? 
          <li className="page-item">
            <Link className="page-link" to={`/tasks?page=${page+1}`}>
              Next
            </Link>
          </li> 
          :
          <li className="page-item">
            <span className="page-link">
              Next
            </span>
          </li> 
        }
      </ul>
    </nav>
  )

}


export default PaginationBar