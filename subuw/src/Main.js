import React, { Component } from 'react';
import Listing from './Listing';
import Maps from './Maps';
import test from './testlisting.json';
import * as SplitPane from "react-split-pane";

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="main">
                <SplitPane split="vertical" defaultSize={300} primary="first">
                    <div className="pane">
                        <div>
                            {test.map((d) => {
                                return <Listing test={d} />
                            })
                            }
                        </div>
                    </div>
                    <div className="pane">
                        <Maps test={test} />
                    </div>
                </SplitPane>
            </div>
        )
    }
}