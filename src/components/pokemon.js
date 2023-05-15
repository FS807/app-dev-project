// This component contains 8 items about each pokemon: Name, Item, 4 Moves, Ability, and Sprite

import React from 'react'
import PokemonInput from './pokemon/pokemon-input'
import Sprite from './pokemon/sprite'
import { withStyles } from '@material-ui/core/styles'
import { pokemonStyles } from '../styles'

function Pokemon(props) {
  const {classes} = props

  const placeholders = [
    'Name',
    'Move',
    '',
    'Move',
    'Move',
    'Move',
    'Item',
    'Ability',
  ]

  let counter = 1

  const pokemonInputs = placeholders.map((placeholder, i) => {
    if (placeholder) {
      let pokemonProp = placeholder.toLowerCase()
      if (placeholder === 'Move') {
        pokemonProp += counter
        counter++
      }
      return (
      <PokemonInput 
        key={i} 
        placeholder={placeholder} 
        teamSlot={props.teamSlot} 
        pokemonProp={pokemonProp}
      />
    )
    } else {
      return (
        <Sprite key={i} teamSlot={props.teamSlot} />
      )
    }
  })

  return (
    <div className={classes.gridContainer}>
      {pokemonInputs}
    </div>
  )
}

export default withStyles(pokemonStyles)(Pokemon)