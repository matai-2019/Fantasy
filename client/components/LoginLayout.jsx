import React from 'react'
import { getAllUsers } from '../../server/firestore/fsdb'
import { Container, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

function LoginForm ({ setUserName, userArray, ssID }) {
  let inputValue = ''

  const handleChange = (evt) => {
    inputValue = evt.target.value
  }

  const handleSubmit = () => {
    document.getElementById('loginHeader').value = 'Logging In'
    getAllUsers(ssID)
      .then(obj => {
        if (userArray.length >= 7) {
          document.getElementById('loginInput').value = ''
          document.getElementById('loginInput').placeholder = 'Room is full!'
        } else if (inputValue.length > 0) {
          document.getElementById('loginInput').value = ''
          setUserName(inputValue)
        } else {
          document.getElementById('loginInput').value = ''
          document.getElementById('loginInput').placeholder = 'Please enter a username'
          document.getElementById('loginInput').focus()
        }
      })
  }
  return (
    <div >
      <Container>
        <Grid textAlign='center' style={{ height: '85vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <div className='ui message inverted'>
              <h2>Welcome to Fantasy</h2>
            </div>
            <Header as='h2' color='teal' textAlign='center'>
            </Header>
            <Form onSubmit={handleSubmit} size='large'>
              <Segment stacked inverted>
                <Form.Input
                  id="loginInput"
                  fluid icon='user'
                  iconPosition='left'
                  defaultValue=''
                  onChange={handleChange}
                  placeholder='Username' />
                <Button id='loginButton' color='teal' fluid size='large' type='submit'>
                  <h3 id='loginHeader'>Start New Adventure</h3>
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

export default LoginForm
