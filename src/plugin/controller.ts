console.log('random color start')

figma.showUI(__html__)


// figma.closePlugin()

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

    if (msg.type == 'random') {
        // handleTooltipMsg(msg)
        for (const node of figma.currentPage.selection) {
            if (node.type == 'TEXT') {
                // node.characters = 
                await figma.loadFontAsync(node.fontName as FontName)
                node.deleteCharacters(0, node.characters.length)
                node.insertCharacters(0, generateString(16))
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

console.log('random color end')
