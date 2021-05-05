import React from 'react'
import { Tab } from 'semantic-ui-react';
import UserGrid from '../users/user-grid';
import EditableTable from '../../tables/editableTable';

const panes = [
  { menuItem: 'User Table', render: () => <Tab.Pane><UserGrid /></Tab.Pane> },
  { menuItem: 'Editable Table', render: () => <Tab.Pane><EditableTable /></Tab.Pane> }
]

const Tabs = () => <Tab panes={panes} />

export default Tabs;
