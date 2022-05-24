import * as React from 'react'
import { useState } from 'react'
import '../styles/ui.css';
// import classes from './app.less'
// declare function require(path: string): any;

// console.log('classes', classes)

const App = ({}) => {

    const [groups, setGroups] = useState([])
    const [editing,setEdiing] = useState(false)
    const [data, setData] = useState('1212')
    const [editIdx, setEditIdx] = useState(0)
    const [form, setForm] = useState({})
    
    React.useEffect(() => {
        window.onmessage = (event) => {
            console.log('app.onmessage', event.data)
            if (event.data && event.data.pluginMessage) {
                const { type, data } = event.data.pluginMessage
                if (type == 'groupData') {
                    setGroups(data)
                }
                // else if (type == 'create-json-callback') {
                // }
            }
        }
        parent.postMessage({
            pluginMessage: {
                type: 'getData',
            }
        }, '*')
    }, [])
    // const groups = [
    //     {
    //         id: '1',
    //         name: '人名',
    //         list: ['张三', '李四', '王五'],
    //     },
    //     {
    //         id: '2',
    //         name: '星期',
    //         list: ['星期一', '星期二', '星期三'],
    //     },
    // ]

    return (
        <div className='app'>
            {editing ?
                <div>
                    <div className="form-item">
                        <input
                            className="input"
                            value={form.name}
                            onChange={e => {
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className="form-item">
                        <textarea
                            className="input textarea"
                            rows={8}
                            value={form.list}
                            onChange={e => {
                                setForm({
                                    ...form,
                                    list: e.target.value,
                                })
                            }}
                        ></textarea>
                    </div>
                    <div className="ui-space">
                        <button
                            onClick={() => {
                                setEdiing(false)
                                // setData()
                                // setForm({
                                //     ...form,
                                //     list: e.target.value,
                                // })
                                if (editIdx == -1) {
                                    // add
                                    groups.push({
                                        name: form.name,
                                        list: form.list.trimStart().trimEnd().split('\n'),
                                    })
                                }
                                else {
                                    // update
                                    groups[editIdx].name = form.name
                                    groups[editIdx].list = form.list.trimStart().trimEnd().split('\n')
                                }
                                setGroups([...groups])

                                parent.postMessage({
                                    pluginMessage: {
                                        type: 'setData',
                                        data: [...groups],
                                    }
                                }, '*')
                            }}
                        >
                            完成
                        </button>
                        <button
                            onClick={() => {
                                setEdiing(false)
                            }}
                        >
                            取消
                        </button>
                    </div>
                </div>
            :
                <div>

                    
                    <div className="groups">
                        {groups.map((group, idx) => {
                            return (
                                <div
                                    className="item"
                                    key={idx}
                                >
                                    <div className="name"
                                        onClick={() => {
                                            parent.postMessage({
                                                pluginMessage: {
                                                    type: 'random',
                                                    groupId: group.id,
                                                    // count: 0
                                                }
                                            }, '*')
                                        }}
                                    >
                                        {group.name}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEdiing(true)
                                            // setData()
                                            setEditIdx(idx)
                                            setForm({
                                                name: group.name,
                                                list: group.list.join('\n'),
                                            })
                                        }}
                                    >
                                        编辑
                                    </button>
                                </div>
                            )
                        })}
                        <div
                            className="item"
                        >
                            <div></div>
                            <button
                                onClick={() => {
                                    setEdiing(true)
                                    // setData()
                                    setEditIdx(-1)
                                    setForm({
                                        name: '',
                                        list: '',
                                    })
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                        
                </div>
            }
        </div>
    );
};

export default App;
