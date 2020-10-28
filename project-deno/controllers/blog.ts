import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import { select } from '../models/pg_model.ts';
import TSql from '../models/sql.ts';

const home = async({response} : {response : any}) => {
    const dataTable = await select(
        [
            {text : TSql['KtgFindAll']},
            {text : TSql ['BlogInfoFindAll']}
        ]
    );
    const html = await renderFileToString("./tampilan/home.ejs", {
        data : {
            Multimedia : dataTable[0],
            blogInfo : dataTable[1]
        },
        subview : {
            namafile : "./tampilan/blog-main.ejs",
            showjumbotron : true 
        }
    });
    response.body = new TextEncoder().encode(html);
}
const signup = async({response} : {response : any}) => {
    const html = await renderFileToString("./tampilan/home.ejs", {
        data : {
            Multimedia : await select({
                text :TSql['KtgFindInKode'],
                args : ['ds', 'ps', 'ev']
            }),
            blogInfo : await select({
                text : TSql['BlogInfoFindAll']
            })
        },
        subview : {
            namafile : "./tampilan/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
}
const saveuser = async ({request, response} : {request : any, response : any}) => {
    const body = await request.body().value;
    const bodyData = new URLSearchParams(body);

    const namalengkap = bodyData.get("fullname");

    const namauser = bodyData.get("username");
    const pwd = bodyData.get("paswd");

    response.body = "Data yang di POST : "+namalengkap+" , "+namauser+" , "+pwd;
}
const kategori = async ({params, response} : {params : {id : string}, response:any}) => {
    response.body = "Id Parameter :"+ params.id
}
export { home, signup, saveuser, kategori }