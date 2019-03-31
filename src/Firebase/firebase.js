import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  /* Sign In to Admin */

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  /* Database Getters */
  getRoot = this.db.ref("/");
  getCastaways = this.db.ref("/castaways");
  getCastaway = num => this.db.ref(`/castaways/${num}`);
  getTribals = this.db.ref("/tribals");
  getTribal = tribal => this.db.ref(`/tribals/${tribal}`);
  getTeams = this.db.ref("/teams");
  getTeam = team => this.db.ref(`/teams/${team}`);
  getTribes = this.db.ref("/tribes");
  getState = this.db.ref("/state");
  /* Database  setters  */

  setCastaways = updatedCastaways => this.getCastaways.update(updatedCastaways);
  setTribal = points => this.getTribal(points.value).update(points);
  setMerged = isMerged => this.getState.update({ "/merged/": isMerged });
  setIdols = updatedIdols =>
    this.getState.update({ "/hasIdol/": updatedIdols });
  setTeams = teams => this.getTeams.update(teams);
  setTribes = tribes => this.getTribes.update(tribes);
}
export default Firebase;
