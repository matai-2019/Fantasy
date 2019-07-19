import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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
      <Button.Group>
        <Button>delete</Button>
        <Button.Or />
        <Button positive>kickout</Button>
      </Button.Group>
      </Grid.Column>
    </Grid.Column>
  </Segment>
)
export default AdminLayout
