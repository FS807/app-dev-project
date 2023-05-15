// Main App Component

import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import Pokemon from './components/pokemon'
import TeamStats from './components/team-stats'
import { withStyles } from '@material-ui/core'
import { appStyles } from './styles'
import './test.css'

function App(props) {
  const {classes} = props

  const cardTitles = [
    1,
    2,
    'Type Defense',
    3,
    4,
    'Type Coverage',
    5,
    6
  ]

  // 8 Total Cards
  const cards = cardTitles.map((cardTitle, i) => {
    if (typeof cardTitle === 'number') {
      return (
        // 6 Pokemon Cards
        <Grid key={i} item xs={3}>
          <Paper className={classes.paper}>
            <Pokemon teamSlot={cardTitle} />
          </Paper>
        </Grid>
      )
    } else {
      return (
        // 2 more Cards: Type Defense and Type Coverage
        <Grid key={i} item xs={6}>
          <Paper className={classes.paper}>
            <TeamStats title={cardTitle} />
          </Paper>
        </Grid>
      )
    }
  })

  return (
    // All 8 Cards
    <React.Fragment>
      <Grid container spacing={24}>
        {cards}
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(appStyles)(App)