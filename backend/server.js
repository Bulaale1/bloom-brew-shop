// RAMES

/*
As i full stack web developer,
I follow The RAMES strategy/structure whenever 
i am setting up my back-end.
Rames is abbreviation of :
- (R)-Required dependencies
- (A)-App initialization
- (M)-Middleware setup
- (E)-Endpoints
- (S)-Server
 */

//Require dependencies;
const express = require('express');
const morgan = require('morgan');

const menuRoutes = require('./src/routes/menu.routes.js');

//App initialization
const app = express();
const port = process.env.PORT||3000;

//Middleware setup;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Endpoints
app.get('/',(req,res)=>{
    
    // Test the server is connected
    // console.log(cafeMenu.smoothies)
    res.json('Hello! the server is working!')

})

//Routes 
app.use('/api/menu',menuRoutes);
app.use(express.static('public'));
// app.get('/api/menu',(req, res)=>{

//     //show all what we have
//     console.log(cafeMenu)
//     res.json(cafeMenu)
// })

// app.get('/api/menu/:id', (req, res) => {
//     const menuId = req.params.id;

//     // 1. Get all categories, flatten them into one array
//     // This turns [[coffee], [desserts], [smoothies]] into [all items]
//     const allItems = Object.values(cafeMenu).flat();

//     // 2. Now .find() will work!
//     const item = allItems.find(m => m.id === menuId);

//     if (!item) {
//         return res.status(404).json({ error: "Item not found" });
//     }

//     res.json(item);
// });

// app.get('/api/menu/category/:type',(req,res)=>{
//     const categoryName = req.params.type;
//     const items = cafeMenu[categoryName];
//     if(!items){
//     return res.status(404).json({ 
//             error: `Category '${categoryName}' not found. Try 'coffee', 'smoothies', or 'desserts'.` 
//         });
//     }
//     console.log(items)
//     res.json(items)
// });

//server.js
app.listen(port,()=>{
    const now = new Date().toLocaleString();
    console.log(`[${now}]:Server is running on ${port}`);
})
