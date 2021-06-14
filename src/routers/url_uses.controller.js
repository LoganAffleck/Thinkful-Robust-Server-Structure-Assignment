//Imports
const urls = require('../data/urls-data');
const uses = require('../data/uses-data');

//MIDDLEWARE
//---------------


//Checks if the requested use log exists.
function useExists(request, response, next){
    const {useId} = request.params
    let foundUse = uses.find(use => use.id === Number(useId))
    if(foundUse){
        response.locals.useId = useId 
        return next()
    }
    next({
         status: 404, 
         message: `The use with ID of ${useId} doesn't exist.`
    })
}

//Methods for root ('/urls/:urlId/uses) path
//----------------

//"List" returns a list of all use logs of a given URL
function list(request, response, next){
    let urlId = response.locals.urlId
    let URLuses = uses.filter(use => use.urlId === Number(urlId))

    response.status(200).json({data: URLuses})
}

function read(request, response, next){
    let urlId = response.locals.urlId;
    let useId = response.locals.useId;
    let foundUse = uses.find(use => use.id === Number(useId) && use.urlId === Number(urlId));
    response.status(200).json({data: foundUse});
}

function destroy(request, response, next){
    response.sendStatus(204)
}


module.exports={
    list,
    read: [useExists, read],
    destroy: [useExists, destroy],

}