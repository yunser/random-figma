import { shuffle } from './shuffle'
import { RandomUtil } from '@yunser/random-util'

console.log('random color start')

figma.showUI(__html__, {
    width: 480,
    height: 480,
})


// figma.closePlugin()

let deafultGroups = [
    {
        id: '1',
        name: '人名',
        list: ['张三', '李四', '王五'],
    },
    {
        id: '2',
        name: '星期',
        list: ['星期一', '星期二', '星期三'],
    },
]


let groups = [
]

figma.ui.onmessage = async msg => {
    console.log('ui.onmessage', msg)
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.

    // figma.currentPage.
    // figma.currentPage.children.forEach(child => {
    //     child.remove()
    // })
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateString(length) {
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    function random(min, max) {
        return min + Math.random() * (max - min + 1)
    }

    if (msg.type == 'getData') {
        groups = await figma.clientStorage.getAsync('groups') || deafultGroups
        figma.ui.postMessage({
            type: 'groupData',
            data: groups,
                // pluginMessage: {
                // }
        })
    }
    else if (msg.type == 'setData') {
        groups = msg.data
        figma.clientStorage.setAsync('groups', groups)
    }
    else if (msg.type == 'random') {
        // handleTooltipMsg(msg)
        const { groupId } = msg
        const group = groups.find(g => g.id == groupId)

        const randomList = shuffle(group.list)
        console.log('randomList', randomList)

        if (group.list.length) {
            for (const node of figma.currentPage.selection) {
                if (node.type == 'TEXT') {
                    // node.characters = 
                    await figma.loadFontAsync(node.fontName as FontName)
                    node.deleteCharacters(0, node.characters.length)
                    // node.insertCharacters(0, generateString(16))
                    const text = group.list[RandomUtil.randomInt(0, group.list.length - 1)]
                    console.log('text', text)
                    node.insertCharacters(0, text)
                    
                }
                console.log('node', node)
                // if (node.fills) {
                //     node.fills = [
                //         {
                //             type: "SOLID",
                //             color: {
                //                 r: Math.random(),
                //                 g: Math.random(),
                //                 b: Math.random(),
                //             },
                //         }
                //     ]
                // }
            }
        }
    }
}

console.log('random color end')
