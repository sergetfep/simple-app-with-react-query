import React from 'react'
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'

const queryClient = new QueryClient()

const Pokemon = () => {
  const queryInfo = useQuery(
    'pokemon',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))

      // if (true) {
      //   throw new Error('Test error!')
      // }

      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data.results)
    }
    // { refetchOnWindowFocus: false }
  )
  console.log(queryInfo)
  // console.log(useQuery)

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
