// This component contains all the data of the pokemon

import { observable, computed } from 'mobx'
import pokedexData from './data/pokedex'
import itemsData from './data/items'
import miniLearnsets from './data/learnsets.min'
import typechart from './data/typechart'
import moves from './data/moves'

const initialCoverage = { // refers to a team that has no weakneses/resistances
  Bug: 0,
  Dark: 0,
  Dragon: 0,
  Electric: 0,
  Fairy: 0,
  Fighting: 0,
  Fire: 0,
  Flying: 0,
  Ghost: 0,
  Grass: 0,
  Ground: 0,
  Ice: 0,
  Normal: 0,
  Poison: 0,
  Psychic: 0,
  Rock: 0,
  Steel: 0,
  Water: 0,
}

class Store {
  /* Pokemon Team Data */
  @observable pokemon = Array(6).fill({
    name: '',
    item: '',
    move1: '',
    move2: '',
    move3: '',
    move4: '',
    ability: '',
  })

  /* Pokedex Info */
  @observable pokedex = {...pokedexData} // copy pokedex data from ./data/pokedex.js

  @computed get allPokemon() {
    return Object.keys(this.pokedex)
  }

  @computed get allPokemonNames() {
    return this.allPokemon.map(pokemon => this.pokedex[pokemon].species) // species = name of Pokemon
  }

  /* ABILITIES */
  @computed get abilities() {
    let abilities = [] // will contain the abilities of the pokemon team
    
    for (const pkmn of this.pokemon) {
      if (pkmn.name) {
        const pkmnAbilities = this.pokedex[pkmn.name].abilities // the specific pokemon's ability as an object
        const pkmnAbilitiesArray = Object.values(pkmnAbilities) // the specific pokemon's ability as an array
        abilities.push(pkmnAbilitiesArray)
      } else {
        abilities.push([])
      }
    }

    return abilities
  }

  baseSpecies(pokemon) {
    return store.pokedex[pokemon].baseSpecies // returns name of pokemon
  }

  form(pokemon) {
    return store.pokedex[pokemon].form // returns name of a pokemon's form
  }

  /* ITEMS */
  @observable items = Object.values(itemsData).map(item => item.name)

  /* LEARNSETS */
  @computed get learnsets() {
    let learnsets = [] // contains the learnsets of the pokemon team

    for (const pkmn of this.pokemon) {
      if (pkmn.name) {
        const learnset = miniLearnsets[pkmn.name] // the specific pokemon's learnset
        learnsets.push(learnset)
      } else {
        learnsets.push([])
      }
    }
    
    return learnsets
  }

  @computed get types() { // get the types of the pokemon team
    let types = []

    for (const pkmn of this.pokemon) {
      if (pkmn.name) {
        const pkmnTypes = this.pokedex[pkmn.name].types // pkmnTypes = the specific pokemon's type(s)
        types.push(pkmnTypes)
      } else {
        types.push([])
      }
    }

    return types
  }

  /* TYPE DEFENSE FUNCTION */
  @computed get typeDefense() {
    let typeDefense = {...initialCoverage}

    if (this.types.some(arr => arr.length)) { // is 2D array empty or not
      for (const pkmnTypes of this.types) {
        for(const pkmnType of pkmnTypes) { // get one of the types (in case the pokemon is dual-typed)
          const dmgTaken = typechart[pkmnType] // pkmnType vs. pkmnTypes: former refers to one type only
          
          let updatedtypeDefense = {}
          
          Object.keys(typeDefense).map(type => ( // type refers to a pokemon type, not of a specific pokemon
            updatedtypeDefense[type] = typeDefense[type] + dmgTaken[type]
          ))
          typeDefense = updatedtypeDefense
        }
      }
    }

    return typeDefense
  }

  /* TYPE COVERAGE FUNCTION */
  @computed get typeCoverage() {
    let typeCoverage = {...initialCoverage}

    for (const pokemon of this.pokemon) {
      for(const prop in pokemon) {
        // if it is a non-empty move
        if (pokemon[prop] && prop.slice(0, -1) === 'move') { // slice() removes the last letter
          const move = moves[pokemon[prop]]
          const dmgDealt = typechart[move.type]

          let updatedTypeCoverage = {}

          Object.keys(typeCoverage).map(type => (
            updatedTypeCoverage[type] = typeCoverage[type] - dmgDealt[type]
          ))

          typeCoverage = updatedTypeCoverage
        }
      }
    }

    return typeCoverage
  }
}

// FOR DEBUGGING
let store = window.store = new Store()

export default store
