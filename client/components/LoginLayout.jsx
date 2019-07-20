import React, { Component } from 'react'
import { Container, Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import AdminLayout from './AdminLayout'

function LoginForm ({ setUserName }) {
  let inputValue = ''

  const handleChange = (evt) => {
    inputValue = evt.target.value
  }

  const handleSubmit = () => {
    setUserName(inputValue)
  }

  return (
    <Container>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>
              Welcome to Dungeons &#38; Dragons
          </Message>
          <Header as='h2' color='teal' textAlign='center'>
            <Icon name='grunt' size='large' />
              Brace Yourself
          </Header>
          <Form onSubmit={handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                defaultValue=''
                onChange={handleChange}
                placeholder='Username' />
              <Button color='teal' fluid size='large' type='submit'>
                  Start New Adventure
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default LoginForm
