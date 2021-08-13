import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from "pages/Room";
import { Toaster } from "react-hot-toast";
import { StoresProvider } from "stores";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right" />
      </div>
      <StoresProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </StoresProvider>
    </BrowserRouter>
  );
}

export default App;
