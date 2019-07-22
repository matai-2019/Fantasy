import React from 'react'
import { List, Button, Popup, Divider, Grid, Image, Icon, Segment, Input, Checkbox, Container, Header, Modal, Form } from 'semantic-ui-react'

let inputValue = ''

export const ChatTemplate = ({ userArray, messageArray, socket, renderProp }) => {
  socket.on('pull-user', () => {
    renderProp = renderProp !== true
  })

  const handleChange = event => {
    inputValue = event.target.value
  }

  const handleSend = () => {
    console.log(inputValue)
  }

  return <>
  { console.log('render', userArray)}
  { console.log(messageArray) }
  <Container>
    <div>
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
                      <Segment compact>
                        <Checkbox />
                      </Segment>
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
              return <>
                <List.Item>
                  <List.Content>
                    <List.Header>{message.userName}</List.Header>
                    <List.Description>{message.message}</List.Description>
                  </List.Content>
                </List.Item>
              </>
            })}
          </List>
        </Grid.Column>
      </Grid >
    </div >
    <Segment.Group horizontal>
      <Modal trigger={<Button color='blue'>Admin Modal</Button>} closeIcon>
        <Header icon='cogs' content='Admin Settings' />
        <Modal.Content>
          <p>
            <Segment>
              <Grid columns={2} relaxed='very'>
                <Grid.Column floated="left" width={6}>
                  <Form>
                    <Form.Field>
                      <label>Dungeon Name</label>
                      <input placeholder='session ID' />
                    </Form.Field>
                    <Button color='green'>
                      <Icon name='key' /> New Room
                    </Button>
                    <Button color='red'>
                      <Icon name='copy' /> Copy ID
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
    </Segment.Group>
  </Container>
  <Input fluid action='Send' id="messageInput" placeholder='Your message goes here...' onChange={handleChange} />
  {/* <Button floated='right' type='submit' onClick={handleSend}>Send</Button> */}
    </>
}
