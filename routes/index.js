exports.index = function (req, res) {

    var domain = req.headers.host,
        subDomain = domain.split('.');

    if (process.env.APP_ENV == "dev") {
        if (subDomain[0] === "admin") {
            res.render('admin', { subDomain: "admin", ENV: process.env.APP_ENV });
        } else {
            res.render('index', { subDomain: "app", ENV: process.env.APP_ENV });
        };

    } else if (process.env.APP_ENV == "prod") {

        /* 
            todo : test this confirm this logic works for production environment
        */
    
        if(subDomain.length >= 3 && subDomain[0] === "admin"){
            res.render('admin', { subDomain: "admin", ENV: process.env.APP_ENV });
        } else {
            res.render('index', { subDomain: "app", ENV: process.env.APP_ENV });
        };

    };





    //   if(domain.indexOf('.in') > -1 && domain.indexOf('.nbos.') > -1){
    //     //PRODUCTION MODE
    //     if(subDomain.length > 2){
    //       //make HTTP request here

    //     }else{
    //       subDomain = "www";
    //       res.render('index', { subDomain: subDomain });
    //     }

    //   } else {
    //     //DEV MODE
    //     if(subDomain.indexOf('admin') >= 0){
    //       res.render('admin', { subDomain: "admin", ENV: "dev" });
    //     } else  if(subDomain.indexOf('dev') >= 0){
    //       res.render('dev', { subDomain: "dev" , ENV: "dev" });
    //     } else {
    //       res.render('index', { subDomain: "console" , ENV: "dev" });
    //     }

    //   }

};
