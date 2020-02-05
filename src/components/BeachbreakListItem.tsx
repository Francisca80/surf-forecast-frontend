import React, { FunctionComponent, useState } from "react";
import request from "superagent";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import VideocamIcon from '@material-ui/icons/Videocam';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles, makeStyles } from "@material-ui/core";
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
})(VideocamIcon)

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));



export const BeachbreakListItem:
    FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
        const [showItem, setShowItem] = useState(true);
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


                {displayCam && !loading && (
                    <div>
                        <div style={{ margin: "0 auto" }}>
                            <div style={{ display: style(showPlaceholder) }}>
                                <Paper elevation={3}>No webcam was found, sorry!
                                </Paper>
                            </div>
                        </div>

                        {!showPlaceholder && !loading && <div style={{ margin: "0 auto" }}>
                            <VideoPlayer videoUrl={videoUrl}></VideoPlayer>
                        </div>}
                    </div>
                )}
                {loading && 
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>}

                <Divider />

            </div>
        );
    };

