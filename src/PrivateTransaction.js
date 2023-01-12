import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'

export default function Main(props) {
  const { api } = useSubstrateState()

  useEffect(() => {
    console.log(api)
  }, [])

  return (
    <Grid.Column>
      <h1>Private Transaction</h1>
    </Grid.Column>
  )
}
