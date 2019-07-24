import React from 'react'
import ReactDOM from 'react-dom'
import { List, Button, Grid, Icon, Segment, Input, Checkbox, Container, Header, Modal, Form, Label, Image, Message, GridColumn } from 'semantic-ui-react'
import { removeUser } from '../../server/firestore/fsdb'

let inputValue = ''
let recipients = []
let userNames = []

export const ChatTemplate = ({ userArray, messageArray, sendMessage, fullPath, handleKickUser, sessionAdmin, renderApp }) => {
  const handleChange = event => {
    inputValue = event.target.value
  }
  const handleSend = () => {
    if (inputValue.length > 0) {
      sendMessage(inputValue, recipients)
      document.getElementById('messageInput').value = ''
      recipients = []
      userNames = []
    } else {
      document.getElementById('messageInput').value = ''
      document.getElementById('messageInput').placeholder = 'Please enter a message'
      document.getElementById('messageInput').focus()
    }
  }
  const handleAddSession = event => {
    const sessionID = document.getElementById('ssIDButton')
    sessionID.select()
    document.execCommand('copy')
  }
  const handleKick = event => {
    return () => {
      const userid = event
      console.log('event', event)
      handleKickUser(userid)
    }
  }
  const secondsToDate = (string) => {
    const date = new Date(Number(string))
    date.setHours(date.getHours() + 12)
    string = date.toString()
    let arr = string.split(' ')[4].split(':')
    arr = arr[0] + ':' + arr[1]
    return arr
  }
  const handleSelect = userid => {
    return () => {
      const userName = userArray.find(user => user.id === userid).userName
      if (recipients.includes(userid)) {
        recipients.splice(recipients.indexOf(userid), 1)
        userNames.splice(userNames.indexOf(userName), 1)
      } else {
        recipients.push(userid)
        userNames.push(userName)
      }
      renderApp()
    }
  }

  return <>
    <div>
      <Container inverted='true'>
        { (sessionAdmin === 'true') ? <>
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
              <Segment inverted={true}>
                <Grid columns={2} relaxed='very'>
                  <Grid.Column floated="left" width={7}>
                    <Form>
                      <Form.Field>
                        <div placeholder='session ID'></div>
                      </Form.Field>
                      <div className="ui action input">
                        <input type="text" value={`${fullPath}`} onClick={handleAddSession} id='ssIDButton'/>
                        <button className="ui teal right labeled icon button">
                          Copy This URL
                        </button>
                      </div>
                    </Form>
                  </Grid.Column>
                  <Grid.Column floated="right" width={7} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    <List divided relaxed>
                      {userArray.map(user => {
                        return <div key={user.id}>
                          <List.Item>
                            <Grid columns={2} relaxed='very'>
                              <Grid.Column floated="left">
                                <List.Content>
                                  <List><h3>{user.userName}</h3></List>
                                </List.Content>
                              </Grid.Column>
                              <Grid.Column floated="right">
                                <button className="ui red button" color='red' type='Kill' onClick={handleKick(user.id)}>
                                  <Icon name='close' />
                                  Del</button>
                              </Grid.Column>
                            </Grid>
                          </List.Item>
                        </div>
                      })}
                    </List>
                  </Grid.Column>
                </Grid>
              </Segment>
            </p>
          </Modal.Content>
        </Modal>
        </>
          : <> </>
        }
        <Segment inverted={true} as={Form}>
          <Grid columns={2} relaxed='very'>
            <Grid.Column floated="left" width={6} style={{ maxHeight: '400px' }}>
              <List divided relaxed>
                {userArray.map(user => {
                  return <div key={user.id}>
                    <List.Item>
                      <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                          <List.Header as='a'><h2>{user.userName}</h2></List.Header>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <div className='ui checkbox'>
                            <button className='ui center checkbox teal' onClick={handleSelect(user.id)} style={{ height: '15px', width: '15px' }}></button>
                          </div>
                        </Grid.Column>
                      </Grid>
                    </List.Item>
                  </div>
                })}
              </List>
            </Grid.Column >
            <Grid.Column style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              <div>
                {messageArray.map(message => {
                  return <div key={message.timestamp + message.id}>
                    <Segment style={{ padding: '5px', margin: '10px' }}>
                      <Message
                        header={secondsToDate(message.timestamp) + ' | ' + message.userName}
                        content={message.messageText}
                        // onDismiss={(event) => console.log(event.target)}
                      />
                    </Segment>
                  </div>
                })}
              </div>
            </Grid.Column>
          </Grid >
        </Segment>
        <div fluid className="ui left labeled input" style={{ width: '100%' }}>
          {/* <div className="ui teal horizontal label"> Anarun </div> */}
          {userNames.map(name => {
            return <div key={name} className="ui teal horizontal label">{name}</div>
          })}
          <input id='messageInput' onChange={handleChange} fluid type="text" placeholder="Send a message"/>
          <Button onClick={handleSend}>Send</Button>
        </div>
        {/* <Input fluid action={<Button onClick={handleSend}>Send</Button>} id="messageInput" placeholder='Your message goes here...' onChange={handleChange} /> */}
      </Container>
    </div>
  </>
}
