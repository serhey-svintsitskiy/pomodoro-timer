import './App.css';

import Tasks from "./components/Tasks";
import Timer from "./components/Timer";

function App() {

    return (
            <div>
                    <div className="">
                        <Timer/>
                        <Tasks/>
                    </div>
            </div>
    );
}

export default App;


