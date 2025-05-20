const express = require("express");
const session = require("express-session")
const router = express();
const data = require('./db/data');
const userData = require('./userdb/userdata');
const { con } = require("./userdb/userdata");
const { getCocktail } = require("./db/data");
const { getUser } = require("./userdb/userdata");

const path = require('path');

router.use(express.static('public'));
router.use('/personnages', express.static(__dirname + '/public/images/personnages'));
router.use('/css', express.static(__dirname + 'public/css'));

router.use(
    session({
        secret: "lucasgabrielsamiryan",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);


router.post("/", async (req, res) => {
    const { username, password, } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Vous avez oubliez de renseigner un élément" });
    }

    const loginUser = await userData.loginUser(username, password);
    req.session.username = loginUser.username;
    req.session.email = loginUser.email;
    req.session.role = loginUser.role;
    req.session.userId = loginUser.id;

    res.redirect("/account");
    }
);

router.get("/getSession",(req, res) => {
    const username = req.session.username;
    const email = req.session.email;
    const role = req.session.role;
    const id = req.session.id;
    res.json({
        username,
        email,
        role,
        id
    });
})

router.get("/destroySession", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("Error destroying session");
        } else {
            res.redirect("/");
        }
    });
});

function isAdmin(req, res, next) {
    if (req.session.role === "admin") {
        return next();
    } else {
        return res.redirect("/cocktails");
    }
}

router.post('/favoris/add/:id', (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    const userId = req.session.userId;
    const cocktailId = req.params.id;

    const sql = 'INSERT INTO favorites (user_id, cocktail_id) VALUES ($1, $2)';

    con.query(sql, [userId, cocktailId], (err) => {
        res.redirect('/account');
    });
});

router
    .get("/cocktails",(req,res)=>{
        res.json(data.getCocktails());
        })

router.get('/cocktails/:id', function(req, res) {
    var cocktail = getCocktail(req.params.id);
            
    const user = req.session.userId ? {
        id: req.session.userId,
        username: req.session.username
    } : null;
    res.render("cocktail", {
        cocktail,
        user,
    });
});

router
    .post('/cocktail',
        (req, res) => {
            const p = data.insertCocktail(req.body);
            res.status(201)
                .set('Location', '/cocktails/' + p.id)
                .json(p);
            })

router
    .delete('/cocktail/:id',
        (req, res) => {
            data.removeCocktail(req.params.id);
            res.status(204)
                .end();
            })

router
    .patch('/cocktail/:id',
        (req, res) => {
            data.updateCocktail(req.body);
            res.status(200)
                .json(req.body);
            })

router.get("/users", (req, res) => {
    res.render("createuser"); 
});    

router.get('/admin', isAdmin, async (req, res) => {
    try {
        const users = await userData.getUser();
        res.render('admin', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

router.get("/users", async (req, res) => {
    res.json(data.getUsers());
});

router.post("/users", async (req, res) => {
            const { username, email, password, phone_number, age } = req.body;
    
            if (!username || !email || !password) {
                return res.status(400).json({ error: "Vous devez forcément indiquer un mot de passe, un email, et un username" });
            }
    
            const newUser = await userData.createUser(username, email, password, phone_number, age);
            res.redirect("/?created=true");
        }
    );

router.get('/account', (req, res) => {
    if (!req.session.username || !req.session.email) {
        return res.redirect('/');
    }
        const user = {
            username: req.session.username,
            email: req.session.email,
            id: req.session.userId
        };

        const sql = 'SELECT cocktail_id FROM favorites WHERE user_id = $1';

        con.query(sql, [user.id], (err, result) => {

        const cocktailIds = result.rows.map(row => row.cocktail_id);
        const allCocktails = require('./db/data').getCocktails();
        const favoris = allCocktails.filter(c => cocktailIds.includes(c.id.toString()));

        res.render('account', { user, favoris });
    });
});

router.get('/contact', (req, res) => {
  res.render('contact');
});


router
   .use((req, res) => {
           res.status(404);
           res.json({
               error: "Page not found"
           });
       });

module.exports = router;