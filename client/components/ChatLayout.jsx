import React from 'react'
import { List, Button, Grid, Icon, Segment, Input, Checkbox, Container, Header, Modal, Form, Label, Image, Message, GridColumn } from 'semantic-ui-react'

let inputValue = ''
const recipients = []

export const ChatTemplate = ({ userArray, messageArray, sendMessage }) => {
  const handleChange = event => {
    inputValue = event.target.value
  }

  const handleSend = () => {
    if (inputValue.length > 0) sendMessage(inputValue, recipients)
  }
  
  const handleSelect = event => {
    const userID = event.target
    console.log(userID)
    recipients.push(userID)
  }

  return <>
    <div>
      <Container inverted>
        <Modal trigger={<Button floated="left" animated='vertical' color='violet'>
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
                        <input placeholder='session ID' />
                      </Form.Field>
                      <Button animated='fade' color='violet' fluid >
                        <Button.Content visible>Begin New Adventure Now <Icon name='copy'/></Button.Content>
                        <Button.Content hidden>Copy ID </Button.Content>
                      </Button>
                    </Form>
                  </Grid.Column>
                  <Grid.Column floated="right" width={7} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    <List divided relaxed>
                      {userArray.map(user => {
                        return <>
                            <List.Item>
                              <Grid columns={2} relaxed='very'>
                                <Grid.Column floated="left">
                                  <List.Content>
                                    <List><h3>{user.userName}</h3></List>
                                  </List.Content>
                                </Grid.Column>
                                <Grid.Column floated="right">
                                  <Button color='red' type='Kill'>
                                    <Icon name='close' />
                                      Del</Button>
                                </Grid.Column>
                              </Grid>
                            </List.Item>
                          </>
                      })}
                    </List>
                  </Grid.Column>
                </Grid>
              </Segment>
            </p>
          </Modal.Content>
        </Modal>
        <Segment inverted as={Form}>
          <Grid columns={2} relaxed='very'>
            <Grid.Column floated="left" width={6} style={{ maxHeight: '400px' }}>
              <List divided relaxed>
                {userArray.map(user => {
                  if (!user.isAdmin) return <>
                        <List.Item>
                          <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                              <List.Header as='a'>{user.userName}</List.Header>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                            <div className="ui checkbox">
                              <input userid={user.id} onClick={handleSelect} style={{height: '10px', width: '10px'}}></input>
                            </div>
                            </Grid.Column>
                          </Grid>
                        </List.Item>
                      </>
                })}
              </List>
            </Grid.Column >
            <Grid.Column style={{ maxHeight: '400px', overflowY: 'scroll' }}>
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
      </Container>
    </div>
  </>
}
