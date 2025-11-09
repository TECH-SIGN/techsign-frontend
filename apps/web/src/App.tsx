import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollProvider from "./providers/ScrollProvider"; // ✅ Import your scroll logic

function App() {
  return (
    <BrowserRouter>
      <ScrollProvider smooth animations>
        {" "}
        {/* ✅ Scroll logic now inside router context */}
        <AppRoutes />
      </ScrollProvider>
    </BrowserRouter>
  );
}

export default App;
