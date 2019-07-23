import React from 'react'
import ReactDOM from 'react-dom'
import { List, Button, Grid, Icon, Segment, Input, Checkbox, Container, Header, Modal, Form, Label, Image, Message } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

let inputValue = ''

export const ChatTemplate = ({ userArray, messageArray, sendMessage }) => {
  const handleChange = event => {
    inputValue = event.target.value
  }

  const handleSend = () => {
    if (inputValue.length > 0) sendMessage(inputValue)
    else {

    }
  }

  return <>
    <div>
      <Container inverted>
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
              <Segment inverted>
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
              User-1<Button color='red' type='Kill' onClick={handleSend}>
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
        <Segment inverted as={Form}>
          <Grid columns={2} relaxed='very'>
            <Grid.Column floated="left" width={6}>
              <List divided relaxed>
                {userArray.map(user => {
                  return <>
                <List.Item>
                  <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                      <List.Content>
                        <List.Header as='a'><h2>{user.userName}</h2></List.Header>
                      </List.Content>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                      <Checkbox />
                    </Grid.Column>
                  </Grid>
                </List.Item>
              </>
                })}
              </List>
            </Grid.Column >
            <Grid.Column style={{ maxHeight: '850px', overflowY: 'scroll' }}>
              <div >
                {messageArray.map(message => {
                  return <div key={message.timestamp + message.id}>
                    <Segment.Group horizontal>
                      <Segment compact>{message.userName}</Segment>
                      <Segment compact>{message.messageText}</Segment>
                    </Segment.Group>
                  </div>
                })}
              </div>
            </Grid.Column>
          </Grid >
        </Segment>

        <Input fluid action={<Button onClick={handleSend}>Send</Button>} id="messageInput" placeholder='Your message goes here...' onChange={handleChange}/>
        {/* <Button floated='right' type='submit' onClick={handleSend}>Send</Button> */}
      </Container>
      <br></br>
    </div >
    </>
}
