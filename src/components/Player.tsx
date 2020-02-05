import React, { FunctionComponent } from 'react';
import Iframe from 'react-iframe';

interface Props {
    videoUrl: string;
}

export const VideoPlayer: FunctionComponent<any> = (props: Props) => {
    return (
        <Iframe url={props.videoUrl}
            width="646px"
            height="450px"
            id="myId"
            className="myClassname"
            position="relative" />
    );
};
