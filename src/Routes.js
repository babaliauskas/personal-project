import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home/Home';
import Store from './Components/Nav/Store/Store';
import Contact from './Components/Nav/Contact/Contact';
import Tickets from './Components/Nav/Tickets/Tickets';
import Cart from './Components/Nav/Cart/Cart';
import Login from './Components/Login/Login';
import Allosaurus from './Components/Dinosaurs/Allosaurus/Allosaurus';
import Anchiceratops from './Components/Dinosaurs/Anchiceratops/Anchiceratops';
import Centrosaurus from './Components/Dinosaurs/Centrosaurus/Centrosaurus';
import Daspletosaurus from './Components/Dinosaurs/Daspletosaurus/Daspletosaurus';
import Gargoyleosaurus from './Components/Dinosaurs/Gargoyleosaurus/Gargoyleosaurus';
import Mamenchisaurus from './Components/Dinosaurs/Mamenchisaurus/Mamenchisaurus';
import Stegosaurus from './Components/Dinosaurs/Stegosaurus/Stegosaurus';
import Minmi from './Components/Dinosaurs/Minmi/Minmi';
import FullInfo from './Components/FullInfo/Fullinfo';
import Support from './Components/Support/Support';


export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/store' component={Store} />
        <Route path='/contact' component={Contact} />
        <Route path='/tickets' component={Tickets} />
        <Route path='/allosaurus' component={Allosaurus} />
        <Route path='/anchiceratops' component={Anchiceratops} />
        <Route path='/centrosaurus' component={Centrosaurus} />
        <Route path='/daspletosaurus' component={Daspletosaurus} />
        <Route path='/gargoyleosaurus' component={Gargoyleosaurus} />
        <Route path='/mamenchisaurus' component={Mamenchisaurus} />
        <Route path='/stegosaurus' component={Stegosaurus} />
        <Route path='/minmi' component={Minmi} />
        <Route path='/info/:id' component={FullInfo} />
        <Route path='/support' component={Support} />

    </Switch>
)