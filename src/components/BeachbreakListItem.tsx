import React, { FunctionComponent, useState } from "react";
import request from "superagent";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import VideocamIcon from '@material-ui/icons/Videocam';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles, makeStyles, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import { windyUrl } from "../constants";
import { Beachbreak } from "../models/beachbreak";
import sea from "../assets/sea.svg";

import "./BeachbreakListItem.css"
import { VideoPlayer } from "./Player";

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}
const StyledFab = withStyles({
    root: {
        backgroundColor: 'white',
        marginLeft: '10px'
    }
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
})(VideocamIcon);

const StyledPaper = withStyles({
    root: {
        height: '30px'
    }
})(Paper);

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
                    {/*TODO: make an arrow out of the below value
                    write the logic outside of this return statement */}
                    <ListItemText disableTypography primary={
                        <Typography style={styleForList()}>{beachbreak.winddirectionvalue}°</Typography>
                    }>
                    </ListItemText>


                    <div style={{ width: '60px', height: "55px" }}>
                        <img alt="wave" src={sea}></img>
                        <p className="wave-height-text">{beachbreak.waveheightvalue}</p>
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


                {displayCam && !loading && (
                    <div>
                        <div style={{ margin: "0 auto" }}>
                            <div style={{ display: style(showPlaceholder) }}>
                                <StyledPaper elevation={3}>
                                    <p style={{ color: 'black', margin: '0 auto', textAlign: 'center' }}>No webcam was found, sorry!</p>
                                </StyledPaper>
                            </div>
                        </div>

                        {!showPlaceholder && !loading && <div style={{ textAlign: "center" }}>
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

