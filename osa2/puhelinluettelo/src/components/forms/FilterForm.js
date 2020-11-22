import React from 'react'

  const FilterForm = (props) => {
    return (
      <div>
        <form>
          <div>
            filter shown with: <input value={props.filterValue} onChange={props.handleFilterChange}/>
          </div>
        </form>
      </div>
    )
  }

  export default FilterForm