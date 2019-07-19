import React from 'react'
import { List, Button, Divider, Grid, Image, Icon, Segment, Input, Checkbox } from 'semantic-ui-react'

export const ChatTemplate = () => (
  <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
        <List divided relaxed>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-1</List.Header>
                  <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-2</List.Header>
                  <List.Description as='a'>Updated 22 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-3</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-4</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-5</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-6</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item >
        </List >
      </Grid.Column >
      <Grid.Column>
        <List>
          <List.Item>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Dummy-User</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Segment compact>
                  <Checkbox />
                </Segment>
              </Grid.Column>
            </Grid>
          </List.Item>
        </List>
      </Grid.Column >
    </Grid >
    <Divider vertical>+</Divider>
  </Segment >
)
export const ButtonExamplePositive = () => (
  <div>
    <Button positive>Admin Options</Button>
    <Input icon='users' iconPosition='left' placeholder='Your message goes here...' />
  </div>
)
