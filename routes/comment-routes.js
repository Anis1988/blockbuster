
const express = require("express");
const routes = express.Router();
const { validatorReqParamId, validatorReqBodyMovieId } = require("../middleware/validatingObjectId");
const {Comment}  = require('../models/comment')


routes.post('/',validatorReqBodyMovieId,async(req,res) => {
    const comment = await Comment.create({
        title: req.body.title,
        text: req.body.text,
        movie: req.body.movieId
    })
    res.status(201).send(comment)

})
routes.get("/", async (req, res) => {
    const comment  = await Comment.find().populate('movie').sort('-date');
    if (!comment || comment.length === 0 ) {
        return res.send("no comments to display !!")
    }
    res.send(comment)
});

routes.put("/:id",validatorReqParamId ,async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            text: req.body.text,
             date: Date.now(),
          },{ new: true }
        );
       return res.send(comment)
    }
);

routes.delete("/:id", validatorReqParamId,async (req, res) => {
        const comment  = await Comment.findByIdAndDelete(req.params.id);
        return res.send(comment)
    });




module.exports = routes;



