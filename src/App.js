import { useRef, useState, useCallback, useEffect } from "react";
import "./App.css";

const defaultCheckpoints = [0, 100, 200, 300, 400, 500];
const defaultColors = [
 "green",
 "red",
 "yellow",
 "pink",
 "orange",
 "purple",
 "aqua",
 "darkgreen",
 "darkred",
 "darkblue",
];

const optimizeValue = (value) => {
 if (value >= 1000) return `$${value / 1000}m`;
 return `$${value}k`;
};

function App() {
 const [checkpoints, setCheckpoints] = useState(defaultCheckpoints);
 const [plusX, setPlusX] = useState(0);

 const handlerMoveMouse = useCallback((e) => {
  const rect = ref.current.getBoundingClientRect();
  setPlusX(e.x - rect.x);
 }, []);

 useEffect(() => {
  const current = ref.current;
  current.addEventListener("mousemove", handlerMoveMouse);
  return () => {
   current.removeEventListener("mousemove", handlerMoveMouse);
  };
 }, [handlerMoveMouse]);

 const ref = useRef();

 const handleCheckpoint = () => {
  const arr = [...checkpoints, plusX];
  setCheckpoints(arr.sort((a, b) => a - b));
 };

 return (
  <div className="container">
   <div className="box" ref={ref}>
    <div className="chip-wrapper">
     {checkpoints.map((checkpoint) => (
      <div
       key={`checkpoint-${checkpoint}`}
       className="point chip"
       style={{ left: checkpoint }}
      >
       {optimizeValue(checkpoint)}
      </div>
     ))}
    </div>
    <div className="line-wrapper">
     <div className="line-box">
      {checkpoints.map((point, i) => (
       <div key={`point-${point}`}>
        <div
         className="line"
         style={{
          left: point,
          backgroundColor: defaultColors[i] || "black",
          width: checkpoints[i + 1] ? checkpoints[i + 1] - point : 0,
         }}
        />
        <div className="point icon" style={{ left: point }} />
       </div>
      ))}
      <div
       className="plus-button"
       style={{ left: plusX }}
       onClick={handleCheckpoint}
      />
     </div>
    </div>
    <div className="value-wrapper">
     {checkpoints.map((value) => (
      <div key={`value-${value}`} className="point" style={{ left: value }}>
       {optimizeValue(value)}
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}

export default App;
