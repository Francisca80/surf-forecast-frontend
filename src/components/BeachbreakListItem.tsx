import React, { FunctionComponent, useState } from "react";
import request from "superagent";
import {
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    makeStyles,
    Typography,
    ListItemAvatar
} from '@material-ui/core';

import { StyledCamIcon, StyledFab, StyledIcon, StyledPaper } from "../shared/StyledComponents";
import { windyUrl } from "../constants";
import { Beachbreak } from "../models/beachbreak";
import sea from "../assets/sea.svg";

import { VideoPlayer } from "./Player";
import "./BeachbreakListItem.css";
import { Compass } from "./Compass";

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        justifyContent: 'center',
        marginBottom: '10px'
    },
}));

const styleForList = () => {
    return {
        
        fontFamily: "Montserrat",
        fontSize: "12px",
        maxWidth: "fit-content",
    }
}

export const BeachbreakListItem:
    FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
        const [displayCam, setDisplayCam] = useState(false);
        const [videoUrl, setVideoUrl] = useState("");
        const [loading, setLoading] = useState(false);
        const [showPlaceholder, setShowPlaceholder] = useState(false);

        const style = (property: boolean) => property ? "" : "none";

        const deleteBeach = () => onDelete(beachbreak);

        // TODO: fix bug - prevent api request on every click of button
        // TODO: refactor, get rid of repetition and make code more readable
        // TODO: make reusable components instead

        const showWebCam = () => {
            setDisplayCam(!displayCam);

            if (!displayCam) {
                getWebCam()
            }
        }

        const classes = useStyles();

        const getWebCam = () => {
            setLoading(true);
            request
                .get(`${windyUrl}/list/nearby=${beachbreak.latitude},${beachbreak.longitude},20?show=webcams:location,image,player`)
                .set("x-windy-key", "AXycMpECnFCcRCUpJudw9vspuU2UzXCa")
                .accept("application/json")
                .then(res => {
                    if (res.body.result.webcams.length === 0) {
                        setShowPlaceholder(true);
                        setLoading(false)
                    } else {
                        setVideoUrl(res.body.result.webcams[0].player.day.embed)
                        setLoading(false)
                    }
                })
                .catch(e => console.warn(e))
                .finally(() => setLoading(false))
        }

        return (
            <div className="container">
                <ListItem >

                    <ListItemText disableTypography primary={
                        <Typography style={styleForList()}>{beachbreak.name}</Typography>
                    }>
                    </ListItemText>

                    <ListItemText disableTypography primary={
                        <Typography style={styleForList()}>{beachbreak.swellperiodvalue}s</Typography>
                    }>
                    </ListItemText>


                    <ListItemText disableTypography primary={
                        <Typography style={styleForList()}>{beachbreak.windspeedvalue}m/s</Typography>
                    }>
                    </ListItemText>

                    {/* <ListItemText disableTypography primary={
                        <Typography style={styleForList()}>{beachbreak.winddirectionvalue}°</Typography>

                    }> */}

                    {/* </ListItemText> */}
                    <ListItemAvatar>
                        <Compass degrees={beachbreak.winddirectionvalue}></Compass>
                    </ListItemAvatar>

                    <div className="waveImgWrapper">
                        <img alt="wave" src={sea}></img>
                        <p className="waveHeightText">{beachbreak.waveheightvalue}</p>
                    </div>

                    <StyledFab onClick={deleteBeach} size="small" color="primary" aria-label="delete">
                        <StyledIcon></StyledIcon>
                    </StyledFab>

                    <StyledFab
                        onClick={() => showWebCam()}
                        color="primary"
                        size="small">
                        <StyledCamIcon></StyledCamIcon>
                    </StyledFab>
                </ListItem>


                {displayCam && !loading && (
                    <div>
                        <div className="noCamFoundWrapper">
                            <div style={{ display: style(showPlaceholder) }}>
                                <StyledPaper elevation={3}>
                                    <p className="noCamMessage">No webcam was found, sorry!</p>
                                </StyledPaper>
                            </div>
                        </div>

                        {!showPlaceholder && !loading &&
                            <div className="videoWrapper">
                                <VideoPlayer videoUrl={videoUrl}></VideoPlayer>
                            </div>}
                    </div>
                )}
                {loading &&
                    <div className={classes.root}>
                        <CircularProgress color="primary" />
                    </div>}
                <Divider />

            </div>
        );
    };

