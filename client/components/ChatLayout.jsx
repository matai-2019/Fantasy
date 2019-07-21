import React from 'react'
import { List, Button, Divider, Grid, Image, Icon, Segment, Input, Checkbox, Container } from 'semantic-ui-react'

export const ChatTemplate = ({ userArray, messageArray }) => {
  return <>
  { console.log('render', userArray)}
  { console.log(messageArray) }
  <Container>
    <Segment>
      <Grid columns={2} relaxed='very'>
        <Grid.Column floated="left" width={6}>
          <List divided relaxed>
            {this.messageArray.map(user => {
              return <>
                <List.Item>
                  <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                      <List.Icon name='grunt' size='large' verticalAlign='middle' />
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
      </Grid >
    </Segment >
  </Container>
  </>
}

export const ButtonExamplePositive = () => (
  <div>
    <Container>
      <Button positive>Admin Options</Button>
      <Input icon='users' iconPosition='left' placeholder='Your message goes here...' />
    </Container>
  </div>
)
