import React from 'react'
import { List, Button, Divider, Grid, Image, Segment, Input } from 'semantic-ui-react'

export const ChatTemplate = () => (
  <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
        <List divided relaxed>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
              <List.Description as='a'>Updated 10 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
              <List.Description as='a'>Updated 22 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Column>
      <Grid.Column>
        <List>
          <List.Item>
            <List.Icon name='grunt' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid>
    <Divider vertical>+</Divider>
  </Segment>
)
export const ButtonExamplePositive = () => (
  <div>
    <Button positive>Whisper</Button>
    <Input icon='users' iconPosition='left' placeholder='Your message goes here...' />
  </div>
)
