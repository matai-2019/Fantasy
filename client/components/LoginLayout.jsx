import React from 'react'
import { getAllUsers } from '../../server/firestore/fsdb'
import { Container, Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function LoginForm ({ setUserName, userArray, ssID }) {
  let inputValue = ''

  const handleChange = (evt) => {
    inputValue = evt.target.value
  }

  const handleSubmit = () => {
    getAllUsers(ssID)
      .then(obj => {
        if (userArray.length >= 7) {
          document.getElementById('loginInput').value = ''
          document.getElementById('loginInput').placeholder = 'Room is full!'
        } else {
          document.getElementById('loginInput').value = ''
          setUserName(inputValue)
        }
      })
  }
  return (
        <div >
    <Container>
      <Grid textAlign='center' style={{ height: '85vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 650 }}>
          <Message>
            <h2>Welcome to Dungeons &#38; Dragons</h2>
          </Message>
          <Header as='h2' color='violet' textAlign='center'>
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
              <Button id='loginButton' color='violet' fluid size='large' type='submit'>
                <h3>Start New Adventure</h3>
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
