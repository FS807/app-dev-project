// This component returns the pokemon sprite (from Pokemon Showdown) when a pokemon is selected

import React from 'react'
import { observer } from 'mobx-react'
import store from '../../store'
import { withStyles } from '@material-ui/core/styles'
import { pokemonGridItemStyles } from '../../styles'

@observer
class Sprite extends React.Component {
  render() {
    const {classes, teamSlot} = this.props
    const pokemon = store.pokemon[teamSlot - 1].name

    let spriteFilename = pokemon // pokemon sprite file name

    if (pokemon) {
      if (store.form(pokemon)) { // if the pokemon has an alternate form, have to modify spriteFilename 

        const spriteFilenamePart1 = store.baseSpecies(pokemon).toLowerCase()
        const spriteFilenamePart2 = store.form(pokemon)
          .toLowerCase()
          .replace('-', '')
        spriteFilename = `${spriteFilenamePart1}-${spriteFilenamePart2}` // modified name: pokemonName-formName
      }
    }

    return (
      <div className={`${classes.gridItem} ${classes.sprite}`}>
        {spriteFilename ? 
          <img 
            alt={spriteFilename}
            src={`https://play.pokemonshowdown.com/sprites/xyani/${spriteFilename}.gif`}
            style={{maxHeight: '100%', maxWidth: '100%'}} // keep the image contained in div box
          /> : []}
      </div>
    )
  }
}

export default withStyles(pokemonGridItemStyles)(Sprite)