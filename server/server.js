require('dotenv').config();
const express = require("express"),
    axios = require('axios'),
    massive= require('massive'),      
    bodyParser = require('body-parser'),
    session = require('express-session'),
    dinoCtrl = require('./controllers/dinosaurs_controller'),
    cart = require('./controllers/cart'),
    nodemailer = require('nodemailer')
    stripe = require('stripe')(process.env.KEY);
    
    
    const app = express();
    app.use(bodyParser.json());


///////////         Stripe          ///////////////////
//////////////////////////////////////////////


  
app.post('/api/payment', function(req, res, next){
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }


    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
    amount: convertedAmt, 
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function(err, charge) {
      if (err) return res.sendStatus(500)
      return res.sendStatus(200);
      
  });
  })




////////////////////////////////////////////////////////


////////////////////////   Auth0 ////////////////////

let = { 
    SERVER_PORT, 
    REACT_APP_CLIENT_ID, 
    CLIENT_SECRET, 
    REACT_APP_DOMAIN,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})



app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };

    let responseWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);

    let userData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`);
    
    let {sub, name} = userData.data;  

    const db = req.app.get('db');

    let userExists = await db.find_user([sub])
     if (userExists[0]) {
         req.session.user = userExists[0];
         res.redirect('http://localhost:3000/#/home')
     } else {
         db.create_user([sub, name]).then( createdUser => {
            req.session.user = createdUser[0];
            res.redirect('http://localhost:3000/#/home')
         })
     }
});


app.get('/api/user-data', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Nice try sucka')
    }
})

app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.redirect('http://localhost:3000/#/')
})

/////////////////////////////////////////////////////////////////////

//////////////////////      NODEMAILER


app.post('/api/form', (req,res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Contact Details</h3>
                <ul>
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                </ul>

                <h3>Message</h3>
                <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PSW}`
            },
            tls:{
                rejectUnauthorized: false
            }
        })

        let mailOptions = {
            from: `test@gmail.com`,
            to: `${process.env.EMAIL}`,
            
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                return console.log(err) 
            }
            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
})



//////////////////////////////////////////////////////////////////////

app.get('/api/miniinfo', dinoCtrl.get);
app.get('/api/store', dinoCtrl.getStore);
app.get('/api/store/:item', dinoCtrl.getHats);
app.post('/api/cart', cart.add);
app.get('/api/cartget', cart.get);
app.delete('/api/cart/:id/:cartid', cart.delete);
app.post('/api/cart/:id/:quantity', cart.update);
app.delete('/api/cart', cart.deleteAll);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))

