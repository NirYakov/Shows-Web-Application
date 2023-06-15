
const axios = require('axios');
const Show = require("../models/show");


// const dataStatic = require("../dataObj");

exports.GetUserShows = async (req, res, next) => {

    const myShows = Show.find({ creator: req.userData.userId });

    console.log({ creator: req.userData.userId });

    console.log("ping back shows get");

    myShows.then(response => {

        // console.log("here and the shows is : ", response);

        res.status(200).json({
            message: "shows :)",
            shows: response,
        });

    }).catch(error => {
        res.status(500).json({
            message: "error !!",
        });

    });

}


exports.SearchShows = async (req, res, next) => {

    let responseApi = "none";

    // const searchShow = "inception 2010";
    const searchShow = req.params.searchShow;

    const urlApi = `https://imdb-api.com/en/API/Search/${process.env.ApiKey}/${searchShow}`;

    // console.log(urlApi);

    // req from rate api
    await axios({
        method: 'get',
        url: urlApi,
    })
        .then((response) => {
            // rateCAN = response.data.rates.CAD;
            // rateEuro = response.data.rates.EUR;

            responseApi = response.data;

            console.log("Response?");
            console.log(responseApi);

            res.status(200).json({
                health: "Online ! :)",
                responseApi
            });


        }).catch(e => {
            console.log({
                message: "oops :(",
                error: e,
            })
        });


}


exports.CreateUserShow = async (req, res, next) => {

    try {

        const apiId = req.body.apiId;

        const newShow = new Show({
            creator: req.userData.userId,

            title: req.body.title,
            img: req.body.img,
            rating: req.body.rating,
            review: req.body.review,
            type: req.body.type,
            seasons: req.body.seasons,
            minutes: req.body.minutes,
            apiId: apiId,
        });


        console.log(req.body);
        console.log("Here to be for add");
        console.log(newShow);

        // need the better api !!

        const urlApi = `https://imdb-api.com/en/API/Title/${process.env.ApiKey}/${apiId}`;



        // console.log(urlApi);

        // req from rate api
        const showDataCall = await axios.get(urlApi);
        const showData = showDataCall.data;

        console.log("showData ", showData);

        const answerType = showData.type === "Movie" ? 'movie' : 'tv';

        newShow.type = answerType;

        if (answerType === 'tv') {
            const seasons = showData.tvSeriesInfo.seasons.length;
            newShow.seasons = seasons;

        } else {
            const minutes = showData.runtimeMins;
            newShow.minutes = minutes;
        }

        console.log(newShow);

        newShow.save().then(response => {

            console.log(" Pow here and well ? ");

            res.status(201).json(
                {
                    message: "show created!",
                    response
                });

        }).catch(error => {
            console.log(error);

            res.status(401).json(
                {
                    message: "error !!",
                    error
                });
        });

    } catch (error) {
        res.status(500).json(
            {
                message: "error !!",
                error
            });
    }

}

// // // create user show | old code 
//{

//     let responseApi = "none";

//     const searchShow = "inception 2010";

//     const urlApi = `https://imdb-api.com/en/API/Search/${process.env.ApiKey}/${searchShow}`;

//     console.log("Here in the Create user show ");

//     // console.log(urlApi);

//     // req from rate api
//     await axios({
//         method: 'get',
//         url: urlApi,
//     })
//         .then((response) => {
//             // rateCAN = response.data.rates.CAD;
//             // rateEuro = response.data.rates.EUR;

//             responseApi = response;
//             // console.log(response);


//         }).catch(e => {
//             console.log({
//                 message: "oops :(",
//                 error: e,
//             })
//         });

//     responseApi = responseApi.data;

//     res.status(200).json({
//         health: "Online ! :)",
//         responseApi
//     });
// }



exports.UpdateUserShow = async (req, res, next) => {

    let responseApi = "not implemented";

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });
}

exports.deleteUserShow = async (req, res, next) => {

    let responseApi = "not implemented";

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });
}

