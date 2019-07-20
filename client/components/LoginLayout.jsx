import React, { Component } from 'react'
import { Container, Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {
    username: ''
  }

  handleChange = (e, { username, value }) => this.setState({ [username]: value })

  handleSubmit = () => this.setState({ username: '' })

  render () {
    const { username } = this.state
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message>
              Welcome to Dungeon &#38; Dragons
            </Message>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon name='grunt' size='large' />
              Brace Yourself
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
              <Segment stacked>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  defaultValue={username}
                  onChange={this.handleChange}
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
}

export default LoginForm
