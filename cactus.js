const mineflayer = require('mineflayer');
const express = require('express');
const vec3 = require('vec3');
const delay = require('util').promisify(setTimeout);
const Vec3 = require('vec3').Vec3; // Vec3 sınıfını çağırıyoruz




let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'oyna.milasmc.com', // Sunucu IP adresi
    username: 'CrozkodeAFK', // Botun kullanıcı adıs
    version: '1.18.2'
  });

  bot.on('login', () => {
    setTimeout(() => {
      bot.chat("/register vorega31 vorega31");
    }, 5000);
    
    setTimeout(() => {
      bot.chat('/login vorega31');
    }, 10000);

    setTimeout(() => {
      bot.chat('/survival');
    }, 12000);
  });

  bot.on('kicked', (reason, loggedIn) => {
    if (loggedIn) {
      console.log('Bot sunucudan atıldı, yeniden bağlanılıyor...');
      setTimeout(createBot, 5000); // 5 saniye sonra tekrar bot oluştur
    }
  });

  bot.on('end', () => {
    console.log('Bot bağlantısı sonlandırıldı, tekrar bağlanılıyor...');
    setTimeout(createBot, 5000); // 5 saniye sonra tekrar bot oluştur
  });
}

createBot(); // Botu başlat

const app = express(); // Web uygulaması oluştur
const port = 3000; // Port numarası belirle
app.listen(port); // Portu dinle

app.get('/', (req, res) => { // Ana sayfaya gelen isteklere index.html dosyasını gönder
  res.sendFile(__dirname + '/index.html');
});

app.get('/tp/:name', (req, res) => { // /tp/ alt sayfasına gelen isteklere botun /tpa komutunu çalıştır ve OK mesajını gönder
  bot.chat('/tpa ' + req.query.name); // Komutun başında / işareti olmalı ve req.query.name kullanılmalı
});

app.get('/sethome', (req, res) => { // /sethome alt sayfasına gelen isteklere botun /sethome komutunu çalıştır ve OK mesajını gönder
  bot.chat('/sethome');
});

app.get('/tpaccept', (req, res) => { // /sethome alt sayfasına gelen isteklere botun /sethome komutunu çalıştır ve OK mesajını gönder
  bot.chat('/tpaccept');
});

app.get('/pay/:paraisim', (req, res) => { // /tp/ alt sayfasına gelen isteklere botun /tpa komutunu çalıştır ve OK mesajını gönder
  bot.chat('/pay ' + req.query.paraisim); // Komutun başında / işareti olmalı ve req.query.name kullanılmalı
});

app.get('/istekmesaj/:istekmesaj', (req, res) => { // /tp/ alt sayfasına gelen isteklere botun /tpa komutunu çalıştır ve OK mesajını gönder
  bot.chat('' + req.query.istekmesaj); // Komutun başında / işareti olmalı ve req.query.name kullanılmalı
});


const cac = 9
const dirt = 19
const sand = 9
const fence = 6



// Find a diamond shovel in the inventory
function findDiamondShovel() {
  const items = bot.inventory.items()
  const shovel = items.find(item => item.name === 'diamond_shovel')
  return shovel
}

// Equip a diamond shovel or nothing if not found
async function equipDiamondShovel() {
  const shovel = findDiamondShovel()
  if (shovel) {
    await bot.equip(shovel.type, 'hand', null)
  } else {
    await bot.equip(0, 'hand', null)
  }
}


function waitRandom() {
  const min = 1000; // 1 saniye (1000 milisaniye)
  const max = 3000; // 3 saniye (3000 milisaniye)
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return new Promise(resolve => setTimeout(resolve, delay));
}


function digRandom() {
  const min = 1000; // 1 saniye (1000 milisaniye)
  const max = 3000; // 3 saniye (3000 milisaniye)
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return new Promise(resolve => setTimeout(resolve, delay));
}

function lookAroundRandom() {
  const pitch = (Math.random() - 0.5) * Math.PI; // -90 to 90 degrees
  const yaw = Math.random() * Math.PI * 2; // 0 to 360 degrees
  bot.look(yaw, pitch, false);
}

async function digLayer() {
  try {
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, 0)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, 2)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(0, -2, 2)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, 2)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, 0)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(-2, -2, -2)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(0, -2, -2)), true);
    lookAroundRandom();
    await digRandom();
    await equipDiamondShovel()
    await bot.dig(bot.blockAt(bot.entity.position.offset(2, -2, -2)), true);
    lookAroundRandom();
    await digRandom();
  } catch (error) {
    console.error('Kazma işlemi başarısız oldu:', error.message);
  }
}


async function buildUp() {
    try {
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
                } catch (err) {
                    tryCount++
                    if (tryCount > 10) {
                        console.error('Yükselme işlemi başarısız oldu:', err.message);
                        bot.setControlState('jump', false)
                        bot.removeListener('move', placeIfHighEnough)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Yükselme işlemi başarısız oldu:', error.message);
    }
}


async function firstblocksand() {
    try {
        await bot.equip(bot.inventory.items().find(item => item.name === 'sand'), "hand")
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
                } catch (err) {
                    tryCount++
                    if (tryCount > 10) {
                        console.error('Yükselme işlemi başarısız oldu:', err.message);
                        bot.setControlState('jump', false)
                        bot.removeListener('move', placeIfHighEnough)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Yükselme işlemi başarısız oldu:', error.message);
    }
}

async function buildlayer() {
    try {
        // Sand'ı yerleştir
        await bot.equip(bot.inventory.items().find(item => item.name === 'sand'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        
        // Kaktüs'ü yerleştir
        await bot.equip(bot.inventory.items().find(item => item.name === 'cactus'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, -2)), vec3(0, 1, 0));
        await waitRandom();
    } catch (error) {
        console.error('Katman oluşturma işlemi başarısız oldu:', error.message);
    }
}

async function buildFenceDirt() {
    try {
        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, 2)), vec3(0, 0, -1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, 2)), vec3(0, 0, -1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, 2)), vec3(0, 0, -1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, 0, -2)), vec3(0, 0, 1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, 0, -2)), vec3(0, 0, 1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.equip(bot.inventory.items().find(item => item.name === 'oak_fence'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, 0, -2)), vec3(0, 0, 1));
        await waitRandom();

        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
    } catch (error) {
        console.error('Çit inşa etme işlemi başarısız oldu:', error.message);
    }
}


async function placeDirtLayer() {
    try {
        await bot.equip(bot.inventory.items().find(item => item.name === 'dirt'), "hand");
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, 0)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(-2, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -1, -2)), vec3(0, 1, 0));
        await waitRandom();
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(2, -1, -2)), vec3(0, 1, 0));
    } catch (error) {
        console.error('Dirt katmanı yerleştirme işlemi başarısız oldu:', error.message);
    }
}

async function placeLastCactus() {
    try {
        await bot.dig(bot.blockAt(bot.entity.position.offset(0, -2, 0)), true);
        await bot.dig(bot.blockAt(bot.entity.position.offset(0, -3, 0)), true);
        await delay(2000);
        await bot.equip(bot.inventory.items().find(item => item.name === 'cactus'), "hand");
        await delay(2000);
        await bot.placeBlock(bot.blockAt(bot.entity.position.offset(0, -4, 0)), vec3(0, 1, 0));
    } catch (error) {
        console.error('Son kaktüs yerleştirme işlemi başarısız oldu:', error.message);
    }
}


async function cactus(x){
    for(let layer =0; layer < x; layer++){
        await buildlayer()
        await delay(1000)
        await firstblocksand()
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
        await placeLastCactus()
        delay(1000)
    }

    console.log(`Kaktüs kulesi inşaası tamamlandı!`);

}
app.get('/cactus', (req, res) => {
    const cactusAmount = req.query.amount;
    if (!cactusAmount || isNaN(cactusAmount)) {
        return res.status(400).send('Kaktüs adedi belirtilmedi veya geçersiz');
    }

    // Kaktüs kulesi inşa etmek için gerekli malzemelerin hesaplanması
    const cactusPerLayer = 9;
    const dirtPerLayer = 19;
    const sandPerLayer = 9;
    const fencePerLayer = 6;

    const totalCactus = cactusAmount * cactusPerLayer;
    const totalDirt = cactusAmount * dirtPerLayer;
    const totalSand = cactusAmount * sandPerLayer;
    const totalFence = cactusAmount * fencePerLayer;

    const inventory = bot.inventory.items();
    const cactusCount = inventory.filter(item => item.name === 'cactus').reduce((total, item) => total + item.count, 0);
    const dirtCount = inventory.filter(item => item.name === 'dirt').reduce((total, item) => total + item.count, 0);
    const sandCount = inventory.filter(item => item.name === 'sand').reduce((total, item) => total + item.count, 0);
    const fenceCount = inventory.filter(item => item.name === 'oak_fence').reduce((total, item) => total + item.count, 0);

    // Yeterli malzeme olup olmadığının kontrol edilmesi
    if (cactusCount < totalCactus || dirtCount < totalDirt || sandCount < totalSand || fenceCount < totalFence) {
        console.log(`Gerekli itemler yok. İtemler:
        Sand: ${sandCount} tane var ama ${totalSand} tane olması lazım
        Cactus: ${cactusCount} tane var ama ${totalCactus} tane olması lazım
        Dirt: ${dirtCount} tane var ama ${totalDirt} tane olması lazım
        Fence: ${fenceCount} tane var ama ${totalFence} tane olması lazım`);
        return res.status(400).send('Gerekli itemler envanterinizde bulunmuyor.');
    }

    console.log(`Envanterinizde gerekli olan tüm itemler var. ${cactusAmount} katlı kaktüs kulesi dikmeye başlıyorum.`);

    // Kaktüs kulesi inşa etme işleminin başlatılması
    cactus(cactusAmount);

    res.status(200).send(`Kaktüs dikme işlemi başarıyla başlatıldı: ${cactusAmount}`);
});




bot.on('kicked', console.log)
bot.on('error', console.log)
