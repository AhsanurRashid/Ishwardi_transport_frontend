import React from 'react'

const DataFetchingFailed = ({error}: {error: string}) => {
  return (
    <div className='text-red-500 text-sm font-light animate-pulse'>
      {error}
    </div>
  )
}

export default DataFetchingFailed
