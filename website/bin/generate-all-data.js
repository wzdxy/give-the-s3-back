const fse = require('fs-extra')
const path = require('path')
const json5 = require('json5')
const vendorDir = path.resolve(__dirname, '../../vendors')
console.log({vendorDir})


;(async () => {
    const outputFile = path.resolve(__dirname, '../data/all-data.json5')
    const products = []
    const vendors = fse.readdirSync(vendorDir, {withFileTypes: true}).map(i => i.name)
    // console.log({products, vendors})
    await recursiveMapFile(vendorDir, async ({filepath, name}) => {
        if (filepath.endsWith('.json5')) {
            const dataStr = await fse.readFile(filepath, 'utf8')
            console.log(dataStr)
            products.push(json5.parse(dataStr))
        }
    })
    console.log({products, vendors})
    await fse.writeFile(outputFile, json5.stringify({products, vendors}, null, 2))

})()


async function recursiveMapFile(dir, handler) {
    const items = fse.readdirSync(dir, {withFileTypes: true})
    if (items.length) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const filepath = path.resolve(dir, item.name)
            if (item.isDirectory()) {
                await recursiveMapFile(filepath, handler)
            } else {
                await handler({filepath, name: item.name})
            }
        }
    }
}