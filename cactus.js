const mineflayer = require('mineflayer')
const vec3 = require('vec3')
const delay = require('util').promisify(setTimeout)

const bot = mineflayer.createBot({
    host: "localhost",
    port: 61315,

    username: "CactusBuilder", //test@gmail.com
    auth:"offline",

    version: "1.18.2"
})

const cac = 8
const dirt = 20
const sand = 8
const fence = 6


bot.once('spawn', ()=>{
    console.log('The bot is ready ....')
})


async function digLayer() {

    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, 0)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, 2)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(0, -2, 2)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, 2)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, 0)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, -2)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(0, -2, -2)), true);
    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, -2)), true);
}

async function buildUp() {
    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    const referenceBlock = bot.blockAt(bot.entity.position.offset(0, -1, 0))
    const jumpY = Math.floor(bot.entity.position.y) + 1.0
    bot.setControlState('jump', true)
    bot.on('move', placeIfHighEnough)

    let tryCount = 0

    async function placeIfHighEnough() {
        if (bot.entity.position.y > jumpY) {
            try {
                await bot.placeBlock(referenceBlock, vec3(0, 1, 0))
                bot.setControlState('jump', false)
                bot.removeListener('move', placeIfHighEnough)
                //bot.chat('Placing a block was successful')
            } catch (err) {
                tryCount++
                if (tryCount > 10) {
                    bot.chat(err.message)
                    bot.setControlState('jump', false)
                    bot.removeListener('move', placeIfHighEnough)
                }
            }
        }
    }
}

async function buildlayer() {
    //Plaziert den Sand
    await bot.equip(bot.inventory.items().find(item => item.name === 'sand'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0))
    //Plaziert den Kaktus
    await bot.equip(bot.inventory.items().find(item => item.name === 'cactus'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, -2)), vec3(0, 1, 0))

}

async function buildFenceDirt() {
    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 2)), vec3(0, 0, -1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, 2)), vec3(0, 0, -1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 2)), vec3(0, 0, -1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, -2)), vec3(0, 0, 1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, -2)), vec3(0, 0, 1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0))
    await bot.equip(bot.inventory.items().find(item => item.name === 'iron_bars'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, -2)), vec3(0, 0, 1))

    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0))

}

async function placeDirtLayer() {
    await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand")
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0))
    await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0))
    //break
}

async function cactus(x){
    for(let layer =0; layer < x; layer++){
        await buildlayer()
        await delay(1000)
        await buildUp()
        await delay(1000)
        await buildUp()
        await delay(1000)
        await buildFenceDirt()
        await delay(1000)
        await buildUp()
        await delay(1000)
        await placeDirtLayer()
        await delay(1000)
        await buildUp()
        await delay(1000)
        await digLayer()
        await delay(1000)
    }
}


bot.on('chat', (username, message)=>{
    if (username === bot.username)return
    if (message.startsWith("cactus")){
        const msg = message.split(" ")

        cactus(msg[1])
    }else if(message.startsWith("calculate")){
        const calcu = message.split(" ")

        bot.chat(`Du brauchst ${cac * calcu[1]} Kaktus, ${dirt * calcu[1]} Erde, ${sand * calcu[1]} Sand und ${fence * calcu[1]} Zäune!}` )
        
    }
})
bot.on('kicked', console.log)
bot.on('error', console.log)