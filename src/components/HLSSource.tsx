import React, { Component } from 'react';
import Hls from 'hls.js';

// Types are any because this is third party

export interface Props {
    src: string;
    video: any;
    hls: any;
    type: any;
}
export default class HLSSource extends Component<Props> {
    hls: any;
    constructor(props: Props, context: any) {
        super(props, context);
        this.hls = new Hls();
    }

    componentDidMount() {
        // `src` is the property get from this component
        // `video` is the property insert from `Video` component
        // `video` is the html5 video element
        const { src, video } = this.props;
        // load hls video source base on hls.js
        if (Hls.isSupported()) {
            this.hls.loadSource(src);
            this.hls.attachMedia(video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }

    componentWillUnmount() {
        // destroy hls video source
        if (this.hls) {
            this.hls.destroy();
        }
    }

    render() {
        return (
            <source
                src={this.props.src}
                type={this.props.type || 'application/x-mpegURL'}
            />
        );
    }
}