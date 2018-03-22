import * as request from 'request';

export const get = (options: request.RequiredUriUrl & request.CoreOptions) => {
    return new Promise<request.RequestResponse>((resolve, reject) => request.get(options, (err, res) => {
        if (err || res.statusCode !== 200)
            reject(err || res);
        else
            resolve(res);
    }));
};