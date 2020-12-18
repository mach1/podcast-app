import * as React from 'react'

export const App = () => {
  const [search, setSearch] = React.useState('')
  const [result, setResult] = React.useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = async () => {
    const response = await fetch('/search?term=' + encodeURIComponent(search))
    const json = await response.json()
    setResult(JSON.stringify(json))
  }

  return (
    <div>
      <input type="text" placeholder="Search" onChange={onChange} />
      <button onClick={onClickSearch}>Search</button>
      <pre>
        <code>{result}</code>
      </pre>
    </div>
  )
}