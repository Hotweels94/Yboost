const express = require("express");
const router = express.Router();
const data = require('./db/data');




module.exports = router



router
   .get("/", (req, res) => {
       res.json("Hello world!!");
   });


router
    .get("/cocktails",(req,res)=>{
        res.json(data.getCocktails());
        })
router
    .get("/cocktails/:id",(req,res)=>{
            res.json(data.getCocktail(req.params.id));
        })





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
router
   .use((req, res) => {
           res.status(404);
           res.json({
               error: "Page not found"
           });
       });