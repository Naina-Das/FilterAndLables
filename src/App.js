import "./styles.css";
import CallList from "./CallList";
import AgentTable from './AgentTable';
export default function App() {
  return (
    <div className="App">
      <h1>Prodigal Technologies React Assignment</h1>
      <AgentTable/>
      <CallList />
    </div>
  );
}
