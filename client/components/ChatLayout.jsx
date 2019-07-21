import React from 'react'
import { List, Button, Popup, Divider, Grid, Image, Icon, Segment, Input, Checkbox, Container, Header } from 'semantic-ui-react'

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
      <Button floated='left' positive>Admin Options</Button>
      <div floated='right'>
        <Input type='text' id="messageInput" placeholder='Your message goes here...' onChange={handleChange} />
        <Button type='submit' onClick={handleSend}>Send</Button>
      </div>
    </Segment.Group>
  </Container>
  </>
}
