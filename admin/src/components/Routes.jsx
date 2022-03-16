import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import Add from '../pages/TopCustomer'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
const Routes = () => {
    return (
        <Switch>
            <Route path='/admin' exact component={Dashboard}/>
            <Route path='/admin/customers' component={Customers}/>
            <Route path='/admin/products' component={Products}/>
            <Route path='/admin/orders' component={Orders}/>
            <Route path='/admin/add' component={Add}/>
            <Route path='/admin/profile' component={Profile}/>
            <Route path='/admin/settings' component={Settings}/>
        
        </Switch>
    )
}

export default Routes




// export default function Routes() {
//     return (
//         <Switch>
//             Route.map((item, index) => {
//                 return <Route  key={index} path={item.path} render={() => item.component}>

//                 </Route>
//             })

//         </Switch>
//     )
// }
