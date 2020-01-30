import React, { FunctionComponent, useState } from "react";
import { Beachbreak } from "../models/beachbreak";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import sea from "../assets/sea.svg";
import Fab from '@material-ui/core/Fab';

import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from "@material-ui/core";
import "./BeachbreakListItem.css"
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import VideocamIcon from '@material-ui/icons/Videocam';
import request from "superagent";
import { windyUrl } from "../constants";

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}
const StyledFab = withStyles({
    root: {
        backgroundColor: 'white',
        marginLeft: '10px'
    },
    // colorInherit: {backgroundColor: 'white'}
})(Fab);

const StyledIcon = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(ClearIcon);

const StyledCamIcon = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(VideocamIcon)


export const BeachbreakListItem:
    FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
        const [showItem, setShowItem] = useState(true);
        const [displayCam, setDisplayCam] = useState(false);
        const [imgUrl, setImgUrl] = useState("");
        const [showImgTag, setShowImgTag] = useState(false);
        const [showPlaceholder, setShowPlaceholder] = useState(false);

        const apiKey = `${process.env.REACT_APP_WINDY_API_KEY}`;
        const style = (property: boolean) => property ? "" : "none";

        const deleteBeach = () => onDelete(beachbreak);

        const showWebCam = () => {
            getWebCam()
            setDisplayCam(!displayCam);
        }

        const hideWebCam = () => {
            setDisplayCam(false);
            setShowItem(true);
        }

        const getWebCam = () => {
            request
                .get(`${windyUrl}/list/nearby=${beachbreak.latitude},${beachbreak.longitude},20?show=webcams:location,image`)
                .set("x-windy-key", apiKey)
                .then(res => {
                    if (res.body.result.webcams.length === 0) {
                        setShowImgTag(false);
                        setShowPlaceholder(true);
                    } else {
                        setImgUrl(res.body.result.webcams[0].image.current.preview)
                        setShowImgTag(true);
                    }
                    // setImgUrl(res.body.result.webcams[0].image.current.preview)
                })
                .catch(e => console.warn(e))
        }

        return (
            <div className="container" style={{ display: style(showItem) }}>
                <ListItem>

                    <ListItemText>
                        {beachbreak.name}
                    </ListItemText>

                    <ListItemText>
                        {beachbreak.swellperiodvalue}s
                </ListItemText>

                    <ListItemText>
                        {beachbreak.windspeedvalue}m/s
                </ListItemText>
                    {/*TODO: make an arrow out of the below value
                    write the logic outside of this return statement */}
                    <ListItemText>
                        {beachbreak.winddirectionvalue}°
                </ListItemText>

                    <div style={{ width: '60px', height: "55px" }}>
                        <img alt="wave" src={sea}></img>
                        <p>{beachbreak.waveheightvalue}</p>
                    </div>

                    <StyledFab onClick={deleteBeach} size="small" color="secondary" aria-label="delete">
                        <StyledIcon></StyledIcon>
                    </StyledFab>
                    <StyledFab
                        onClick={() => showWebCam()}
                        color="secondary"
                        size="small">
                        <StyledCamIcon></StyledCamIcon>
                    </StyledFab>
                </ListItem>




                <div style={{ display: style(displayCam), width: "100px" }}>
                    <img style={{ display: style(showImgTag) }} src={imgUrl} alt="no webcam found"></img>
                    <div style={{ display: style(showPlaceholder) }}>
                        <Paper elevation={3}>
                            No webcam was found, sorry!
                        </Paper>
                    </div>
                </div>

                <Divider />
            </div>
        );
    };
