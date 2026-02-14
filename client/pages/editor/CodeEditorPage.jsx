import React from 'react'
import './CodeEditorPage.css'
import ResponsiveAppBar from '../../components/Navbar'
import CodeEditor from '../../components/CodeEditor'
export default function CodeEditorPage() {
    return (
        <div>
            <div class="navbar"> 
                <ResponsiveAppBar/>
            </div>
            <div class="codeinputoutputlayout">
                <div class='codeEditor'><CodeEditor/></div>
                <div class="inputoutputdiv">
                    <div class='inputhere'> input here</div>
                    <div class='outputhere'>output here</div>
                </div>
            </div>
        </div>
    )
}
