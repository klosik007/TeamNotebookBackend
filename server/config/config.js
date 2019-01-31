var environment = process.env.NODE_ENV || 'development';

if (environment === 'development' || environment === 'test'){
    var config = require('./config.json');
    var configEnv = config[environment];

    Object.keys(configEnv).forEach((key)=>{
        process.env[key] = configEnv[key];
    });
}


