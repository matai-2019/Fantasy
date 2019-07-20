import React from 'react'
import { Container, Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <>
    <Container>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>
            Welcome to Dungeon &#38; Dragons
          </Message>
          <Header as='h2' color='teal' textAlign='center'>
            <Icon name='grunt' size='large' verticalAlign='middle' />
            Brace Yourself
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
              <Button color='teal' fluid size='large'onItemCLick={this.handleItemClick}>
                Start New Adventure
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  </>
)

export default LoginForm
