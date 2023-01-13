import React, { useState } from 'react'
import { Button, Container, Grid, Input } from 'semantic-ui-react'

export default function Main(props) {
  const [commitment, setCommitment] = useState(null)
  const [secret, setSecret] = useState(null)
  const [secretValue, setSecretValue] = useState('')
  const [hashedNullifier, setHashedNullifier] = useState(null)
  const [proof, setProof] = useState(null)
  const [depositLoading, setDepositLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generateCommitment() {
    setDepositLoading(true)
    setSecret(null)
    setCommitment(null)
    setHashedNullifier(null)
    setProof(null)
    const response = await fetch('http://127.0.0.1:8080/commitment', {
      method: 'POST',
    })
    const json = await response.json()
    setDepositLoading(false)
    setCommitment(json.commitment)
    setSecret(json.secret)
  }

  async function createProof() {
    setError(null)
    setWithdrawLoading(true)
    const req = { secret: secretValue.toLowerCase() }

    try {
      const response = await fetch('http://127.0.0.1:8080/proof', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(req),
      })
      const json = await response.json()
      console.log(json)
      setHashedNullifier(json.nullifier)
      setProof(json.proof)
    } catch (error) {
      console.log(error)
      setError('Your secret is not correct')
    }
    setWithdrawLoading(false)
  }

  return (
    <>
      <Grid.Column width={8}>
        <Button
          loading={depositLoading}
          fluid
          color="blue"
          onClick={generateCommitment}
        >
          Create Commitment
        </Button>
        <Container>
          {secret && (
            <div style={{ wordWrap: 'break-word' }}>
              <h3>Secret</h3>
              {secret.toUpperCase()}
            </div>
          )}
          {commitment && (
            <div style={{ wordWrap: 'break-word' }}>
              <h3>Commitment</h3> {commitment}
            </div>
          )}
        </Container>
      </Grid.Column>
      <Grid.Column width={8}>
        <Button
          loading={withdrawLoading}
          fluid
          color="red"
          onClick={createProof}
        >
          Create Proof
        </Button>
        <Input
          fluid
          type="text"
          label="secret"
          onChange={e => setSecretValue(e.target.value)}
        />
        <Container>
          {hashedNullifier && (
            <div style={{ wordWrap: 'break-word' }}>
              <h3>Hashed Nullifier:</h3>
              {hashedNullifier}
            </div>
          )}
          {proof && (
            <div style={{ wordWrap: 'break-word' }}>
              <h3>Proof:</h3>
              {proof}
            </div>
          )}

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Container>
      </Grid.Column>
    </>
  )
}
