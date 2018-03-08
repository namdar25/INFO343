import React, { Component } from 'react';

class Chat extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card chatcard mb-4">
                            <h5 className="card-title">Conversation with </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Chat;