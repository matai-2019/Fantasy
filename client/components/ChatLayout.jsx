import React from 'react'
import { List, Button, Grid, Icon, Segment, Input, Checkbox, Container, Header, Modal, Form, Label, Image } from 'semantic-ui-react'

let inputValue = ''
let recipients = ''

export const ChatTemplate = ({ userArray, messageArray, sendMessage }) => {
  const handleChange = event => {
    inputValue = event.target.value
  }

  const handleSend = () => {
    sendMessage(inputValue, recipients)
  }

  const handleSelect = event => {
    event.target
  }

  return <>
  <Container>
    <div>
      <Modal trigger={<Button floated="right" animated='vertical' color='violet'>
        <Button.Content hidden>Admin</Button.Content>
        <Button.Content visible>
          <Icon name='cog' />
        </Button.Content>
      </Button>} closeIcon>
        <Header icon='cogs' content='Admin Settings' />
        <br></br>
        <Modal.Content>
          <p>
            <Segment>
              <Grid columns={2} relaxed='very'>
                <Grid.Column floated="left" width={7}>
                  <Form>
                    <Form.Field>
                      <label>Dungeon Name</label>
                      <input placeholder='session ID' />
                    </Form.Field>
                    <Button animated='fade' color='violet' fluid >
                      <Button.Content visible>Begin New Adventure Now <Icon name='copy'/></Button.Content>
                      <Button.Content hidden>Copy ID </Button.Content>
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-1 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-2 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-3 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-4 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-5 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                  <List divided relaxed>
                    <Grid relaxed='very'>
                      <Grid.Column horizontal floated="right" width={8}>
              User-6 <Button color='red' type='Kill' onClick={handleSend}>
                          <Icon name='close' />
                Del</Button>
                      </Grid.Column>
                    </Grid>
                  </List>
                </Grid.Column>
              </Grid>
            </Segment>
          </p>
        </Modal.Content>
      </Modal>
      <Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column floated="left" width={6}>
            <List divided relaxed>
              {userArray.map(user => {
                return <>
                <List.Item>
                  <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                      <List.Content>
                        <List.Header as='a'>{user.userName}</List.Header>
                      </List.Content>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                      <div className="ui checkbox">
                       <input onClick={handleSelect} userid={user.id}/>
                      </div>
                    </Grid.Column>
                  </Grid>
                </List.Item>
              </>
              })}
            </List>
          </Grid.Column >
          <Grid.Column>
            <List divided relaxed>
              {messageArray.map(message => {
                return <div key={message.timestamp+message.id}>
                  <Segment.Group horizontal>
                    <Segment compact>{message.userName}</Segment>
                    <Segment compact>{message.messageText}</Segment>
                  </Segment.Group>
                </div>
              })}
            </List>
          </Grid.Column>
        </Grid >
      </Segment>
    </div >

    <Input fluid action={<Button onClick={handleSend}>Send</Button>} id="messageInput" placeholder='Your message goes here...' onChange={handleChange}/>
    {/* <Button floated='right' type='submit' onClick={handleSend}>Send</Button> */}
  </Container>
  <br></br>
    </>
}
