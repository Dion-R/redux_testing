import "./App.css";
import configureStore from "./store/configureStore";
import { loadBugs, assignBugToUser } from "./store/bugs";
const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

function App() {
  return <h1>Redux</h1>;
}

export default App;
