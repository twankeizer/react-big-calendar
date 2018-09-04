import React from 'react'
import { render } from 'react-dom'
import { SlotProvider } from 'react-tackle-box/lib/Slot'
import Layout from 'react-tackle-box/lib/Layout'
import { Helmet } from 'react-helmet'

import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import 'react-big-calendar/lib/less/styles.less'
import './styles.less'
import './prism.less'
import Card from './Card'
import ExampleControlSlot from './ExampleControlSlot'
import Basic from './demos/basic'
import Selectable from './demos/selectable'
import Cultures from './demos/cultures'
import Popup from './demos/popup'
import Rendering from './demos/rendering'
import CustomView from './demos/customView'
import Resource from './demos/resource'
import DndResource from './demos/dndresource'
import Timeslots from './demos/timeslots'
import Dnd from './demos/dnd'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

const globalizeLocalizer = localizer(globalize)

let demoRoot =
  'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

const EXAMPLES = {
  basic: 'Basic Calendar',
  selectable: 'Create events',
  cultures: 'Localization',
  popup: 'Show more via a popup',
  timeslots: 'Custom Time Grids',
  rendering: 'Customized Component Rendering',
  customView: 'Custom Calendar Views',
  resource: 'Resource Scheduling',
  dnd: 'Addon: Drag and drop',
}

class Example extends React.Component {
  constructor(...args) {
    super(...args)

    const hash = (window.location.hash || '').slice(1)

    this.state = {
      selected: EXAMPLES[hash] ? hash : 'basic',
    }
  }

  select = selected => {
    this.setState({ selected })
  }
  render() {
    let selected = this.state.selected
    let Current = {
      basic: Basic,
      selectable: Selectable,
      cultures: Cultures,
      popup: Popup,
      rendering: Rendering,
      customView: CustomView,
      resource: Resource,
      timeslots: Timeslots,
      dnd: Dnd,
      dndresource: DndResource,
    }[selected]

    return (
      <SlotProvider>
        <Helmet>
          <title>Turbo Todo</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </Helmet>
        <div className="app">
          <Card className="examples--header">
            <Layout
              align="center"
              justify="space-between"
              style={{ marginBottom: 15 }}
            >
              <a target="_blank" href={demoRoot + '/' + selected + '.js'}>
                a
              </a>
              <Dropdown className="examples--dropdown" pullRight>
                <Dropdown.Toggle bsStyle="link" className="dropdown--toggle ">
                  {EXAMPLES[selected]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(EXAMPLES).map(([key, title]) => (
                    <MenuItem href={`#${key}`} onClick={() => this.select(key)}>
                      {title}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Layout>
            <ExampleControlSlot.Outlet />
          </Card>
          <div className="example">
            <Current localizer={globalizeLocalizer} />
          </div>
        </div>
      </SlotProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Example />, document.getElementById('app'))
})
