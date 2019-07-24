import React from 'react'
import { List, Button, Grid, Icon, Segment, Container, Header, Modal, Form, Message } from 'semantic-ui-react'

let inputValue = ''
let recipients = []
let userNames = []

export const ChatTemplate = ({ userArray, messageArray, sendMessage, fullPath, handleKickUser, sessionName, sessionId, sessionAdmin, renderApp, handleResetFirestore }) => {
  const handleChange = event => {
    inputValue = event.target.value
  }
  const handleSend = () => {
    if (inputValue.length > 0) {
      sendMessage(inputValue, recipients)
      inputValue = ''
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
      handleKickUser(userid)
    }
  }

  const secondsToDate = (string) => {
    const date = new Date(Number(string))
    date.setHours(date.getHours())
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
      <Container inverted='true' style={{ minHeight: '80vh', color: 'white', position: 'relative' }}>
        {<h1 style={{ color: 'white' }} align="center">Welcome {sessionName}</h1>}
        <Segment inverted={true} style={{ minHeight: '70vh', maxHeight: '70vh' }}>
          { (sessionAdmin === true) ? <>
        <Modal trigger={<Button style={{ float: 'left' }} animated='vertical' color='teal'>
          <Button.Content hidden>Admin</Button.Content>
          <Button.Content visible>
            <Icon center='true' name='cog' />
          </Button.Content>
        </Button>} closeIcon>
          <Header inverted icon='cogs' content='Admin Settings' />
          <br></br>
          <Modal.Content>
            <Segment inverted={true}>
              <Grid columns={2} relaxed='very'>
                <Grid.Column floated="left" width={7}>
                  <div className="ui action input">
                    <div type="text" onClick={handleAddSession} id='ssIDButton'>
                      {`${fullPath}`}
                      <button className="ui teal right labeled icon button">
                          Copy URL
                      </button>
                    </div>
                  </div>
                  <Form>
                    <Form.Field>
                      <div placeholder='session ID'></div>
                    </Form.Field>
                    <div className="ui action input">
                      <button className="ui red button" type="text" value='Delete Session' onClick={handleResetFirestore} id='ssIDButton'>
                            Delete Users and Chats
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
                                <List><h3 style={{ color: 'white' }}>{user.userName}</h3></List>
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
          </Modal.Content>
        </Modal>
        </>
            : <> </>
          }
          <Grid columns={2} center='true' relaxed='very' style={{ width: '100%', margin: '0px' }}>
            <Grid.Column style={{ width: '25vw', maxWidth: '200px' }}>
              <List divided relaxed>
                {userArray.map(user => {
                  return <List.Item key={user.id}>
                    <Grid columns={2} relaxed='very'>
                      <List.Content style={{ color: 'white' }}>
                        <List.Header className='teal'>
                          <h2 style={{ color: 'white', lineHeight: '60px', width: 'calc(25vw - 30px)', marginRight: '0px', maxWidth: '200px' }}>{user.userName}

                            <div className='ui center teal'id={`${user.id}check`} onClick={handleSelect(user.id)}
                              style={{
                                border: 'none',
                                height: '30px',
                                width: '30px',
                                backgroundColor: '#FFFFFF',
                                float: 'right',
                                marginTop: '15px',
                                marginBottom: '15px' }}>
                            </div>
                          </h2>
                        </List.Header>
                      </List.Content>
                    </Grid>
                  </List.Item>
                })}
              </List>
            </Grid.Column >
            <Grid.Column fluid='true' id={'messageScroller'} style={{ maxWidth: '800px', width: '50vw', padding: '0px', minHeight: '70vh', maxHeight: '70vh', overflowY: 'scroll', position: 'absolute', top: '0px', right: '0px' }}>
              {messageArray.map(message => {
                return <div key={message.timestamp + message.id}>
                  <Segment style={{ padding: '1px', margin: '10px', backgroundColor: 'white' }}>
                    <Message
                      center='true'
                      header={secondsToDate(message.timestamp) + ' | ' + message.userName}
                      content={message.messageText}
                      style={{ fontSize: '1.5em', padding: '5px' }}
                      // onDismiss={(event) => console.log(event.target)}
                    />
                  </Segment>
                </div>
              })}
            </Grid.Column>
          </Grid >
        </Segment>
        <div className="ui left labeled input" style={{ width: '100%' }}>
          {userNames.map(name => {
            return <div key={name} className="ui teal horizontal label">{name}</div>
          })}
          <input id='messageInput' onChange={handleChange} type="text" placeholder="Send a message"/>
          <Button onClick={handleSend}>Send</Button>
        </div>
      </Container>
    </div>
  </>
}
