import React, { Component } from 'react'
import { Container, Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import AdminLayout from './AdminLayout'

function LoginForm ({ setUserName, userArray }) {
  let inputValue = ''

  const handleChange = (evt) => {
    inputValue = evt.target.value
  }

  const handleSubmit = () => {
    if (userArray.length >= 7) {
      // thou shout not pass
      document.getElementById('loginInput').value = 'you shall not pass'
    } else setUserName(inputValue)
  }

  return (
    <Container>
      <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 650 }}>
          <Message>
            <h2>Welcome to Dungeons &#38; Dragons</h2>
          </Message>
          <Header as='h2' color='violet' textAlign='center'>

            <h1>Brace Yourself <Icon name='grunt' size='large' /></h1>
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
  )
}

export default LoginForm
