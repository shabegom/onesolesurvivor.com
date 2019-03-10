const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
    databaseURL: 'https://survivor3-4a563.firebaseio.com/'
}

firebase.initializeApp(config)

const db = firebase.database()

export const fbState = db.ref('/state')

export const setMerged = mergedValue => {
    if (mergedValue === true) {
        db.ref('/state/').update({ 'merged/': true })
    } else if (mergedValue === false) {
        db.ref('/state/').update({ 'merged/': false })
    }
}

export const getRoot = db.ref('/')
export const getCastaways = db.ref('/castaways')
export const getTribals = db.ref('/tribals')
export const getTeams = db.ref('/teams')
export const getState = db.ref('/state')

export const setTribal = points => {
    db.ref('/tribals').once('value', snapshot => {
        let currentData = snapshot.val()
        currentData.map((tribal, i) => {
            if (points.value === tribal.value) {
                db.ref('/tribals/' + i + '/').update(points)
                updateCastaway(points.eliminated)
                return 'sucess'
            }
            return 'failure'
        })
    })
}

export const setTribes = points => {
    if (points.tribes) {
        db.ref('/tribes').update(points.tribes)
    }
}

export const setTeams = points => {
    db.ref('/teams').once('value', snapshot => {
        let currentData = snapshot.val()
        points.teams.map(newTeam => {
            return currentData.map((team, i) => {
                if (newTeam.value === team.value) {
                    let newTotal = team.totalPoints + newTeam.points
                    newTeam.totalPoints = newTotal
                    db.ref('/teams/' + i + '/').update(newTeam)
                    return 'success'
                }
                return 'failure'
            })
        })
    })
}

const updateCastaway = eliminatedCastawayArray => {
    getCastaways.once('value', snapshot => {
        let dbCastaways = snapshot.val() 
        let updatedCastaways = dbCastaways.map(castaway => {
            if (eliminatedCastawayArray.includes(castaway.value)) {
                castaway.eliminated = 'TRUE' 
            }
            return castaway
        })
        db.ref('/castaways/').update(updatedCastaways)
    })
}

export const handleIdolFound = idolHolders => {
    getState.once('value', snapshot => {
        let current = snapshot.val().hasIdol
        if (current) {
            let finalArr = current.concat(idolHolders)
            db.ref('/state/hasIdol/').set(finalArr)
        } else {
            db.ref('/state/hasIdol/').set([idolHolders])
        }
    })
}

//TODO: known bug when someone holds more than 1 idol at a time
const handleIdolAction = (state, idolActions) => {
    console.log('running idol action')
    state.once('value', snapshot => {
        let finalArr = []
        let idolHolders = snapshot.val().hasIdol
        if (idolActions[0]) {
            idolHolders.forEach(holder => {
                idolActions.forEach(action => {
                    if (holder.value !== action.value) {
                        finalArr.push(holder)
                    }
                })
            })
        } else if (idolHolders) {
            finalArr = idolHolders
        }
        db.ref('/state/hasIdol/').set(finalArr)
    })
}
