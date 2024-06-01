import DrawingArea from "./components/DrawingArea";
import ToolBar from "./components/ToolBar";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <DrawingArea className="flex-1 bg-gray-300 mx-5 mt-5 rounded-2xl" />
      <ToolBar className="h-28" />
    </div>
  );
}

export default App;
