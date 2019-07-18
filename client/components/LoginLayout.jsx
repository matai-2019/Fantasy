import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Brace Yourself
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Button color='teal' fluid size='large'>
            Start New Adventure
          </Button>
        </Segment>
      </Form>
      <Message>
        Welcome to Dungeon &#38; Dragos
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm
