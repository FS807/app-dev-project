// This component returns the text field from integration-react-select.js

import React from 'react'
import { observer } from 'mobx-react'
import store from '../../store'
import IntegrationReactSelect from './pokemon-input/integration-react-select'
import { withStyles } from '@material-ui/core/styles'
import { pokemonGridItemStyles } from '../../styles'

@observer
class PokemonInput extends React.Component {
  constructor(props) {
    super(props)
    this.i = this.props.teamSlot - 1
  }

  handleChange = inputVal => {
    store.pokemon[this.i][this.props.pokemonProp] = inputVal
  }

  render() {
    const {pokemonProp} = this.props

    let optionValues = []
    let optionLabels = []

    switch(pokemonProp) {
      case 'name':
        optionValues = store.allPokemon
        optionLabels = store.allPokemonNames
        break
      case 'item':
        optionValues = store.battleItems
        break
      case 'ability':
        optionValues = store.abilities[this.i]
        break
      default: // for the moves
        optionValues = store.learnsets[this.i]
    }

    if (optionValues === undefined) { 
      optionValues = []
    }

    if (!optionLabels.length) { // if empty
      optionLabels = optionValues
    }

    return (
      <IntegrationReactSelect
        placeholder={this.props.placeholder}
        className={this.props.classes.gridItem}
        optionValues={optionValues}
        optionLabels={optionLabels}
        onChange={this.handleChange}
        value={store.pokemon[this.i][pokemonProp]}
      />
    )
  }
}

export default withStyles(pokemonGridItemStyles)(PokemonInput)