import fs from 'fs';
import request from 'request';

export default function downloadFile(url, target, progress){
    return new Promise((resolve, reject) => {

        let s = fs.createWriteStream(target);
        s.on('error', reject);

        let totalSize = 0;
        let downloadSize = 0;
        let req = request
            .get({
                url: url,
                encoding: null
            })
            .on('response', res => {
                if(res.statusCode != 200){
                    return reject(new Error('status #' + res.statusCode));
                }
                totalSize = Number(res.headers['content-length']) || null;

                res.on('data', data => {
                    downloadSize += data.length;
                    progress && progress(downloadSize, totalSize);
                });
                res.on('end', () => resolve(target));
            })
            .pipe(s);
    })
}

let url = 'http://www.aloostudio.com/projects/2015/02/template/vote/yknight/res/img/introduce.png';
downloadFile(url, './avatar.jpg', (size, total) => console.log(`进度${size}/${total}`))
    .then(filename => console.log(`已保存到${filename}`))
    .catch(err => console.log(`出错：${err}`));