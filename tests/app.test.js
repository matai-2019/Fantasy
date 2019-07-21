import React from 'react'
import { mount } from 'enzyme'

import App from '../client/components/App'
import LoginLayout from '../client/components/LoginLayout'

describe('<LoginLayout /> tests', () => {
  it('jest working', () => {
    expect(true).toBeTruthy()
  })

  it('renders Welcome to Fantasy!!!', () => {
    const expected = 'Welcome to Fantasy!!!'
    const wrapper = mount(<LoginLayout />)
    expect(wrapper.text()).toMatch(expected)
  })

  it('contains the router', () => {
    const wrapper = mount(<App />)
    const routerComponents = wrapper.find('Router').length
    expect(routerComponents).toBe(1)
  })
})

// test('<App />', () => {
//   const expected = 'React development has begun!'
//   const wrapper = mount(<App />)
//   expect(wrapper.text()).toMatch(expected)
// })
