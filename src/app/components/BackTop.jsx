import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class BackTop extends React.Component {
    constructor(props) {
        super(props);
        this.clientHeight = document.body.clientHeight;
        this.scrollHeight = document.body.scrollHeight;
        this.state = { show: false };
    }

    componentDidMount() {
        window.onscroll = () => {
            this.scrollHeight = document.body.scrollHeight;
            this.ifShow(document.body.scrollTop);
        };
    }

    ifShow(scrollTop) {
        const show = this.state.show;
        const threshold = (1.2 * (this.clientHeight * this.clientHeight)) / this.scrollHeight;
        if (scrollTop > threshold && !show) {
            this.setState({
                show: true
            });
        } else if (scrollTop <= threshold && show) {
            this.setState({
                show: false
            });
        }
    }

    backTop() {
        window.scrollBy(0, -this.scrollHeight / 30);
        const scrolldelay = setTimeout(() => {
            this.backTop();
        }, 20);
        const sTop = document.body.scrollTop;
        if (sTop <= 0) clearTimeout(scrolldelay);
    }

    render() {
        const show = this.state.show;
        return (
            <div className="xd-backTop">
                {show &&
                    <Button animated="vertical" onClick={() => this.backTop()}>
                        <Button.Content hidden>Top</Button.Content>
                        <Button.Content visible>
                            <Icon name="chevron up" />
                        </Button.Content>
                    </Button>
                }
            </div>
        );
    }
}

export default BackTop;
