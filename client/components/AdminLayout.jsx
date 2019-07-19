import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, List } from 'semantic-ui-react'

export const AdminLayout = () => (
  <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column floated="left" width={6}>
    <Form>
      <Form.Field>
        <label>Dungeon Name</label>
        <input placeholder='session ID' />
      </Form.Field>
      <Button type='submit'>Copy Session ID</Button>
      </Form>
      </Grid.Column>
    </Grid>
    <Grid.Column floated="right" width={4}>
      <Grid.Column>
      <List.Icon name='grunt' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>User-1</List.Header>
                  <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
      <Button.Group>
        <Button negative>Kill</Button>
      </Button.Group>
      </Grid.Column>
    </Grid.Column>
  </Segment>
)
export default AdminLayout
