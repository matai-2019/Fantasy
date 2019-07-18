import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export const AdminLayout = () => (
  <Segment>
    <Form>
      <Form.Field>
        <label>Room</label>
        <input placeholder='create room' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
      <Button.Group>
        <Button>delete</Button>
        <Button.Or />
        <Button positive>kickout</Button>
      </Button.Group>
    </Form>
  </Segment>
)
export default AdminLayout
