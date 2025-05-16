import db from "./config";

export async function upsertToDB(id, origin, method, key, res){
    try {
        const data = await db.get(id)

        if(data[origin]){
            if(data[origin][method]){
                data[origin][method][key] = res
            }else{
                data[origin][method] = {[key] : res}
            }
        }else{
            data[origin] = {
                [method]: {
                    [key] : res
                }
            }
        }

        await db.put(data);
    } catch (error) {

        if(error.message === 'missing'){
            const data = {
                _id: id,
                [origin]: {
                    [method]: {
                        [key]: res
                    }
                }
            }
            db.put(data).catch((err)=> console.log(err))
        }else if(error.status === 409){
            upsertToDB(id, origin, method, key, res)
        }else{
            console.log(error)
        }
    }
}

export async function getCachedData(id, origin, method, key){
    try {
        const data = await db.get(id);
        if(data[origin] && data[origin][method] && data[origin][method][key]){
            return data[origin][method][key]
        }
        return null
    } catch (error) {
        return null
    }
}