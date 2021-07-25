

import SelectDropdown from './Select';
import Range from './Range';
import FilterTable from './FilterTable';
import './AgentTable.css';

const AgentTable = () => {
  return (
    <>
    <div className="container">
      <div className="title">Apply Both Filter to see the Agent List.</div>
      <div className="filterContainer">
        
          <div className="selectUser">
            <div className="text"><span>Select List Of Agents</span>
            </div>
            <SelectDropdown />
          </div>
      <div>
        <div className="text"><span>Select Duration Range</span>
        </div>
          <Range />
        </div>
      </div>
      <FilterTable />
    </div>
    </>
  )
}

export default AgentTable;